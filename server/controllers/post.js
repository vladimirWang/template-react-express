import { db } from '../db.js'
import jwt from 'jsonwebtoken'

export const getPosts = async (req, res) => {
  const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"
  try {
    const [result] = await db.execute(q, req.query.cat ? [req.query.cat] : [])
    res.status(200).json(result.map(item => ({ ...item, img: 'http://localhost:8800/' + item.img })))
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const getPost = async (req, res) => {
  const q = "SELECT username, avatar, title, uid, p.id post_id, p.content content, cat, img, date FROM posts p JOIN users u on u.id = p.uid WHERE p.id = ?"
  try {
    const [result] = await db.execute(q, [req.params.id])
    res.status(200).json(result.length ? { ...result[0], img: 'http://localhost:8800/' + result[0].img } : {})
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const addPost = async (req, res) => {
  const uid = req.state && req.state.id
  console.log(uid, '---uid')
  // const q = "INSERT INTO posts(title,content,date,img,cat,uid) VALUES (?)"
  const q = "INSERT INTO posts(title,content,date,img,cat,uid) VALUES (?,?,?,?,?,?)"
  const { title, content, date, img, cat } = req.body
  try {
    const result = await db.execute(q, [title, content, date, img, cat, uid])
    // const [result] = await db.execute(q)
    res.status(200).send("Post has been added")
  } catch (err) {
    res.status(500).send(err.message)
  }
}
export const deletePost = async (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).send('No Autnenticated!')
  const uid = req.state && req.state.id

  const postId = req.params.id
  const q = "DELETE FROM posts WHERE id = ? AND uid = ?"
  try {
    const [result] = await db.execute(q, [postId, uid])
    // console.log(result, 'result')
    res.status(200).send("Post has been deleted")
  } catch (err) {
    res.status(500).send(err.message)
  }

  // res.json('from contr')

}
export const updatePost = async (req, res) => {
  const uid = req.state && req.state.id
  const q = "UPDATE posts SET title = ?,cat=?,content=?,img=? WHERE id = ?"
  // const q = "UPDATE posts SET title = ? WHERE id = ?"
  console.log(uid, '---uid')
  try {
    const { content, title, img, cat } = req.body
    const [result] = await db.execute(q, [title, cat, content, img, req.params.id])
    // const [result] = await db.execute(q, ['112313123', uid])
    res.status(200).send('post has been updated')
  } catch (err) {
    res.status(500).send(err.message)
  }
}
