// ========== Message Service
// import all modules
import { Request } from 'express';
import { ValidationError } from 'sequelize/types';
import db from '../core/database';
import { IResponseResults } from '../interfaces';

class MessageService {
  private body: Request['body'];

  private params: Request['params'];

  private queries: Request['query'];

  private app: Request['app'];

  private socket: Request['socket'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
    this.app = req.app;
    this.queries = req.query;
    this.socket = req.socket;
  }

  public async sendMessage(): Promise<IResponseResults> {
    try {
      await db.messages.create({
        userId: this.app.locals.decode.id,
        roomId: this.body.roomId,
        message: this.body.message,
      });

      this.socket.emit(`SEND_MESSAGE_${this.body.roomId}`, this.body.roomId);

      return {
        status: 200,
        success: true,
        message: 'The message has been sent',
      };
    } catch (err) {
      const errors = <ValidationError>err;

      return {
        status: 400,
        success: false,
        message: errors.message,
      };
    }
  }

  public async removeMessage(): Promise<IResponseResults> {
    try {
      const message = await db.messages.findByPk(this.params.id);

      if (!message) {
        return {
          status: 404,
          success: false,
          message: 'The message is not found',
        };
      }

      try {
        await db.messages.destroy({ where: { id: this.params.id } });
        const roomId = message.getDataValue('roomId');
        this.socket.emit(`REMOVE_MESSAGE_${roomId}`, roomId);

        return {
          status: 200,
          success: true,
          message: 'The message has been removed successfully',
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
      const errors = <ValidationError>err;

      return {
        status: 400,
        success: false,
        message: errors.message,
      };
    }
  }

  public async getAllMessage(): Promise<IResponseResults> {
    const { page, limit, roomId } = this.queries;
    const offset = Number(limit) * Number(page) - Number(limit);

    try {
      const messages = await db.messages.findAll({
        limit: Number(limit),
        offset,
        attributes: ['id', 'message'],
        where: {
          roomId,
        },
        order: [['id', 'desc']],
        include: [
          {
            model: db.users,
            foreignKey: 'userId',
            attributes: ['id', 'name'],
          },
        ],
      });
      const allMessages = await db.messages.findAll({
        where: {
          roomId,
        },
        include: [{ model: db.users, foreignKey: 'userId' }],
      });

      const totalData = allMessages.length;
      const totalPages = Math.ceil(totalData / Number(limit));

      if (messages.length < 1) {
        return {
          status: 404,
          success: false,
          message: 'You do not have any message',
          results: [],
        };
      }

      return {
        status: 200,
        success: true,
        message: 'You have got all messages',
        results: messages,
        pageInfo: {
          totalData,
          totalPages,
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
  }
}

export default MessageService;
