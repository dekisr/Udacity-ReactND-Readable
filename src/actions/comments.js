import {
  fetchAddComment,
  fetchVoteComment,
  fetchEditComment
} from '../utils/DataAPI'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})
export const handleAddComment = (comment) => (dispatch) => {
  return fetchAddComment(comment).then((newComment) =>
    dispatch(addComment(newComment))
  )
}

export const voteComment = ({ id, voteScore }) => ({
  type: VOTE_COMMENT,
  id,
  voteScore
})
export const handleVoteComment = (info) => (dispatch) => {
  return fetchVoteComment(info).then((resp) => dispatch(voteComment(resp)))
}

export const editComment = ({ id, timestamp, body, lastEdit }) => ({
  type: EDIT_COMMENT,
  id,
  timestamp,
  body,
  lastEdit
})
export const handleEditComment = (info) => (dispatch) => {
  return fetchEditComment(info).then((resp) => dispatch(editComment(resp)))
}
