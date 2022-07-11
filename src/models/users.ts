// ========== Users Model
// import all modules
import * as sql from 'sequelize';

const usersModel = (Sequelize: sql.Sequelize) => {
  const User = Sequelize.define('users', {
    id: {
      type: sql.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: sql.STRING,
    email: sql.STRING,
  }, {
    paranoid: true,
  });

  return User;
};

export default usersModel;
