import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import { cookieValidator, authValidator } from './middlewares.js'
import multer from 'multer'
import { __dirname, __filename } from './util.js'

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, './uploads/'))
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage: multerStorage })
const app = express();
app.use(express.static('uploads'))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).send(req.file.filename)
})
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user', userRouter)

app.listen(8800, () => {
  console.log('connected')
})