import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { jwtSecret } from '../config.js'
import User from '../models/users.js'


export const register = async (req, res) => {
  console.log(req.body, '---req.body------------')
  const { username, password } = req.body
  try {
    const existedUser = await User.findOne({ where: { username: username } })
    console.log(existedUser, '---existedUser')
    if (existedUser) {
      return res.status(409).json({ success: false, msg: 'username already existed' })
    }
    res.status(200).json({ success: true, msg: '注册成功' })
  } catch (error) {
    console.error(error.message, '---注册时，查询已存在用户异常')
    res.status(500).json(error.message)
  }

  try {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(password, salt)
    const user = await User.create({ username, password: hash })
    res.status(201).send({ success: true, msg: '注册成功' })
  } catch (e) {
    res.status(500).json(e.message)
  }
}

export const loginNew = async (req, res) => {
  console.log('login')
  try {
    // const q = "SELECT * FROM users WHERE username = ?"
    // const [result] = await db.execute(q, [req.body.username])
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(200).json({ msg: "user not found", success: false })
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password)
    if (!isPasswordCorrect) return res.status(200).json({ msg: 'wrong username or password!', success: false })
    const token = jwt.sign({ id: user.get('id') }, jwtSecret, { expiresIn: '2d' }) //, { algorithm: 'RS256' }
    res.status(200).json({ success: true, data: token, msg: '登录成功' })
  } catch (e) {
    console.error(e.message, '----异常了')
    res.status(500).send(e.message)
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token', { sameSite: 'none', secure: true }).status(200).send('User has been logged out')
}