// ========== Message Controller
// import all modules

import { Request, Response } from 'express';
import { response } from '../helpers';
import MessageService from '../services/MessageService';

class MessageController {
  public static async sendMessage(req: Request, res: Response) {
    const messageService = new MessageService(req);
    const results = await messageService.sendMessage();
    return response(req, res, results);
  }
}

export default MessageController;
