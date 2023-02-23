import express from 'express'
import { addStock, getStockRecord, getStockDetail, updateStock } from '../controllers/stock.js'

const router = express.Router()

router.post('/', addStock)
router.get('/:id', getStockRecord)
router.get('/detail/:id', getStockDetail)
router.put('/:id', updateStock)

export default router