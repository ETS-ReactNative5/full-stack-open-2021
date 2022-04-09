import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({
    text: null,
    type: '',
  })
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (newLogin) => {
    try {
      const { username, password } = newLogin
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage({ text: null, type: '' }), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = (data) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(data)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({ text: `a new blog ${returnedBlog.title} added`, type: 'success' })
        setTimeout(() => setMessage({ text: null, type: '' }), 5000)
      })
      .catch(error => {
        setMessage({ text: error.response.data.error, type: 'error' })
        setTimeout(() => setMessage({ text: null, type: '' }), 5000)
      })
  }

  const editBlog = (data) => {
    blogService
      .update(data)
      .then(returnedBlog => {
        setBlogs(blogs.map(item => item.id !== data.id ? item : data))
        setMessage({ text: `blog ${returnedBlog.title} edited`, type: 'success' })
        setTimeout(() => setMessage({ text: null, type: '' }), 5000)
      })
      .catch(error => {
        setMessage({ text: error.response.data.error, type: 'error' })
        setTimeout(() => setMessage({ text: null, type: '' }), 5000)
      })
  }

  const deleteBlog = (data) => {
    const deleteConfirm = window.confirm(`Remove blog ${data.title} by ${data.author}`)

    if (deleteConfirm) {
      blogService
        .remove(data)
        .then(() => {
          setBlogs(blogs.filter(item => item.id !== data.id))
          setMessage({ text: `Blog ${data.title} deleted`, type: 'success' })
          setTimeout(() => setMessage({ text: null, type: '' }), 5000)
        })
        .catch(error => {
          setMessage({ text: error.response.data.error, type: 'error' })
          setTimeout(() => setMessage({ text: null, type: '' }), 5000)
        })
    }
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>

        <Notification message={message} />

        <LoginForm login={login} />
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>

      <Notification message={message} />

      <p>
        {user.name} logged-in
        <Button handleClick={() => handleLogout()} text="logout" />
      </p>

      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onEdit={editBlog}
            onDelete={deleteBlog}
            user={user}
          />
        )
      }
    </>
  )
}

export default App
