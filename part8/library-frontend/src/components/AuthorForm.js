import { useState, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ setError, show }) => {
  const authors = useQuery(ALL_AUTHORS)

  const [ changeAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const options = useMemo(() => {
    const result = []

    if (!authors.loading) {
      authors.data.allAuthors.map(author => {
        result.push({ value: author.name, label: author.name })
      })
    }

    return result
  }, [authors])

  if (!show) return null

  const submit = async (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name: selectedOption.value, setBornTo: Number(born) }})

    setSelectedOption(null)
    setBorn('')
  }

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={(data) => setSelectedOption(data)}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit birthyear</button>
      </form>
    </>
  )
}

export default AuthorForm
