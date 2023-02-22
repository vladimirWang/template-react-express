import express from 'express'
// import bodyParser from 'body-parser'
import { register, logout, loginNew } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', loginNew)
router.post('/logout', logout)

export default router