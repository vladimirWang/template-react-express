import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { jwtSecret } from '../config.js'
import db from '../models/index.js'
import { genInsertSql, genSetStr } from '../utils/db.js'

export const addStock = async (req, res) => {
  try {
    const { count, date, productId, cost } = req.body
    const insertSql = genInsertSql('stocks', { count, date, productId, cost }, ['count', 'cost', 'productId'])
    await db.query(insertSql)

    res.status(200).send({ msg: '创建进货成功' })
  } catch (error) {
    res.status(500).json({ succes: false, msg: error.message })
  }
}


// 获取进货记录
export const getStockRecord = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM stocks WHERE productId = ${req.params.id} ORDER BY updatedAt DESC
    `)

    const [[{ count }]] = await db.query(`
      SELECT COUNT(*) count FROM stocks WHERE productId = ${req.params.id}
    `)

    res.status(200).send({ msg: '查询进货记录成功', data: { rows, count } })
  } catch (error) {
    res.status(500).json({ succes: false, msg: error.message })
  }
}
// 获取进货详情
export const getStockDetail = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT * FROM stocks WHERE id = ${req.params.id}
    `)
    if (rows.length === 0) {
      return res.status(404).json({ success: false, msg: '没有查到对应数据' })
    }

    res.status(200).send({ msg: '查询进货详情成功', data: rows[0] })
  } catch (error) {
    res.status(500).json({ succes: false, msg: error.message })
  }
}

// 根据id更新进货记录
export const updateStock = async (req, res) => {
  try {
    // const [rows] = await db.query(`
    //   SELECT * FROM stocks WHERE id = ${req.params.id}
    // `)
    // if (rows.length === 0) {
    //   return res.status(404).json({ success: false, msg: '没有查到对应数据' })
    // }
    const { count, cost, date } = req.body
    const setStr = genSetStr({ count, date, cost }, ['count', 'cost'])
    if (setStr === '') {
      res.status(400).json({ msg: '参数错误', success: false })
      return
    }
    const updateSql = `
      UPDATE stocks SET ${setStr} WHERE id = ${req.params.id}
    `
    await db.query(updateSql)
    res.status(200).send({ msg: '进货记录更新成功', success: true })
  } catch (error) {
    res.status(500).json({ succes: false, msg: error.message })
  }
}


