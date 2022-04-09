import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const handleCreateBlog = (e) => {
    e.preventDefault()

    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new blog</h2>

      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            id='title'
            name='title'
            onChange={handleChange}
            type='text'
            value={newBlog.title}
            placeholder='write here title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            name='author'
            onChange={handleChange}
            type='text'
            value={newBlog.author}
            placeholder='write here author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            name='url'
            onChange={handleChange}
            type='text'
            value={newBlog.url}
            placeholder='write here url'
          />
        </div>
        <div>
          <button id='blog-form-button' type="submit">create</button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm