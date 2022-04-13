import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Paper, Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const styles = {
    paper: {
      margin: '10px 0',
      padding: '10px',
    }
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Paper variant='outlined' sx={styles.paper}>
      <div style={hideWhenVisible}>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='contained'
          color='primary'
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </Paper>
  )
})

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
