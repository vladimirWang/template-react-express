import express from 'express'
import { getPosts, getPost, deletePost, updatePost, addPost } from '../controllers/post.js'
import { authValidator, myLogger, validateCookies } from '../middlewares.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', authValidator, addPost)
router.delete('/:id', authValidator, deletePost)
router.put('/:id', authValidator, updatePost)

export default router