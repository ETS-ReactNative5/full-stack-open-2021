import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Box, TextField, Typography } from '@mui/material'

const BlogForm = () => {
  const styles = {
    input: {
      padding: '10px 0'
    }
  }

  const dispatch = useDispatch()

  const [newBlog, setNewBlog] = useState({
    title: '',
  })

  const addBlog = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    dispatch(createBlog({ title, author, url }))
  }

  return (
    <>
      <Typography variant='h4'>
        create new blog
      </Typography>
      <form onSubmit={addBlog}>
        <Box sx={styles.input}>
          <TextField
            id='title'
            label='title'
            type='text'
            placeholder='write here title'
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </Box>
        <Box sx={styles.input}>
          <TextField
            id='author'
            label='author'
            type='text'
            placeholder='write here author'
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </Box>
        <Box sx={styles.input}>
          <TextField
            id='url'
            label='url'
            type='text'
            placeholder='write here url'
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </Box>
        <button id='blog-form-button' type='submit'>
          create
        </button>
      </form>
    </>
  )
}

export default BlogForm
