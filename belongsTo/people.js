'use strict';
import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      People.belongsTo(models.Hobby, {
        foreignKey: 'hobby_id'
      })
      // define association here
    }
  };
  People.init({
    name: DataTypes.STRING,
    hobby_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Hobbys",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'People',
  });
  return People;
};