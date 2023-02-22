import express from 'express'
import { body, query, param, validationResult } from 'express-validator'
import {
  addProduct, getProducts, getProductById, updateProduct,
  getProductsWithPagination
} from '../controllers/product.js'

const router = express.Router()

router.post(
  '/', 
  // body('productName').not().isEmpty(), 
  // body('productId').not().isEmpty(),
  addProduct
)
router.get('/pagition', getProductsWithPagination)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', param('id').not().isEmpty(), updateProduct)

export default router