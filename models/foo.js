'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

class Foo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
  }
};
Foo.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Foo',
});

export default Foo