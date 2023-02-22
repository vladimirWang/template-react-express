import {Product} from '../models/productStock.js'
import {body, validationResult} from 'express-validator'
import * as _ from 'lodash'
import db from '../models/index.js'

function genInsertSql(tbName, body, numberFields = []) {
  const fields = Object.keys(body).reduce((a, c) => {
    if(body[c] !== undefined) {
      a.push(c)
    }
    return a
  }, []).concat(['createdAt', 'updatedAt'])

  const today = new Date();
  const year = today.getFullYear()
  const month = today.getMonth()+1
  const date = today.getDate()
  const values = Object.keys(body).reduce((a, c) => {
    if (body[c] !== undefined) {
      a.push(numberFields.includes(c) ? body[c] : `"${body[c]}"`)
    }
    return a
  }, []).concat([`"${year}-${month}-${date}"`, `"${year}-${month}-${date}"`])
  return `INSERT INTO ${tbName} (${fields.join(',')}) VALUES (${values.join(',')})`
}


export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: req.query })

    res.send({ msg: '查询成功', data: products , success: true})
    // const where = genWhere(_.default.omit(req.query, ['page', 'pageSize']), [strFields])
    // const querySql = `SELECT * FROM products ` + where + genLimit(req.query)
    // // res.json('result')
    // const totalSql = "SELECT COUNT(1) as total FROM products"
    // // const q = "INSERT products (name, author) VALUES (?,?)"
    // // const { name, author } = req.body
    // const [result] = await db.execute(querySql)
    // let totalResult
    // const {page, pageSize} = req.query
    // if (page && pageSize) {
    //   [[totalResult]] = await db.execute(totalSql)
    // }

    // // const [[totalResult]] = await db.execute(totalSql)
    // console.log(totalResult, '---totalResult')
    // res.status(200)
    // if (page && pageSize) {
    //   res.json({ list: result, total: totalResult.total })
    // } else {
    //   res.json(result)
    // }
    

    // console.log(result, '--result')
    // res.status(200).send({ success: true, data: { id: result.insertId } })
  } catch (error) {
    console.log(error.message, '-----查询商品列表异常')
    res.status(500).send({ success: false, msg: error.message })
  }
}

export const getProductsWithPagination = async (req, res) => {
  try {
    const { page, pageSize, productId, productName } = req.query
    const offset = (page - 1) * pageSize
    const limit = ` LIMIT ${pageSize} OFFSET ${offset}`
    const groupBy = ' GROUP BY p.id '
    let sql = `
              SELECT SUM(s.count) sum, p.productId productId, p.id id, p.productName, p.img img FROM products p LEFT JOIN stocks s
        on p.id = s.productId WHERE 1 = 1
      `
    const whereProductId = ` AND p.productId LIKE "%${productId}%"`
    const whereProductName = ` AND p.productName LIKE "%${productName}%"`
    if (productId) {
      sql = sql + whereProductId
    }
    if (productName) {
      sql += whereProductName
    }
    sql += groupBy+ limit
    let [rows] = await db.query(sql)
    rows = rows.map(item => {
      return {...item, sum: !item.sum ? '0' : item.sum}
    })
    let totalSql = `
      SELECT COUNT(*) count FROM products p WHERE 1 = 1 
    `
    if (productId) {
      totalSql += whereProductId
    }
    if (productName) {
      totalSql += whereProductName
    }
    const [[{count}]] = await db.query(totalSql)
    console.log(count, '---count')
    res.status(200).json({success: true, data: {rows, count}})
  } catch (error) {
    res.status(500).send(error.message)
  }
}
export const getProductById = async (req, res) => {
  try {
    // const product = await Product.findByPk(req.params.id)
    const [result] = await db.query(`SELECT * FROM products p WHERE p.id = ${req.params.id}`) 
    console.log(result, '---result')
    if (result.length === 0) return res.status(404).send({ success: false, msg: 'Specified product does not existed' })
    res.status(200).send({ success: true, data: result[0] })
  } catch (error) {
    console.log(error.message, '-----查询商品详情异常')
    res.status(500).send({ success: false, msg: error.message })
  }
}

export const addProduct = async (req, res) => {
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors, '---校验异常')
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  // } catch (error) {
  //   console.log(error.message, '-----插入商品参数校验异常')
  //   res.status(500).send({ success: false, msg: error.message })
  // }

  try {
    const { productName, productId, img, author, remark } = req.body

    // INSERT products(productId, productName, author, createdAt, updatedAt) 
    // VALUES("123", "商品名称123123", "1", "2022-10-01", "2023-10-09");
    const insertSql = genInsertSql("products", { productName, productId, img, author, remark })
    const [result] = await db.query(insertSql)
    console.log(result, '---result');
    
    res.status(200).send({ success: true, data: { id: '1' }, msg: '商品新建成功' })
  } catch (error) {
    res.status(500).send({success: false, msg: error.message})
  }
}

export async function updateProduct(req, res) {
  // const errors = validationResult(req);
  // console.log(errors, '---erros');
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  // const updateSql = genUpdateSql('products', req.body, {id: req.params.id}, strFields)
  // console.log(updateSql, '---udpate sql')
  try {
    const product = await Product.update({...req.body}, {
      where: { id: req.params.id }
    })
    res.json({success: true, msg: '更新成功'})
  } catch (error) {
    res.status(500).send(error.message)
  }
}