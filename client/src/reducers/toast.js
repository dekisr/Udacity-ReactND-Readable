import { SET_TOAST, RID_TOAST } from '../actions/toast'

const toast = (state = {}, action) => {
  switch (action.type) {
    case SET_TOAST:
      return {
        ...state,
        [action.id]: {
          isVisible: true,
          id: action.id,
          alertType: action.alertType,
          message: action.message
        }
      }
    case RID_TOAST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isVisible: false
        }
      }
    default:
      return state
  }
}

export default toast
