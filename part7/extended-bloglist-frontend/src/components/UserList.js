import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const UserList = () => {
  const styles = {
    title: {
      padding: '20px 0'
    }
  }

  const users = useSelector(state => state.user)

  if (!users) return null

  return (
    <>
      <Typography variant='h4' sx={styles.title}>
        users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.username}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList
