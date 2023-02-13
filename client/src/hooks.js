import { useState, useEffect } from 'react'
import { getPosts } from '@/api/post.js'

export function useLoadPostsHook(cat) {
  const [posts, setPosts] = useState([])
  const loadPosts = async () => {
    try {
      const data = await getPosts(cat)
      // console.log('ff', data)
      setPosts(data)
    } catch (err) {
      console.error(err.message, '----异常')
    }
  }

  useEffect(() => {
    loadPosts()
  }, [cat])

  return [posts]
}
