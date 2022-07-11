// ========== Auth Middlewares
// import all modules
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { body, param, validationResult } from 'express-validator';
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
  body('roomCode', "Room code can't be empty")
    .notEmpty(),
  body('roomCode', 'Room code should be a string')
    .isString(),
  body('roomCode', 'Room code must include letters and numbers')
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

export const checkUpdateRoomForm = [
  param('id', "Id can't be empty")
    .notEmpty(),
  param('id', 'Id should an interger')
    .isInt(),
  body('roomName', "Room name can't be empty")
    .notEmpty(),
  body('roomName', 'Room name should be a string')
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
