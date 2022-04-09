import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [newLogin, setNewLogin] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setNewLogin({ ...newLogin, [e.target.name]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    login(newLogin)

    setNewLogin({ username: '', password: '' })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          id='username'
          name='username'
          onChange={handleChange}
          type='text'
          value={newLogin.username}
        />
      </div>
      <div>
        password:
        <input
          id='password'
          name='password'
          onChange={handleChange}
          type='password'
          value={newLogin.password}
        />
      </div>
      <div>
        <button id='login-button' type="submit">login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
