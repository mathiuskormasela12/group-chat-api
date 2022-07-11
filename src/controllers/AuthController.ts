// =========== Auth Controller
// import all modules
import { Request, Response } from 'express';
import { response } from '../helpers';
import AuthService from '../services/AuthService';

class AuthController {
  public static async joinRoom(req: Request, res: Response) {
    const authService = new AuthService(req);
    const results = await authService.joinRoom();
    return response(req, res, results);
  }

  public static async updateRoomName(req: Request, res: Response) {
    const authService = new AuthService(req);
    const results = await authService.updateRoomName();
    return response(req, res, results);
  }
}

export default AuthController;
