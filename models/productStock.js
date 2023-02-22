'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'

export class Product extends Model {};
Product.init({
  id: {
    type: DataTypes.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  productName: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  productId: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  img: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING(10),
  }
}, {
  sequelize,
  modelName: 'Product',
});


export class Stock extends Model {};
Stock.init({
  count: DataTypes.STRING,
  date: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Stock',
});

Stock.belongsTo(Product)
Product.hasMany(Stock)