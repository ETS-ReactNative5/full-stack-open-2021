import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const addComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    dispatch(commentBlog(blog, comment))
  }

  return (
    <form onSubmit={addComment}>
      <input
        id="comment"
        name="comment"
        type="text"
        placeholder="write here comment"
      />
      <button id="comment-form-button" type="submit">
        add comment
      </button>
    </form>
  )
}

export default CommentForm
