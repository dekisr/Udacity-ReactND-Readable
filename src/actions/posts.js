import { updatePostScore } from '../utils/DataAPI'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

const votePost = ({ id, voteScore }) => ({
  type: VOTE_POST,
  id,
  voteScore
})

export const handleVotePost = (info) => (dispatch) => {
  return updatePostScore(info).then(({ id, voteScore }) =>
    dispatch(votePost({ id, voteScore }))
  )
}
