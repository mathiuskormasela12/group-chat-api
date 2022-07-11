// =========== Message Router
// import all modules
import { Router as ExpressRouter } from 'express';
import Router from './Router';

// import all controllers
import MessageController from '../controllers/MessageController';
import {
  checkSendMessageForm, isLogin, checkGetAllMessagesQuery, checkRemoveMessageParams,
} from '../middlewares';

class MessageRouter extends Router {
  protected expressRouter: ExpressRouter;

  constructor() {
    super();
    this.expressRouter = ExpressRouter();
    this.routes();
  }

  private routes() {
    const { expressRouter } = this;

    expressRouter.post('/message', isLogin, checkSendMessageForm, MessageController.sendMessage);
    expressRouter.get('/message', isLogin, checkGetAllMessagesQuery, MessageController.getAllMessages);
    expressRouter.delete('/message/:id', isLogin, checkRemoveMessageParams, MessageController.removeMessage);
  }

  public get router(): ExpressRouter {
    return this.expressRouter;
  }
}

export default new MessageRouter();
