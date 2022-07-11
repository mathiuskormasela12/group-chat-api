// ========== Messsages
// import all modules
import * as sql from 'sequelize';
import { Sequelize } from 'sequelize';

const messageModel = (sequelize: Sequelize) => {
  const Message = sequelize.define('messages', {
    id: {
      type: sql.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: sql.INTEGER,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
    userId: {
      type: sql.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    message: sql.STRING,
  }, { paranoid: true });

  return Message;
};

export default messageModel;
