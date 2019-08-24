export const IS_LOADING_DATA = 'IS_LOADING'
export const IS_LOADING_BAR = 'IS_LOADING_BAR'

export const isLoadingData = (loadingData) => ({
  type: IS_LOADING_DATA,
  loadingData
})

export const isLoadingBar = (loadingBar) => ({
  type: IS_LOADING_BAR,
  loadingBar
})
