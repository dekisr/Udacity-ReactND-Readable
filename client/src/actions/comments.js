import {
  fetchAddComment,
  fetchVoteComment,
  fetchEditComment,
  fetchDeleteComment
} from '../utils/DataAPI'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

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

export const editComment = (commentData) => ({
  type: EDIT_COMMENT,
  commentData
})
export const handleEditComment = (commentData) => (dispatch) => {
  return fetchEditComment(commentData).then((updatedCommentData) =>
    dispatch(editComment(updatedCommentData))
  )
}

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
})
export const handleDeleteComment = (id) => (dispatch) => {
  return fetchDeleteComment(id).then((commentId) =>
    dispatch(deleteComment(commentId))
  )
}
