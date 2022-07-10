// ========== Router
// import all modules
import { Router as ExpressRouter } from 'express';

abstract class Router {
  protected abstract expressRouter: ExpressRouter

  public abstract get router(): ExpressRouter;
}

export default Router;
