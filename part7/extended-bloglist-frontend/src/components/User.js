import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Typography } from '@mui/material'

const User = () => {
  const styles = {
    title: {
      padding: '20px 0'
    }
  }

  const users = useSelector((state) => state.user)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) return null

  return (
    <>
      <Typography variant='h4' sx={styles.title}>
        {user.name}
      </Typography>

      <Typography variant='h5' sx={styles.title}>
        added blogs
      </Typography>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.url}>
            <Typography variant='body1'>
              {blog.title}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  )
}

export default User
