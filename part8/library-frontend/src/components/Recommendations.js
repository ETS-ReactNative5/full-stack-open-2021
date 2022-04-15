import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS_BY_GENRE } from '../queries'

const Recommendations = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  const me = useQuery(ME)

  const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  useEffect(() => {
    if (me.data) {
      setFavoriteGenre(me.data.me.favoriteGenre)
    }
  }, [me])

  if (!show) return null

  if (booksByGenre.loading) return <div>loading...</div>

  return (
    <>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.pusblished}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommendations
