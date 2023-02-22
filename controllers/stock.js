import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { jwtSecret } from '../config.js'
import {Stock} from '../models/productStock.js'

export const addStock = async (req, res) => {
  try {
    const {count, date, productId} = req.body
    const stock = await Stock.create({count, date})
    stock.setProduct(productId)
    // console.log(req.body, '---body')
    // console.log(Stock.prototype, '---proto ')
    res.status(200).send({msg: '创建进货成功'})
  } catch (error) {
    res.status(500).json({succes: false, msg: error.message})
  }
}


// 获取进货记录
export const getStockRecord = async (req, res) => {
  console.log(req.params.id, '---params.id')
  try {
    const stockRecord = await Stock.findAndCountAll({
      where: {
        productId: req.params.id
      }
    })
    res.status(200).send({ msg: '查询进货记录成功', data: stockRecord })
  } catch (error) {
    res.status(500).json({ succes: false, msg: error.message })
  }
}