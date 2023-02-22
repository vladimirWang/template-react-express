'use strict';
import fs from 'fs'
import path from 'path'
import Sequelize, { DataTypes , Model} from 'sequelize'
import {__dirname, __filename} from '../util.js'

// 读取数据库配置信息
const configPath = path.resolve(__dirname, './config/config.json')

let conf = {}

try {
  conf = JSON.parse(fs.readFileSync(configPath, 'utf8'))
} catch (error) {
  console.error(error.message, '---解析异常')
}

const env = process.env.NODE_ENV || 'development';

const config = conf[env]

const connection = new Sequelize(config.database, config.username, config.password, config);

export default connection;
