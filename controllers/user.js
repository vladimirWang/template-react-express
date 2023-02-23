import { db as db2 } from '../db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import User from '../models/users.js'
import db from '../models/index.js'

export const userInfoOld = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE id = ?"
    const [result] = await db2.execute(q, [req.auth.id])
    if (!Array.isArray(result) || Array.isArray(result) && result.length === 0) {
      return res.status(404).json({ msg: "user not found", success: false })
    }

    const { password, ...other } = result[0]
    res.status(200).json({ data: other })
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
  // console.log(req.auth, '---req.user')
  // res.status(200).send({ data: 'user info' })
}

export const userInfo = async (req, res) => {
  try {
    console.log(req.auth, '--auth')
    const findUserByIdSql = `
      SELECT * FROM users WHERE id = ${req.auth.id}
    `
    const [result] = await db.query(findUserByIdSql)
    // console.log(result, 'reuslss')
    // const user = await User.findByPk(req.auth.id, { attributes: { exclude: ['password'] } })
    if (result.length === 0) {
      return res.status(404).json({ msg: "user not found", success: false })
    }
    const { password, ...rest } = result
    res.status(200).json({ data: rest[0], success: true })
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
}