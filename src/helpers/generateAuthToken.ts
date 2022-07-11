// ========== Generate Auth Token
// import all modules
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IJwtPayload } from '../interfaces';

export const generateAccessToken = (payload: IJwtPayload) => {
  const { accessTokenKey, accessTokenExpiresIn } = config.jwt;

  return jwt.sign(payload, String(accessTokenKey), { expiresIn: accessTokenExpiresIn });
};

export const generateRefreshToken = (payload: IJwtPayload) => {
  const { refreshTokenKey, refreshTokenExpiresIn } = config.jwt;

  return jwt.sign(payload, String(refreshTokenKey), { expiresIn: refreshTokenExpiresIn });
};
