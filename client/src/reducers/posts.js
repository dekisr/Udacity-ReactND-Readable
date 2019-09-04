import {
  RECEIVE_POSTS,
  VOTE_POST,
  ADD_POST,
  RESET_POSTS,
  RELOAD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/posts'

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      }
    case RESET_POSTS:
      return {
        ...action.posts
      }
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case VOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore,
          votedBy: action.error
            ? state[action.id].votedBy.filter(
                (user) => user !== action.currentUser
              )
            : [...state[action.id].votedBy, action.currentUser]
        }
      }
    case RELOAD_POST:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      }
    case EDIT_POST:
      return {
        ...state,
        [action.postData.id]: {
          ...state[action.postData.id],
          category: action.postData.category,
          title: action.postData.title,
          body: action.postData.body,
          lastEdit: action.postData.lastEdit
        }
      }
    case DELETE_POST:
      const newState = { ...state }
      delete newState[action.id]
      return newState
    default:
      return state
  }
}

export default posts
