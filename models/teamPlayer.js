'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

export class Players extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Players.belongsTo(Teams)
  }
};
Players.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  playerName: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: 'Player',
});

export class Teams extends Model {
  static associate(models) {
    console.log(models, '-Team-models----')
    // define association here
    // Teams.hasMany(models.Inventory)
  }
};
Teams.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  teamName: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: 'Team',
});

Players.belongsTo(Teams)
Teams.hasMany(Players)