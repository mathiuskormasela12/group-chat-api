// ========== Auth Service
// import all modules
import { Request } from 'express';
import { IResponseResults } from '../interfaces';
import db from '../core/database';

class AuthService {
  private body: Request['body'];

  constructor(req: Request) {
    this.body = req.body;
  }

  public async joinRoom(): Promise<IResponseResults> {
    const { body } = this;

    try {
      const res = await db.users.create(body);

      return {
        success: true,
        status: 200,
        message: 'Created',
        results: res,
      };
    } catch (err: any) {
      return {
        success: true,
        status: 400,
        message: err.message,
      };
    }
  }
}

export default AuthService;
