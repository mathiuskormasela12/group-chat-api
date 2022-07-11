// ========== Socket Middleware
// import all modules
import { NextFunction, Request, Response } from 'express';

export const socket = (io: any) => (req: Request, res: Response, next: NextFunction) => {
  req.socket = io;
  next();
};
