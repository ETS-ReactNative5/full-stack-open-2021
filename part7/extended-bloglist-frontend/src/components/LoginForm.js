import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authUserReducer'
import { Box, TextField, Button } from '@mui/material'

const LoginForm = () => {
  const styles = {
    input: {
      padding: '10px 0',
    }
  }

  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login(credentials))
  }

  return (
    <form onSubmit={handleLogin}>
      <Box sx={styles.input}>
        <TextField
          label='username'
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </Box>
      <Box sx={styles.input}>
        <TextField
          label='password'
          type='password'
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </Box>
      <Button variant='contained' color='primary' type='submit'>
        login
      </Button>
    </form>
  )
}

export default LoginForm
