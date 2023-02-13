import React, { useState, useEffect, useContext } from 'react'
import Edit from '../img/logo.jpg'
import Delete from '../img/logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { getPost, deletePost } from '@/api/post'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

function Single() {

  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const postId = location.pathname.split('/')[2]

  const loadPost = async () => {
    try {
      const data = await getPost(postId)
      setPost(data)
    } catch (err) { }
  }
  useEffect(() => {
    loadPost()
  }, [postId])

  const handleDelete = async () => {
    try {
      const data = await deletePost(postId)
      setPost(data)
      console.log(data, '---data')
    } catch (err) {
      console.error(err.message, '------异常了')
    }
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={post ? post.img : null} alt="" />
        <div className="user">
          {post.avatar && <img src={post.avatar} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.id === post.uid && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" onClick={handleDelete} />
          </div>}
        </div>
        <h1>{post ? post.title : null}</h1>
        {post ? post.content : null}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}
export default Single;
