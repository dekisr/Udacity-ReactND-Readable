import { addNewComment, updateCommentScore } from '../utils/DataAPI'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})
export const handleAddComment = (comment) => (dispatch) => {
  return addNewComment(comment).then((newComment) =>
    dispatch(addComment(newComment))
  )
}

export const voteComment = ({ id, voteScore }) => ({
  type: VOTE_COMMENT,
  id,
  voteScore
})
export const handleVoteComment = (info) => (dispatch) => {
  return updateCommentScore(info).then(({ id, voteScore }) =>
    dispatch(voteComment({ id, voteScore }))
  )
}
