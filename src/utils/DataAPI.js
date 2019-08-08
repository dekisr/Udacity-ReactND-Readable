import { logError, toObject } from './helpers'

const api = 'http://localhost:3001'

// let token = Math.random()
//   .toString(36)
//   .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: 'Squirtle'
}
const initGET = {
  method: 'GET',
  headers
}
const initPUT = {
  method: 'PUT',
  mode: 'cors',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}
const initPOST = {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}

export const getInitialData = () => {
  return Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllComments()
  ]).then(([posts, categories, comments]) => ({
    posts,
    categories,
    comments
  }))
}

// POSTS
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const getAllPosts = () => {
  return fetch(`${api}/posts`, initGET)
    .then((resp) => resp.json())
    .then((posts) => {
      const formatted = toObject(posts, 'id')
      return formatted
    })
    .catch(logError())
}
export const addNewPost = (post) => {
  return fetch(`${api}/posts`, {
    ...initPOST,
    body: JSON.stringify(post)
  })
    .then((resp) => resp.json())
    .then((post) => post)
    .catch(logError())
}
export const updatePostScore = ({ id, option }) => {
  return fetch(`${api}/posts/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option })
  })
    .then((resp) => resp.json())
    .then((post) => ({ id: post.id, voteScore: post.voteScore }))
    .catch(logError())
}

// CATEGORIES
export const getAllCategories = () => {
  return fetch(`${api}/categories`, initGET)
    .then((resp) => resp.json())
    .then((categories) => {
      const formatted = toObject(categories['categories'], 'name')
      return formatted
    })
    .catch(logError())
}

// COMMENTS
export const getAllComments = async () => {
  let allComments
  const postIds = await getAllPosts().then((posts) => Object.keys(posts))
  const comments = postIds.map((id) => getCommentsByPost(id))
  return Promise.all(comments)
    .then((resp) => {
      resp.map((comment) => {
        return (allComments = { ...allComments, ...comment })
      })
      return allComments
    })
    .catch(logError())
}
export const getCommentsByPost = (id) => {
  return fetch(`${api}/posts/${id}/comments`, initGET)
    .then((resp) => resp.json())
    .then((comments) => {
      const formatted = toObject(comments, 'id')
      return formatted
    })
    .catch(logError())
}
export const addNewComment = (comment) => {
  return fetch(`${api}/comments`, {
    ...initPOST,
    body: JSON.stringify(comment)
  })
    .then((resp) => resp.json())
    .then((comment) => comment)
    .catch(logError())
}
export const updateCommentScore = ({ id, option }) => {
  return fetch(`${api}/comments/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option })
  })
    .then((resp) => resp.json())
    .then((comment) => ({ id: comment.id, voteScore: comment.voteScore }))
    .catch(logError())
}
