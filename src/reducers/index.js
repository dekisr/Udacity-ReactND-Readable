import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'

const reducer = combineReducers({
  posts,
  categories
})

export default reducer
