import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    text: null,
    type: '',
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const isDupe = persons.find((item) => item.name === newPerson.name)

    if (isDupe) {
      const updateConfirm = window.confirm(`${isDupe.name} is already added to phonebook, replace the old number with a new one?`)

      if (updateConfirm) {
        personService
          .update(isDupe.id, newPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(item => item.id !== isDupe.id ? item : returnedPerson))
            setMessage({ text: `Updated ${isDupe.name}`, type: 'success'})
            setTimeout(() => setMessage({ text: null, type: '' }), 5000)
          })
          .catch(() => {
            setMessage({ text: `Information of ${isDupe.name} has already been removed from the server`, type: 'error'})
            setTimeout(() => setMessage({ text: null, type: '' }), 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'success'})
          setTimeout(() => setMessage({ text: null, type: '' }), 5000)
        })
    }
    setNewPerson({ name: '', number: '' })
  }

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value })
  }

  const handleDelete = (person) => {
    const deleteConfirm = window.confirm(`Delete ${person.name}`)

    if (deleteConfirm) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(item => item.id !== person.id))
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />

      <h3>Add a new</h3>
      <PersonForm
        newPerson={newPerson}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        onClick={handleDelete}
        search={filter}
      />
    </>
  )
}

export default App