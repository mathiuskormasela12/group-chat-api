// =========== Config
// import all modules
import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV,
  appUrl: process.env.APP_URL,
  apiUrl: process.env.API_URL,
  port: process.env.PORT,
  database: {
    host: String(process.env.DB_HOST),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT),
    name: String(process.env.DB_NAME),
  },
  secretKey: process.env.SECRET_KEY,
  jwt: {
    accessTokenKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    refreshTokenKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  clients: [
    'http://localhost:3000',
    'http://loclahost:8000',
  ],
};
