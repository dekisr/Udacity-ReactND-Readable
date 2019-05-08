import { errorMessage } from './helpers'

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

export const getTest = () => {
  return fetch(`${api}/posts`, initGET)
    .then((resp) => resp.json())
    .then((posts) => posts)
    .catch((err) => {
      console.group('WHAT?')
      const { msg, style } = errorMessage(err)
      console.log(msg, style)
      console.groupEnd()
    })
}
