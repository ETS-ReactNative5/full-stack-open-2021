import { Typography } from '@mui/material'

const CommentList = ({ blog }) => {
  return (
    <ul>
      {blog.comments.map((comment, i) => (
        <li key={i}>
          <Typography variant='body1'>
            {comment}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
