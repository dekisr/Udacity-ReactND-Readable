import { fetchAddPost, fetchVotePost } from '../utils/DataAPI'
import { isLoadingBar } from './loading'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RESET_POSTS = 'RESET_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const resetPosts = (posts) => ({
  type: RESET_POSTS,
  posts
})

const addPost = (post) => ({
  type: ADD_POST,
  post
})
export const handleAddPost = (post) => (dispatch) => {
  dispatch(isLoadingBar(true))
  return fetchAddPost(post)
    .then((newPost) => {
      dispatch(addPost(newPost))
      dispatch(isLoadingBar(false))
    })
    .catch((err) => {
      dispatch(isLoadingBar(false))
      throw new Error(err.message)
    })
}

const votePost = ({ id, voteScore }) => ({
  type: VOTE_POST,
  id,
  voteScore
})
export const handleVotePost = (info) => (dispatch) => {
  return fetchVotePost(info).then(({ id, voteScore }) =>
    dispatch(votePost({ id, voteScore }))
  )
}
