import { RECEIVE_POSTS, VOTE_POST, ADD_POST } from '../actions/posts'

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
      }
    case VOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
      case ADD_POST:
        return {
          ...state,
          [action.post.id]: action.post
        }
    default:
      return state
  }
}

export default posts
