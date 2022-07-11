// ========== Message Service
// import all modules
import { Request } from 'express';
import { ValidationError } from 'sequelize/types';
import db from '../core/database';
import { IResponseResults } from '../interfaces';

class MessageService {
  private body: Request['body'];

  private params: Request['params'];

  private app: Request['app'];

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
    this.app = req.app;
  }

  public async sendMessage(): Promise<IResponseResults> {
    try {
      await db.messages.create({
        uid: this.app.locals.decode.id,
        roomId: this.body.roomId,
        message: this.body.message,
      });

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
}

export default MessageService;
