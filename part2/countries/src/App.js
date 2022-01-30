import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let res = countries.filter(
      ({ name: {common} }) => common.toLowerCase().includes(filter.toLowerCase())
    )

    res.sort(({name: {common: a}}, {name: {common: b}}) => (
      a < b ? -1 : a < b ? 1 : 0
    ))
    
    setFilteredCountries(res)
  }, [filter])

  const handleClick = (country) => {
    let res = filteredCountries.filter(
      ({ name: {common} }) => common.toLowerCase().includes(country.toLowerCase())
    )

    setFilteredCountries(res)
  }

  return (
    <>
      <Filter
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      
      <Countries
        countries={filteredCountries}
        onClick={handleClick}
        search={filter}
      />
    </>
  );
}

export default App;
