// ========== Auth Service
// import all modules
import { Request } from 'express';
import { ValidationError } from 'sequelize/types';
import { IResponseResults } from '../interfaces';
import db from '../core/database';

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
          await db.users.create(body);

          try {
            const room = await db.rooms.findOne({ where: { roomCode: body.roomCode } });

            if (room) {
              return {
                status: 200,
                success: false,
                message: 'You have joined an existing room',
              };
            }
            try {
              await db.rooms.create({
                roomCode: body.roomCode,
              });

              return {
                status: 200,
                success: false,
                message: 'You have joined a new room',
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
            return {
              status: 200,
              success: false,
              message: 'You have joined an existing room',
            };
          }
          try {
            await db.rooms.create({
              roomCode: body.roomCode,
            });

            return {
              status: 200,
              success: false,
              message: 'You have joined a new room',
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
          success: false,
          message: 'The room name has been changed',
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
}

export default AuthService;
