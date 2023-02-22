import express from 'express'
// import bodyParser from 'body-parser'
import { addStock, getStockRecord } from '../controllers/stock.js'

const router = express.Router()

router.post('/', addStock)
router.get('/:id', getStockRecord)

export default router