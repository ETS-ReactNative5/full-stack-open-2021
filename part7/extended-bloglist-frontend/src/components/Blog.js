import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { Button, Typography } from '@mui/material'

const Blog = () => {
  const styles = {
    title: {
      padding: '20px 0'
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authUser = useSelector(state => state.authUser)
  const blogs = useSelector((state) => state.blog)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const editBlog = (data) => {
    dispatch(likeBlog(data))
  }

  const deleteBlog = (data) => {
    const deleteConfirm = window.confirm(
      `Remove blog ${data.title} by ${data.author}`
    )

    if (deleteConfirm) {
      dispatch(removeBlog(data))
      navigate('/')
    }
  }

  if (!blog) return null

  return (
    <div className="blogDetails">
      <Typography variant='h4' sx={styles.title}>
        {`${blog.title} ${blog.author}`}
      </Typography>

      <Typography variant='body1'>
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant='body1'>
        {`likes ${blog.likes} `}
        <button onClick={() => editBlog({ ...blog, likes: blog.likes + 1 })}>
          like
        </button>
      </Typography>
      {blog.user && (
        <Typography variant='body1'>
          {`added by ${blog.user.name}`}
        </Typography>
      )}

      <Typography variant='h5' sx={styles.title}>
        comments
      </Typography>

      <CommentForm blog={blog} />
      <CommentList blog={blog} />

      {blog.user && blog.user.username === authUser.username && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => deleteBlog(blog)}
        >
          remove
        </Button>
      )}
    </div>
  )
}

export default Blog
