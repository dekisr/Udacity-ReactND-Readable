import { logError, toObject } from './helpers'

const api = 'http://localhost:3001'

// let token = Math.random()
//   .toString(36)
//   .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: 'Charizard'
}
const initGET = {
  method: 'GET',
  mode: 'cors',
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
  mode: 'cors',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}
const initDELETE = {
  method: 'DELETE',
  mode: 'cors',
  headers
}

export const getInitialData = () => {
  return Promise.all([
    fetchAllPosts(),
    fetchAllCategories(),
    fetchAllComments()
  ]).then(([posts, categories, comments]) => ({
    posts,
    categories,
    comments
  }))
}

// POSTS
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const fetchAllPosts = () => {
  return fetch(`${api}/posts`, initGET)
    .then((resp) => resp.json())
    .then((posts) => {
      const formatted = toObject(posts, 'id')
      return formatted
    })
    .catch(logError())
}
export const fetchAddPost = (post) => {
  return fetch(`${api}/posts`, {
    ...initPOST,
    body: JSON.stringify(post)
  })
    .then((resp) => resp.json())
    .then((post) => post)
    .catch(logError())
}
export const fetchVotePost = ({ id, option }) => {
  return fetch(`${api}/posts/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option })
  })
    .then((resp) => resp.json())
    .then((post) => ({ id: post.id, voteScore: post.voteScore }))
    .catch(logError())
}

// CATEGORIES
export const fetchAllCategories = () => {
  return fetch(`${api}/categories`, initGET)
    .then((resp) => resp.json())
    .then((categories) => {
      const formatted = toObject(categories['categories'], 'name')
      return formatted
    })
    .catch(logError())
}

// COMMENTS
export const fetchAllComments = async () => {
  let allComments
  const postIds = await fetchAllPosts().then((posts) => Object.keys(posts))
  const comments = postIds.map((id) => fetchCommentsByPost(id))
  return Promise.all(comments)
    .then((resp) => {
      resp.map((comment) => {
        return (allComments = { ...allComments, ...comment })
      })
      return allComments
    })
    .catch(logError())
}
export const fetchCommentsByPost = (id) => {
  return fetch(`${api}/posts/${id}/comments`, initGET)
    .then((resp) => resp.json())
    .then((comments) => {
      const formatted = toObject(comments, 'id')
      return formatted
    })
    .catch(logError())
}
export const fetchAddComment = (comment) => {
  return fetch(`${api}/comments`, {
    ...initPOST,
    body: JSON.stringify(comment)
  })
    .then((resp) => resp.json())
    .then((comment) => comment)
    .catch(logError())
}
export const fetchVoteComment = ({ id, option }) => {
  return fetch(`${api}/comments/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option })
  })
    .then((resp) => resp.json())
    .then((comment) => ({ id: comment.id, voteScore: comment.voteScore }))
    .catch(logError())
}
export const fetchEditComment = ({ id, timestamp, body, lastEdit }) => {
  return fetch(`${api}/comments/${id}`, {
    ...initPUT,
    body: JSON.stringify({ timestamp, body, lastEdit })
  })
    .then((resp) => resp.json())
    .then((comment) => ({
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      lastEdit: comment.lastEdit
    }))
    .catch(logError())
}
export const fetchDeleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, initDELETE)
    .then((resp) => resp.json())
    .then((comment) => comment)
    .catch(logError())
}
