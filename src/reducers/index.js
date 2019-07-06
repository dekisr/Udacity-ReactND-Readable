import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'

const reducer = combineReducers({
  posts,
  categories,
  comments
})

export default reducer
