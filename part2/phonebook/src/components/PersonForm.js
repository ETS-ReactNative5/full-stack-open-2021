const PersonForm = ({ newPerson, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      {'name: '} 
      <input
        name='name'
        onChange={onChange}
        type='text'
        value={newPerson.name}
      />
    </div>
    <div>
      {'number: '}
      <input
        name='number'
        onChange={onChange}
        type='number'
        value={newPerson.number}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm