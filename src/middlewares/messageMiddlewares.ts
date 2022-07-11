// ========== Message Middlewares
// import all modules
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import {
  body, validationResult, query, param,
} from 'express-validator';
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

export const checkGetAllMessagesQuery = [
  query('roomId', "Room id can'be empty")
    .notEmpty(),
  query('roomId', 'Room id should be a string')
    .isString(),
  query('roomId', 'Room id is invalid')
    .isAlphanumeric(),
  query('page', 'Page should be an integer')
    .toInt().default(1),
  query('limit', 'Limit should be an integer')
    .toInt().default(5),

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

export const checkRemoveMessageParams = [
  param('id', 'Id should be an integer')
    .isInt(),

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
