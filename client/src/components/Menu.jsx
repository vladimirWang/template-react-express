import React, { useState, useEffect } from 'react'
import { posts2 } from '../pages/Home'
import { useLoadPostsHook } from '@/hooks.js'

function Menu({ cat }) {
  const [posts] = useLoadPostsHook(cat)
  return (
    <div className='menu'>
      <h1>other posts you may like</h1>
      {
        (Array.isArray(posts) ? posts : []).map(post => (
          <div className="post" key={post.id}>
            <img src={post.img} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        ))
      }
    </div>
  )
}
export default Menu;
