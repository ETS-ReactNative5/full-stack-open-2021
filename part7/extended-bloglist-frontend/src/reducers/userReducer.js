import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.data
  default:
    return state
  }
}

const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    data: users,
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userReducer