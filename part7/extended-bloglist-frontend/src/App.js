import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuthUser, logout } from './reducers/authUserReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography
} from '@mui/material'

const App = () => {
  const styles = {
    title: {
      padding: '20px 0'
    }
  }

  const dispatch = useDispatch()

  const authUser = useSelector(state => state.authUser)

  useEffect(() => {
    dispatch(initializeAuthUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const unauthRoutes = () => (
    <Routes>
      <Route path='/' element={<LoginForm />} />
    </Routes>
  )

  const authRoutes = () => (
    <Routes>
      <Route path='/' element={<BlogList />} />
      <Route path='/users' element={<UserList />} />
      <Route path='/users/:id' element={<User />} />
      <Route path='/blogs/:id' element={<Blog />} />
    </Routes>
  )

  if (authUser === null) {
    return (
      <>
        <Typography variant='h2' sx={styles.title}>
          log in to application
        </Typography>

        <Notification />

        {unauthRoutes()}
      </>
    )
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button color="inherit" component={Link} to='/'>
              blogs
            </Button>
            <Button color="inherit" component={Link} to='/users'>
              users
            </Button>
          </Box>
          <Typography variant='body1'>
            {authUser.name} logged-in
            <Button
              variant='outlined'
              color='inherit'
              onClick={() => dispatch(logout())}
            >
              logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography variant='h2' sx={styles.title}>
        blogs
      </Typography>

      <Notification />

      {authRoutes()}
    </Container>
  )
}

export default App
