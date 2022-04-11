import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(item => item.id !== id ? item : changedAnecdote)
    }
    case 'NEW_ANECDOTE': 
      return state.concat(action.data)
    case 'SET_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id },
  }
}

export const add = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote,
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: anecdotes
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}

export const editAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(anecdoteToChange.id))
  }

}

export default reducer