import { db } from '../db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  // console.log(req.body, '---req.body------------')
  // const q = "SELECT * FROM users;"
  const retrieveSql = `SELECT * FROM users WHERE email = ? OR username = ?`
  try {
    // console.log(retrieveSql, '-----retrieveSql')
    // const data = await db.execute(q, [req.query.email, req.query.username])
    const result = await db.execute(retrieveSql, [req.body.email, req.body.username])
    if (result[0].length) return res.status(409).json('user already existed')

    console.log("pass")
  } catch (e) {
    console.error(e.message, '----异常')
    return res.status(500).json(e.message)
  }

  try {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(req.body.password, salt)

    const insertSql = "INSERT INTO users(`username`,`email`,`password`) VALUES (?,?,?)"
    const values = [
      req.body.username,
      req.body.email,
      hash,
      // "lisa",
      // "lisa@qq.com",
      // "12312"
    ]
    const insertResult = await db.execute(insertSql, values)
    res.status(200).json("User has been created.")
  } catch (e) {
    res.status(500).json(e.message)
  }
}

export const login = async (req, res) => {
  try {
    const q = "SELECT * FROM users WHERE username = ?"
    const [result] = await db.execute(q, [req.body.username])
    if (result[0].length === 0) return res.status(404).json("user not found")
    console.log(req.body.password, result[0], '--result')

    const isPasswordCorrect = bcryptjs.compareSync(req.body.password, result[0].password)
    if (!isPasswordCorrect) return res.status(400).json('wrong username or password!')

    const { password, ...other } = result[0]
    const token = jwt.sign({ id: result[0].id }, "jwtkey")
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(other)
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token', { sameSite: 'none', secure: true }).status(200).send('User has been logged out')
}