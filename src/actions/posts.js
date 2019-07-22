import { updatePostScore, addNewPost } from '../utils/DataAPI'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

const votePost = ({ id, voteScore }) => ({
  type: VOTE_POST,
  id,
  voteScore
})

const addPost = (post) => ({
  type: ADD_POST,
  post
})

export const handleVotePost = (info) => (dispatch) => {
  return updatePostScore(info).then(({ id, voteScore }) =>
    dispatch(votePost({ id, voteScore }))
  )
}

export const handleNewPost = (post) => (dispatch) => {
  return addNewPost(post).then((newPost) => dispatch(addPost(newPost)))
}
