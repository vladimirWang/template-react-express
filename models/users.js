'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

class Users extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};
Users.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  avatar: DataTypes.STRING,
  role: DataTypes.ENUM('boss', 'staff')
}, {
  sequelize,
  modelName: 'Users',
});

export default Users