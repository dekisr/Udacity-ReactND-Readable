import { logError, toObject } from './helpers'

const api = 'http://localhost:3001'

let token = Math.random()
  .toString(36)
  .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
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
  mode: 'cors',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  }
}

export const getTest = () => {
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

export const getAllPosts = () => {
  return fetch(`${api}/posts`, initGET)
    .then((resp) => resp.json())
    .then((posts) => {
      const formatted = toObject(posts, 'id')
      return formatted
    })
    .catch(logError())
}

export const getAllCategories = () => {
  return fetch(`${api}/categories`, initGET)
    .then((resp) => resp.json())
    .then((categories) => {
      const formatted = toObject(categories['categories'], 'name')
      return formatted
    })
    .catch(logError())
}

export const getAllComments = async () => {
  let allComments
  const postIds = await getAllPosts().then((posts) => Object.keys(posts))
  const comments = postIds.map((id) => {
    const commentsByPost = getCommentsByPost(id).then((resp) => {
      return resp
    })
    return commentsByPost
  })
  return Promise.all(comments).then((resp) => {
    resp.map((item) => {
      return (allComments = { ...allComments, ...item })
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
