// ========== Rooms
// import all modules
import * as sql from 'sequelize';
import { Sequelize } from 'sequelize';

const roomsModel = (sequelize: Sequelize) => {
  const Room = sequelize.define('rooms', {
    id: {
      type: sql.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomName: sql.STRING,
    roomCode: sql.STRING,
  }, { paranoid: true });

  return Room;
};

export default roomsModel;
