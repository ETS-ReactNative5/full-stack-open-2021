import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const books = useQuery(ALL_BOOKS)

  const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  })

  const genres = useMemo(() => {
    const result = []

    if (!books.loading) {
      books.data.allBooks.map(book => {
        book.genres.map(genre => {
          if (!result.includes(genre)) {
            result.push(genre)
          }
        })
      })
    }
  
    return result
  }, [books])

  if (!show) return null

  if (books.loading || booksByGenre.loading) return <div>loading...</div>

  return (
    <>
      <h2>books</h2>
      {selectedGenre && (
        <p>in genre <strong>{selectedGenre}</strong></p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genres && (selectedGenre ? booksByGenre : books).data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
    </>
  )
}

export default Books
