'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

class Bar extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Bar.belongsTo(models.Foo, {
      allowNull: false
    })
    // models.Foo.hasOne(Bar, {
    //   // type: DataTypes.UUID
    //   allowNull: false
    // })

    // define association here
  }
};
Bar.init({
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Bar',
});

export default Bar;