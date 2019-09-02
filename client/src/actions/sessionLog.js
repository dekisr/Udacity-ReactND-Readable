export const UPDATE_SESSION_LOG = 'UPDATE_SESSION_LOG'

export const updateSessionLog = (timestamp, message, user) => ({
  type: UPDATE_SESSION_LOG,
  timestamp,
  message,
  user
})
