import { db } from '../db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { jwtSecret } from '../config.js'
// const {Users} = require('../models/index.cjs')

export const register = async (req, res) => {
  console.log(req.body, '---req.body------------')
  // const q = "SELECT * FROM users;"
  const retrieveSql = `SELECT * FROM users WHERE username = ?`
  try {
    // console.log(retrieveSql, '-----retrieveSql')
    // const data = await db.execute(q, [req.query.email, req.query.username])
    const result = await db.execute(retrieveSql, [req.body.username])
    if (result[0].length) return res.status(409).json('user already existed')

    console.log("pass")
  } catch (e) {
    console.error(e.message, '----异常')
    return res.status(500).json(e.message)
  }

  try {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(req.body.password, salt)
    console.log(hash, '---hash')
    const insertSql = "INSERT INTO users(`username`,`password`) VALUES (?,?)"

    const [insertResult] = await db.execute(insertSql, [req.body.username, hash])
    res.status(201).send("User has been created.")
  } catch (e) {
    res.status(500).json(e.message)
  }
}

export const loginNew = async (req, res) => {
  console.log('login')
  try {
    const q = "SELECT * FROM users WHERE username = ?"
    const [result] = await db.execute(q, [req.body.username])
    if (!Array.isArray(result) || Array.isArray(result) && result.length === 0) {
      return res.status(404).json("user not found")
    }

    const isPasswordCorrect = bcryptjs.compareSync(req.body.password, result[0].password)
    if (!isPasswordCorrect) return res.status(400).json({ msg: 'wrong username or password!', success: false })

    const token = jwt.sign({ id: result[0].id }, jwtSecret, { expiresIn: '2d' }) //, { algorithm: 'RS256' }
    res.status(200).json({ success: true, data: token })
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
}

export const login = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE username = ?"
    const [result] = await db.execute(q, [req.body.username])
    if (!Array.isArray(result) || Array.isArray(result) && result.length === 0) {
      return res.status(404).json("user not found")
    }

    const isPasswordCorrect = bcryptjs.compareSync(req.body.password, result[0].password)
    if (!isPasswordCorrect) return res.status(400).json({ msg: 'wrong username or password!', success: false })

    const { password, ...other } = result[0]
    const token = jwt.sign({ id: result[0].id }, jwtSecret, { algorithm: 'RS256' })
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(other)
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token', { sameSite: 'none', secure: true }).status(200).send('User has been logged out')
}