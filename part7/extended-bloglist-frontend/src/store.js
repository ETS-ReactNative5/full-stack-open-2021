import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authUserReducer from './reducers/authUserReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    authUser: authUserReducer,
    user: userReducer,
  }
})

export default store