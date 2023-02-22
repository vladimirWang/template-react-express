import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import productRouter from './routes/product.js'
import testRouter from './routes/test.js'
import stockRouter from './routes/stock.js'
import { cookieValidator, authValidator, authValidator2 } from './middlewares.js'
import multer from 'multer'
import { __dirname, __filename } from './util.js'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
import { jwtSecret } from './config.js'
import { expressjwt } from 'express-jwt'
import './models/index.js'

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, './uploads/'))
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log')
})

const upload = multer({ storage: multerStorage })
const app = express();

app.use('/static', express.static('uploads'))
app.use(expressjwt({ secret: jwtSecret, algorithms: ["HS256"], })
  .unless({ 
    path: ['/static', '/api/auth/login', '/api/auth/register', '/api/user/test', '/api/test/constraint', '/api/test', '/api/test/get-include-count'] 
  }))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json({ success: true, msg: '文件上传成功', data: req.file.filename })
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/stock', stockRouter)
app.use('/api/test', testRouter)

app.listen(8800, () => {
  console.log('connected')
})