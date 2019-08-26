import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  RELOAD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RESET_COMMENTS
} from '../actions/comments'

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments
      }
    case RESET_COMMENTS:
      return {
        ...action.comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case VOTE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    case RELOAD_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.commentData.id]: {
          ...state[action.commentData.id],
          body: action.commentData.body,
          lastEdit: action.commentData.lastEdit
        }
      }
    case DELETE_COMMENT:
      const newState = { ...state }
      delete newState[action.id]
      return newState
    default:
      return state
  }
}

export default comments
