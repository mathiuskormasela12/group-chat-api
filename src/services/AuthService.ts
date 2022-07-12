// ========== Auth Service
// import all modules
import { Request } from 'express';
import { ValidationError } from 'sequelize/types';
import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken';
import { IResponseResults } from '../interfaces';
import db from '../core/database';
import { generateAccessToken, generateRefreshToken } from '../helpers';
import { config } from '../config';

class AuthService {
  private body: Request['body'];

  private params: Request['params'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
  }

  public async joinRoom(): Promise<IResponseResults> {
    const { body } = this;

    try {
      const user = await db.users.findOne({ where: { email: body.email } });

      if (!user) {
        try {
          const results = await db.users.create(body);

          try {
            const room = await db.rooms.findOne({ where: { roomCode: body.roomCode } });

            if (room) {
              const accessToken: string = generateAccessToken({ id: results.getDataValue('id') });
              const refreshToken: string = generateRefreshToken({ id: results.getDataValue('id') });

              return {
                status: 200,
                success: true,
                message: 'You have joined an existing room',
                results: {
                  accessToken,
                  refreshToken,
                  isRoomExists: true,
                },
              };
            }
            try {
              await db.rooms.create({
                roomCode: body.roomCode,
              });

              const accessToken: string = generateAccessToken({ id: results.getDataValue('id') });
              const refreshToken: string = generateRefreshToken({ id: results.getDataValue('id') });

              return {
                status: 200,
                success: true,
                message: 'You have joined a new room',
                results: {
                  accessToken,
                  refreshToken,
                  isRoomExists: false,
                },
              };
            } catch (err) {
              const errors = <ValidationError>err;

              return {
                success: false,
                status: 400,
                message: errors.message,
              };
            }
          } catch (err) {
            const errors = <ValidationError>err;

            return {
              success: false,
              status: 400,
              message: errors.message,
            };
          }
        } catch (err: unknown) {
          const errors = <ValidationError>err;

          return {
            success: true,
            status: 400,
            message: errors.message,
          };
        }
      } else {
        try {
          const room = await db.rooms.findOne({ where: { roomCode: body.roomCode } });

          if (room) {
            const accessToken: string = generateAccessToken({ id: user.getDataValue('id') });
            const refreshToken: string = generateRefreshToken({ id: user.getDataValue('id') });

            return {
              status: 200,
              success: true,
              message: 'You have joined an existing room',
              results: {
                accessToken,
                refreshToken,
                isRoomExists: true,
              },
            };
          }
          try {
            await db.rooms.create({
              roomCode: body.roomCode,
            });

            const accessToken: string = generateAccessToken({ id: user.getDataValue('id') });
            const refreshToken: string = generateRefreshToken({ id: user.getDataValue('id') });

            return {
              status: 200,
              success: true,
              message: 'You have joined a new room',
              results: {
                accessToken,
                refreshToken,
                isRoomExists: false,
              },
            };
          } catch (err) {
            const errors = <ValidationError>err;

            return {
              success: false,
              status: 400,
              message: errors.message,
            };
          }
        } catch (err) {
          const errors = <ValidationError>err;

          return {
            success: false,
            status: 400,
            message: errors.message,
          };
        }
      }
    } catch (err) {
      const errors = <ValidationError>err;

      return {
        status: 400,
        success: false,
        message: errors.message,
      };
    }
  }

  public async updateRoomName(): Promise<IResponseResults> {
    const { params, body } = this;

    try {
      const room = await db.rooms.findByPk(params.id);
      if (!room) {
        return {
          status: 404,
          success: false,
          message: 'The room does not exist',
        };
      }
      try {
        await db.rooms.update({
          roomName: body.roomName,
        }, { where: { id: params.id } });

        return {
          status: 200,
          success: true,
          message: 'The room name has been changed',
          results: {
            roomName: body.roomName,
          },
        };
      } catch (err) {
        const errors = <ValidationError>err;

        return {
          success: false,
          status: 400,
          message: errors.message,
        };
      }
    } catch (err) {
      const errors = <ValidationError>err;

      return {
        success: false,
        status: 400,
        message: errors.message,
      };
    }
  }

  public async generateAccessTokenByRefreshToken(): Promise<IResponseResults> {
    try {
      const results: JwtPayload | string = await verify(
        this.body.refreshToken,
        String(config.jwt.refreshTokenKey),
      );
      try {
        const user = await db.users.findByPk(typeof results !== 'string' ? results.id : 0);

        if (!user) {
          return {
            status: 404,
            success: false,
            message: 'User is not found',
          };
        }

        const accessToken = generateAccessToken({
          id: user.getDataValue('id'),
        });
        const refreshToken = generateRefreshToken({
          id: user.getDataValue('id'),
        });

        return {
          status: 200,
          success: true,
          message: 'The access token has been created',
          results: {
            accessToken,
            refreshToken,
          },
        };
      } catch (err) {
        const errors = <ValidationError>err;
        return {
          status: 400,
          success: false,
          message: errors.message,
        };
      }
    } catch (err) {
      const errors = <JsonWebTokenError> err;

      return {
        status: 400,
        success: false,
        message: errors.message,
      };
    }
  }
}

export default AuthService;
