import { combineReducers } from 'redux'
import currentUser from './currentUser'
import posts from './posts'
import categories from './categories'
import comments from './comments'

const reducer = combineReducers({
  currentUser,
  posts,
  categories,
  comments
})

export default reducer
