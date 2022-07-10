// =========== Auth Router
// import all modules
import { Router as ExpressRouter } from 'express';
import Router from './Router';

// import all controllers
import AuthController from '../controllers/AuthController';
import { checkJoinRoomForm } from '../middlewares';

class AuthRouter extends Router {
  protected expressRouter: ExpressRouter;

  constructor() {
    super();
    this.expressRouter = ExpressRouter();
    this.routes();
  }

  private routes() {
    const { expressRouter } = this;

    expressRouter.post('/auth/join', checkJoinRoomForm, AuthController.joinRoom);
  }

  public get router(): ExpressRouter {
    return this.expressRouter;
  }
}

export default new AuthRouter();
