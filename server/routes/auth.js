import express from 'express'
// import bodyParser from 'body-parser'
import { register, login, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router