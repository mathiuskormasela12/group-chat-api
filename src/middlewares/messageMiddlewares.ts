// ========== Message Middlewares
// import all modules
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { body, validationResult } from 'express-validator';
import { response } from '../helpers';

export const checkSendMessageForm = [
  body('roomId', "Room id can'be empty")
    .notEmpty(),
  body('roomId', 'Room id should be a string')
    .isString(),
  body('roomId', 'Room id is invalid')
    .isAlphanumeric(),
  body('message', "Message can'be empty")
    .notEmpty(),
  body('message', 'Message should be a string')
    .isString(),
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
