const Notification = ({ message: {text, type} }) => {
  const color = type === 'error' ? 'red' : 'green'

  if (text === null) return null

  return (
    <div className='message' style={{ color: color }}>
      {text}
    </div>
  )
}

export default Notification