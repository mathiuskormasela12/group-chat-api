// ========== Auth Middlewares
// import all modules
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { body, validationResult } from 'express-validator';
import { response } from '../helpers';

export const checkJoinRoomForm = [
  body('name', "Name can't be empty")
    .notEmpty(),
  body('name', 'Name should be a string')
    .isString(),
  body('email', "Email can't be empty")
    .notEmpty(),
  body('email', 'Email is invalid')
    .isEmail(),
  body('roomId', "Room id can't be empty")
    .notEmpty(),
  body('roomId', 'Room id should be a string')
    .isString(),
  body('roomId', 'Room id must include letters and numbers')
    .isAlphanumeric(),
  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, {
        success: false,
        status: 400,
        message: errors.array()[0].msg,
      });
    }

    return next();
  },
];
