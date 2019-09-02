import { UPDATE_SESSION_LOG } from '../actions/sessionLog'

const sessionLog = (state = { messages: [] }, action) => {
  switch (action.type) {
    case UPDATE_SESSION_LOG:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            timestamp: Date.now(),
            message: action.message,
            user: action.user
          }
        ]
      }
    default:
      return state
  }
}

export default sessionLog
