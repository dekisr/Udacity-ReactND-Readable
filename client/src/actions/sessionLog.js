export const UPDATE_SESSION_LOG = 'UPDATE_SESSION_LOG'

export const updateSessionLog = (message, user) => ({
  type: UPDATE_SESSION_LOG,
  message,
  user
})