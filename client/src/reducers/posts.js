import {
  RECEIVE_POSTS,
  VOTE_POST,
  ADD_POST,
  RESET_POSTS
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
          voteScore: action.voteScore
        }
      }
    default:
      return state
  }
}

export default posts
