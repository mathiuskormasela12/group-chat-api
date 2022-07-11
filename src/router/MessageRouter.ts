// =========== Message Router
// import all modules
import { Router as ExpressRouter } from 'express';
import Router from './Router';

// import all controllers
import MessageController from '../controllers/MessageController';
import { checkSendMessageForm, isLogin } from '../middlewares';

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
  }

  public get router(): ExpressRouter {
    return this.expressRouter;
  }
}

export default new MessageRouter();
