import { IS_LOADING_DATA, IS_LOADING_BAR } from '../actions/loading'

const loading = (state = {}, action) => {
  switch (action.type) {
    case IS_LOADING_DATA:
      return {
        ...state,
        loadingData: action.loadingData
      }
    case IS_LOADING_BAR:
      return {
        ...state,
        loadingBar: action.loadingBar
      }
    default:
      return state
  }
}

export default loading
