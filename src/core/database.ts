// ========== Database
// import all modules
import { Sequelize } from 'sequelize';
import { config } from '../config';
import usersModel from '../models/Users';

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'mysql',
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const database = {
  Sequelize,
  sequelize,
  users: usersModel(sequelize),
};

export default database;
