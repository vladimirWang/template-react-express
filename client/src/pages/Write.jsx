import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { uploadFile } from '@/api/utils'
import { addPost, updatePost } from '@/api/post'
import { useLocation } from 'react-router-dom';
import moment from 'moment'

function Write() {
  const state = useLocation().state
  const [value, setValue] = useState(state?.content || '')
  const [title, setTitle] = useState(state?.title || '')
  const [file, setFile] = useState('')
  const [cat, setCat] = useState(state?.cat || '')

  const handlePublish = async () => {
    try {
      const res = state ? await updatePost(state.post_id, {
        title,
        content: value,
        img: file,
        cat
      }) : addPost({
        title,
        content: value,
        img: file,
        cat,
        date: moment().format('YYYY-MM-DD hh:mm:ss')
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (files.length === 0) return
    setFile(files[0])
    const fd = new FormData()
    fd.append('file', files[0])
    try {
      const filename = await uploadFile(fd)
      setFile(filename)
    } catch (err) { }
  }
  return (
    <div className='add'>
      <div className="content">
        <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className="editContainer">
          <ReactQuill className='edit' value={value} onChange={setValue} theme='snow' />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type="file" name="" id="file" onChange={(e) => {
            handleFileUpload(e)
          }} style={{ display: 'none' }} />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" checked={cat === 'technology'} name="cat" value="technology" id="art" onChange={e => setCat(e.target.value)} />
            <label htmlFor="art">technology</label>
          </div>
          <div className='radio-item'>
            <input type="radio" checked={cat === 'movie'} name="cat" value="movie" id="science" onChange={e => setCat(e.target.value)} />
            <label htmlFor="science">movie</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Write;
