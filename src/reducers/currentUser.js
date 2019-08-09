import { SET_CURRENT_USER } from '../actions/currentUser'

const currentUser = (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.name
    default:
      return state
  }
}

export default currentUser
