import { SET_TOAST, RID_TOAST } from '../actions/toast'

const initalState = {
  isVisible: false,
  alertType: '',
  message: '',
}

const toast = (state = { ...initalState }, action) => {
  switch (action.type) {
    case SET_TOAST:
      return {
        ...state,
        isVisible: true,
        alertType: action.alertType,
        message: action.message
      }
    case RID_TOAST:
      return {
        ...initalState
      }
    default:
      return state
  }
}

export default toast
