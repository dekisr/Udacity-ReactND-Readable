export const SET_TOAST = 'SET_TOAST'
export const RID_TOAST = 'RID_TOAST'

export const setToast = (message, alertType) => ({
  type: SET_TOAST,
  message,
  alertType
})
export const ridToast = () => ({
  type: RID_TOAST
})
export const handleToast = (message, alertType) => (dispatch) => {
  dispatch(setToast(message, alertType))
  return setTimeout(() => dispatch(ridToast()), 3000)
}
