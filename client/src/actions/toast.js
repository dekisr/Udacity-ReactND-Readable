import uuid from 'uuid'

export const SET_TOAST = 'SET_TOAST'
export const RID_TOAST = 'RID_TOAST'

export const setToast = (id, alertType, message) => ({
  type: SET_TOAST,
  id,
  alertType,
  message
})
export const ridToast = (id) => ({
  type: RID_TOAST,
  id
})
export const handleToast = (message, alertType) => (dispatch) => {
  const id = uuid()
  dispatch(setToast(id, alertType, message))
  return setTimeout(() => dispatch(ridToast(id)), 4000)
}
