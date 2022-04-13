import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'LIKE_BLOG':
    var { id } = action.data
    var blogToChange = state.find((n) => n.id === id)
    var changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    return state.map(item => item.id !== id ? item : changedBlog)
  case 'COMMENT_BLOG':
    var { blog, comment } = action.data
    var toChange = state.find((n) => n.id === blog.id)
    var changed = { ...toChange, comments: toChange.comments.concat(comment) }
    return state.map(item => item.id !== blog.id ? item : changed)
  default:
    return state
  }
}

const add = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog,
  }
}

const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs,
  }
}

const remove = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: { id },
  }
}

const like = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: { id },
  }
}

const comment = (blog, comment) => {
  return {
    type: 'COMMENT_BLOG',
    data: { blog, comment },
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(add(newBlog))
      dispatch(setNotification(`a new blog ${content.title} added`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      dispatch(remove(blog.id))
      dispatch(setNotification(`blog ${blog.title} deleted`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const blogToChange = await blogService.update({ ...blog,  likes: blog.likes + 1 })
      dispatch(like(blogToChange.id))
      dispatch(setNotification(`blog ${blog.title} edited`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(`cannot update blog ${blog.title}`, 'error', 5))
    }
  }
}

export const commentBlog = (blog, text) => {
  return async dispatch => {
    try {
      const blogToChange = await blogService.update({ ...blog, comments: blog.comments.concat(text) })
      dispatch(comment(blogToChange, text))
      dispatch(setNotification(`blog ${blog.title} commented`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(`cannot comment blog ${blog.title}`, 'error', 5))
    }
  }
}

export default blogReducer
