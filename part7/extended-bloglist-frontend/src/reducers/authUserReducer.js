import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const authReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_AUTH_USER':
    return action.data
  default:
    return state
  }
}

const setAuthUser = (user = null) => {
  return {
    type: 'SET_AUTH_USER',
    data: user,
  }
}

export const initializeAuthUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setAuthUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setAuthUser(user))
    } catch (error) {
      dispatch(setNotification('wrong credentials', 'error', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setAuthUser())
  }
}

export default authReducer