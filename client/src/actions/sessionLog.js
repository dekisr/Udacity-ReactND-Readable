export const UPDATE_SESSION_LOG = 'UPDATE_SESSION_LOG'
export const SET_STATUS_LOG = 'SET_STATUS_LOG'

export const setNewStatus = (status) => ({
  type: SET_STATUS_LOG,
  status
})

export const updateSessionLog = (message, user) => ({
  type: UPDATE_SESSION_LOG,
  message,
  user
})
