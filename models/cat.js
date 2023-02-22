'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

class Cat extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Cat.hasMany(models.Man, {
      foreignKey: 'cat_id'
    })
    // Cat.hasMany(models.Man, {
    //   sourceKey: 'cat_id'
    // })
  }
};
Cat.init({
  name: DataTypes.STRING,
  // renferences: {
  //   model: 'Man',
  //   key: 'cat_id'
  // }
}, {
  sequelize,
  modelName: 'Cat',
});

export default Cat