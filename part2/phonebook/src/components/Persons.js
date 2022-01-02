const Persons = ({ persons, search }) => {
  
  if (persons.length === 0) {
    return <p>You have not added any person to the phone book</p>
  }

  return persons.map((item) => {
    const itemFormatted = item.name.toUpperCase()
    const searchFormatted = search.toUpperCase()

    if (itemFormatted.includes(searchFormatted)) {
      return (
        <div key={item.name}>
          {`${item.name} ${item.number}`}
        </div>
      )
    }
  })  
}

export default Persons