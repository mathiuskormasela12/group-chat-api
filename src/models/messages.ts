// ========== Messsages
// import all modules
import * as sql from 'sequelize';
import { Sequelize } from 'sequelize';

const messageModel = (sequelize: Sequelize) => {
  const Message = sequelize.define('messages', {
    roomId: sql.INTEGER,
    uid: sql.INTEGER,
    message: sql.STRING,
  }, { paranoid: true });

  return Message;
};

export default messageModel;
