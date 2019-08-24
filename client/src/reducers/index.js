import { combineReducers } from 'redux'
import loading from './loading'
import toast from './toast'
import currentUser from './currentUser'
import posts from './posts'
import categories from './categories'
import comments from './comments'

const reducer = combineReducers({
  loading,
  toast,
  currentUser,
  posts,
  categories,
  comments
})

export default reducer
