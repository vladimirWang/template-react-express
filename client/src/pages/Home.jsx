import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext.jsx';
import { useLoadPostsHook } from '@/hooks.js'
import { useBearStore, createPeopleStore } from '@/store'
// https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
// https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
// https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
// https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//
const imgIds = ['7008010', '6489663', '4230630', '6157049'];

export const posts2 = imgIds.map((item, index) => {
  return {
    id: index,
    title: 'hello world, fasdfasdf fasdfasdf fasd fffffffffffffff',
    content: 'fadsfadsf faaaaaaaaaaaaaaaa asdfasdfasd, fadsfadsf faaaaaaaaaaaaaaaa asdfasdfasd, fadsfadsf faaaaaaaaaaaaaaaa asdfasdfasd, fadsfadsf faaaaaaaaaaaaaaaa asdfasdfasd, ',
    img: `https://images.pexels.com/photos/${item}/pexels-photo-${item}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
  };
});
function Home() {
  const people = createPeopleStore(state => state.people)
  const addPeople = createPeopleStore(state => state.add)
  const bears = useBearStore((state) => state.bears)
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const cat = useLocation().search
  const navigate = useNavigate()
  const [posts] = useLoadPostsHook()

  const getText = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }
  const [val, setVal] = useState('')
  console.log(posts, '---post')
  return (
    <div className="home">
      <button onClick={increasePopulation}>one up</button>
      <h1>{bears} around here</h1>
      <input type="text" value={val} onChange={e => setVal(e.target.value)} onKeyUp={e => {
        if (e.keyCode === 13) {
          addPeople(val)
          setVal('')
        }
      }} />
      <ul>
        {people.map(item => <li key={item}>{item}</li>)}
      </ul>
      {/* <img src="http://localhost:8800/1676013153830_tiktok.jpg" /> */}
      {/* <img src="http://localhost:8800/1676012851427_promise.jpg" alt="" /> */}
      <div className="posts">
        {(Array.isArray(posts) ? posts : []).map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`} className="link">
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content)}</p>
              <button onClick={() => navigate('/post/' + post.id)}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
