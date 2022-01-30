import Country from './Country'
import Button from './Button'

const Countries = ({ countries, onClick, search }) => {
  if (search) {
    if (countries.length === 1) {
      return (
        <Country data={countries[0]} />
      )
    }

    if (countries.length <= 10) {
      return (
        countries.map(({ name: {common} }) => (
          <div key={common}>
            {common}
            <Button handleClick={() => onClick(common)} text="show" />
          </div>
        ))
      )
    }
    
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }

  return null
}

export default Countries