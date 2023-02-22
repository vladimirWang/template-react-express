'use strict';

import { Model, Sequelize } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log(models, '----Hobby')

      // define association here
    }
  };
  Hobby.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Hobby',
  });
  return Hobby;
};