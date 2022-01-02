import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const isDupe = persons.find((item) => item.name === newPerson.name)

    if (isDupe) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))  
    }
    setNewPerson({ name: '', number: '' })
  }

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} search={filter} />
    </>
  )
}

export default App