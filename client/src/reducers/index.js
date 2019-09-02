import { combineReducers } from 'redux'
import loading from './loading'
import toast from './toast'
import currentUser from './currentUser'
import sessionLog from './sessionLog'
import posts from './posts'
import categories from './categories'
import comments from './comments'

const reducer = combineReducers({
  loading,
  toast,
  currentUser,
  sessionLog,
  posts,
  categories,
  comments
})

export default reducer
