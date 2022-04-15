import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import AuthorForm from './components/AuthorForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null

  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => { setErrorMessage(null) }, 10000)
  }

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('editAuthor')}>edit author</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <LoginForm setError={notify} setToken={setToken} setPage={setPage} show={page === 'login'} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      {token && (
        <>
          <BookForm setError={notify} show={page === 'add'} />
          <AuthorForm setError={notify} show={page === 'editAuthor'} />
          <Recommendations show={page === 'recommend'} />
        </>
      )}
    </>
  )
}

export default App
