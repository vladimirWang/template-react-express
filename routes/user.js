import express from 'express'
import { userInfo } from '../controllers/user.js'

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('ok')
})
router.get('/userInfo', userInfo)

export default router