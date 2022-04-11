import { useSelector, useDispatch } from 'react-redux'
import { editAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes

    return anecdotes.filter((item) => item.content.toLowerCase().match(filter.toLowerCase()))
  })

  const voteAnecdote = (anecdote) => {
    dispatch(editAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote => {
        return (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        )
      })
  )
}

export default AnecdoteList