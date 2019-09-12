import { SET_STATUS_LOG, UPDATE_SESSION_LOG } from '../actions/sessionLog'

const sessionLog = (state = { new: false, messages: [] }, action) => {
  switch (action.type) {
    case SET_STATUS_LOG:
      return {
        ...state,
        new: action.status
      }
    case UPDATE_SESSION_LOG:
      return {
        ...state,
        messages: [
          {
            timestamp: Date.now(),
            message: action.message,
            user: action.user
          },
          ...state.messages
        ]
      }
    default:
      return state
  }
}

export default sessionLog
