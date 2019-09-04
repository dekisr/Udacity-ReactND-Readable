import {
  fetchAddComment,
  fetchVoteComment,
  fetchReloadComment,
  fetchEditComment,
  fetchDeleteComment
} from '../utils/DataAPI'
import { isLoadingBar } from './loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RESET_COMMENTS = 'RESET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const RELOAD_COMMENT = 'RELOAD_COMMENT'

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const resetComments = (comments) => ({
  type: RESET_COMMENTS,
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

export const voteComment = ({ id, voteScore, currentUser, error }) => ({
  type: VOTE_COMMENT,
  id,
  voteScore,
  currentUser,
  error
})
export const handleVoteComment = (info) => (dispatch) => {
  // Optimistic Updates
  let voteScore = info.voteScore
  info.option === 'upVote' && voteScore++
  info.option === 'downVote' && voteScore--
  let newInfo = {
    ...info,
    voteScore,
    error: false
  }
  dispatch(voteComment(newInfo))
  return fetchVoteComment(info).catch((err) => {
    newInfo = {
      ...info,
      error: true
    }
    dispatch(voteComment(newInfo))
    throw new Error(err.message)
  })
}

export const reloadComment = (comment) => ({
  type: RELOAD_COMMENT,
  comment
})
export const handleReloadComment = (id) => (dispatch) => {
  return fetchReloadComment(id)
    .then((comment) => {
      dispatch(reloadComment(comment))
    })
    .catch((err) => {
      throw new Error(err.message)
    })
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
  dispatch(isLoadingBar(true))
  return fetchDeleteComment(id)
    .then((commentId) => {
      dispatch(deleteComment(commentId))
      dispatch(isLoadingBar(false))
    })
    .catch((err) => {
      dispatch(isLoadingBar(false))
      throw new Error(err.message)
    })
}
