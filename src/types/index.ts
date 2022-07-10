// ========== Types
// import all modules
import { Request, Response } from 'express';
import { IResponseResults } from '../interfaces';

// eslint-disable-next-line no-unused-vars
export type ResponseFunc = (req: Request, res: Response, results: IResponseResults) => Response
