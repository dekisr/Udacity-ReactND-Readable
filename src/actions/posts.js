import { fetchAddPost, fetchVotePost } from '../utils/DataAPI'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
// export const UPDATE_POST_COMMENTCOUNT = 'UPDATE_POST_COMMENTCOUNT'

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

const addPost = (post) => ({
  type: ADD_POST,
  post
})
export const handleAddPost = (post) => (dispatch) => {
  return fetchAddPost(post).then((newPost) => dispatch(addPost(newPost)))
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

// export const updateCommentCount = (id) => ({
//   type: UPDATE_POST_COMMENTCOUNT,
//   id
// })
