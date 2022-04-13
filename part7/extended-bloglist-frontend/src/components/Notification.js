import { connect } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = (props) => {
  const notification = props.notification

  return (
    <>
      {notification && (
        <Alert severity={notification.type}>
          {notification.text}
        </Alert>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification