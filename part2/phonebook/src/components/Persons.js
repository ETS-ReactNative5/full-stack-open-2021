import Button from './Button'

const Persons = ({ persons, onClick, search }) => {
  
  if (persons.length === 0) {
    return <p>You have not added any person to the phone book</p>
  }

  return persons.map((item) => {
    const { name, number } = item
    const itemFormatted = name.toUpperCase()
    const searchFormatted = search.toUpperCase()

    if (itemFormatted.includes(searchFormatted)) {
      return (
        <div key={name}>
          {`${name} ${number}`}
          <Button handleClick={() => onClick(item)} text="delete" />
        </div>
      )
    }
  })  
}

export default Persons