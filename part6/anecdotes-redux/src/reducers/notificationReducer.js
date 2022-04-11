import { createSlice } from '@reduxjs/toolkit'

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notification(state, action) {
      return action.payload
    },
  }
})

export const { notification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(notification(text))

    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(notification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
