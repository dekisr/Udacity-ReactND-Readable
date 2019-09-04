import { logError, toObject } from './helpers'

const api = 'http://localhost:3001'

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

const serverResponse = (resp) => {
  // !resp.ok ? new Error('500 error') : resp.json()
  if (!resp.ok) {
    throw new Error('500 error')
  } else {
    return resp.json()
  }
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

export const resetInitialData = () => {
  return Promise.all([fetchResetPosts(), fetchResetComments()]).then(
    ([posts, comments]) => ({
      posts,
      comments
    })
  )
}

// POSTS
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const fetchResetPosts = () => {
  return fetch(`${api}/posts/reset`, initGET)
    .then((resp) => resp.json())
    .then((posts) => posts)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while reseting Posts')
    })
}
export const fetchAllPosts = () => {
  return fetch(`${api}/posts`, initGET)
    .then((resp) => resp.json())
    .then((posts) => {
      const formatted = toObject(posts, 'id')
      return formatted
    })
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while fetching Posts')
    })
}
export const fetchAddPost = (post) => {
  return fetch(`${api}/posts`, {
    ...initPOST,
    body: JSON.stringify(post)
  })
    .then((resp) => resp.json())
    .then((post) => post)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while adding Post')
    })
}
export const fetchVotePost = ({ id, currentUser, option }) => {
  return fetch(`${api}/posts/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option, user: currentUser })
  })
    .then((resp) => resp.json())
    .then((post) => ({
      id: post.id,
      voteScore: post.voteScore,
      votedBy: post.votedBy
    }))
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while updating Post Vote Score')
    })
}
export const fetchReloadPost = (id) => {
  return fetch(`${api}/posts/${id}`, initGET)
    .then((resp) => resp.json())
    .then((post) => post)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while reloading Post')
    })
}
export const fetchEditPost = ({ id, category, title, body, lastEdit }) => {
  return fetch(`${api}/posts/${id}`, {
    ...initPUT,
    body: JSON.stringify({ category, title, body, lastEdit })
  })
    .then((resp) => resp.json())
    .then((post) => ({
      id: post.id,
      category: post.category,
      title: post.title,
      body: post.body,
      lastEdit: post.lastEdit
    }))
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while updating Post')
    })
}
export const fetchDeletePost = (id) => {
  return fetch(`${api}/posts/${id}`, initDELETE)
    .then(serverResponse)
    .then((post) => post.id)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while deleting Post')
    })
}

// CATEGORIES
export const fetchAllCategories = () => {
  return fetch(`${api}/categories`, initGET)
    .then((resp) => resp.json())
    .then((categories) => {
      const formatted = toObject(categories['categories'], 'name')
      return formatted
    })
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while fetching Categories')
    })
}

// COMMENTS
export const fetchResetComments = () => {
  return fetch(`${api}/comments/reset`, initGET)
    .then((resp) => resp.json())
    .then((comments) => comments)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while reseting Comments')
    })
}
export const fetchAllComments = () => {
  return fetch(`${api}/comments`, initGET)
    .then((resp) => resp.json())
    .then((comments) => {
      const formatted = toObject(comments, 'id')
      return formatted
    })
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while fetching Comments')
    })
}
// export const fetchAllComments = async () => {
//   let allComments
//   const postIds = await fetchAllPosts().then((posts) => Object.keys(posts))
//   const comments = postIds.map((id) => fetchCommentsByPost(id))
//   return Promise.all(comments)
//     .then((resp) => {
//       resp.map((comment) => {
//         return (allComments = { ...allComments, ...comment })
//       })
//       return allComments
//     })
//     .catch((err) => {
//       logError(err)
//       throw new Error('There was an error while fetching Comments')
//     })
// }
export const fetchCommentsByPost = (id) => {
  return fetch(`${api}/posts/${id}/comments`, initGET)
    .then((resp) => resp.json())
    .then((comments) => {
      const formatted = toObject(comments, 'id')
      return formatted
    })
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while fetching Post Comments')
    })
}
export const fetchAddComment = (comment) => {
  return fetch(`${api}/comments`, {
    ...initPOST,
    body: JSON.stringify(comment)
  })
    .then((resp) => resp.json())
    .then((comment) => comment)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while adding Comment')
    })
}
export const fetchVoteComment = ({ id, currentUser, option }) => {
  return fetch(`${api}/comments/${id}`, {
    ...initPOST,
    body: JSON.stringify({ option, user: currentUser })
  })
    .then(serverResponse)
    .then((comment) => ({
      id: comment.id,
      voteScore: comment.voteScore,
      votedBy: comment.votedBy
    }))
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while updating Comment Vote Score')
    })
}
export const fetchReloadComment = (id) => {
  return fetch(`${api}/comments/${id}`, initGET)
    .then((resp) => resp.json())
    .then((comment) => comment)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while reloading Comment')
    })
}
export const fetchEditComment = ({ id, body, lastEdit }) => {
  return fetch(`${api}/comments/${id}`, {
    ...initPUT,
    body: JSON.stringify({ body, lastEdit })
  })
    .then((resp) => resp.json())
    .then((comment) => ({
      id: comment.id,
      body: comment.body,
      lastEdit: comment.lastEdit
    }))
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while updating Comment')
    })
}
export const fetchDeleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, initDELETE)
    .then((resp) => resp.json())
    .then((comment) => comment.id)
    .catch((err) => {
      logError(err)
      throw new Error('There was an error while deleting Comment')
    })
}
