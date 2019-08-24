import {
  fetchAddComment,
  fetchVoteComment,
  fetchEditComment,
  fetchDeleteComment
} from '../utils/DataAPI'
import { isLoadingBar } from './loading'

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
  dispatch(isLoadingBar(true))
  return fetchAddComment(comment)
    .then((newComment) => {
      dispatch(addComment(newComment))
      dispatch(isLoadingBar(false))
    })
    .catch((err) => {
      dispatch(isLoadingBar(false))
      throw new Error(err.message)
    })
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
  dispatch(isLoadingBar(true))
  return fetchEditComment(commentData)
    .then((updatedCommentData) => {
      dispatch(editComment(updatedCommentData))
      dispatch(isLoadingBar(false))
    })
    .catch((err) => {
      dispatch(isLoadingBar(false))
      throw new Error(err.message)
    })
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
