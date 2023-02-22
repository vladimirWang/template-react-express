import express from 'express'
import { body, query, param, validationResult } from 'express-validator'
import Foo from '../models/foo.js'
// import { Teams } from '../models/team.js'
import { Players, Teams } from '../models/teamPlayer.js'
import Bar from '../models/bar.js'
import {Product, Stock} from '../models/productStock.js'
import { Sequelize } from 'sequelize'
import db from '../models/index.js'

const router = express.Router()

router.get('/constraint', async (req, res) => {
  try {
    const result = await Bar.findAll({where: {id: req.query.id}}, {include: Foo})
    res.json(result)
  } catch (error) {
    res.send(error.message)
  }
})

// SELECT SUM(s.count), p.id FROM products p LEFT JOIN stocks s on p.id = s.productId GROUP BY p.id;
router.get('/get-include-count', async (req, res) => {
  try {
    // const product = await Product.findAll({
    //   attributes: {
    //     include: [
    //       [sequelize.fn('COUNT', sequelize.col('*')), 'n_id']
    //     ]
    //   }
    // })
    // const ret = await Stock.sum('count', { group: 'productId' }) // 只有第一个
    // console.log(Sequelize.fn, Sequelize.col)

    // const ret2 = await Stock.findAll({  // 查出三个
    //   attributes: [
    //     [Sequelize.fn('SUM', Sequelize.col('count')), 'count'],
    //     'productId',
    //   ],
    //   group: 'productId'
    // })

    // const ret3 = await Product.findAll({
    //   attributes: [
    //     'productName',
    //     'id'
    //   ],
    //   include: {
    //     model: Stock,
    //     attributes: ['count', 'id']
    //   },
    //   group: 'id'
    // })
    //  p left join stocks on p.id = s.productId
    // const [ret3] = await db.query(`
    //   SELECT SUM(s.count) sum, p.id, p.productName, s.id sid, s.count scount FROM products p LEFT JOIN stocks s on p.id = s.productId GROUP BY p.id
    // `)

    const [ret3] = await db.query(`
      SELECT * FROM products p LEFT JOIN stocks s ON s.productId = p.id WHERE p.productId LIKE "%fas%"
    `)
    // const ret = await Stock.findAll[{
    //   attributes: [
    //     'sum', [Sequelize.fn('SUM', Sequelize.col('count'))]
    //   ], group: 'productId', raw: true
    // }]
    // const product = await Stock.findByPk(4, {include: Product})
    // const product = await Product.findAll({include: Stock, where: {id: 1}})
    // const product = await Players.findAll({ include: Teams })
    // const product = await Teams.findAll({ include: Players })
    // const p1 = await Product.findByPk(1)
    
    // const ret = await Product.findAll({group: 'id', include: Stock})
    // const ret = await Stock.find
    // const p3 = await Players.findByPk(5)
    // // const p3 = await Players.create({playerName: '范志毅'})
    // const ret = await t.removePlayer(p3)
    // console.log(ret, '------------------p2');
    // /**
    //  * getPlayers countPlayers hasPlayer hasPlayers
    //  * setPlayers addPlayer   addPlayers
    //  * removePlayer  removePlayers   createPlayer
    //  */
    // const ret = await t.getPlayers()
    res.json(ret3)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/', async (req, res) => {
  const {name, fooId} = req.body
  try {
    const result = await Bar.build({name, fooId}, {include: Foo})
    const re = await result.save()
    re.setFoo(fooId)
    console.log(re, '---bar proty')
    
    res.json(re)
  } catch (error) {
    res.send(error.message)
  }
})

export default router