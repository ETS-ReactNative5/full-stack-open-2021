const Filter = ({ value, onChange }) => (
  <>
    {'filter shown with '}
    <input onChange={onChange} value={value} /> 
  </>
)

export default Filter