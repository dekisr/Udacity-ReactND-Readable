import io from 'socket.io-client'
import users from './users'

export const logError = (err) => {
  console.group('WHAT?')
  const { msg, style } = errorMessage(err)
  console.error(msg, style)
  console.groupEnd()
}
const errorMessage = (msg) => {
  return {
    msg: `%c Error -> ${msg}`,
    style: 'color: indianred; font-weight: bold; font-style: italic;'
  }
}

export const toObject = (array, key) => {
  const obj = array.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})
  return obj
}

export const sortCategories = (object) => {
  return Object.keys(object).sort((a, b) => {
    const nameA = object[a].name.toUpperCase()
    const nameB = object[b].name.toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })
}

export const sortPostsComments = (array, object, param) => {
  return array.sort(
    (a, b) =>
      object[b][param] - object[a][param] ||
      object[b].timestamp - object[a].timestamp
  )
}

export const formatToDate = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    // era: 'long',
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: '2-digit'
  }).format(timestamp)
}

export const formatToTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    // era: 'long',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    // timeZoneName: 'short'
  }).format(timestamp)
}

export const trimReplace = (string) => {
  return (
    string
      // Replace all consecutive white spaces that are not a line break
      .replace(/[^\S\r\n]+/g, ' ')
      // Trim white spaces in each line
      .replace(/^[^\S\r\n]+|[^\S\r\n]+$/gm, '')
      // Replace multiple line break
      .replace(/\n{3,}/g, '\n\n')
      // Prevent start/end line break
      .trim()
  )
}

export const removeSpaces = (string) => {
  return string.replace(/\s+/g, '')
}

export const safeHTML = (string) => {
  // https://developer.mozilla.org/en-US/docs/Glossary/Entity
  // https://dev.w3.org/html5/html-author/charref
  return string
    .replace(/\$/g, '&#36;')
    .replace(/&/g, '&#38;')
    .replace(/</g, '&#60;')
    .replace(/>/g, '&#62;')
    .replace(/"/g, '&#34;')
    .replace(/'/g, '&#39;')
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
}

export const emphasisHTML = (string) => {
  return string
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/__(.+?)__/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<s>$1</s>')
}

// USERS
export const getRandomUser = () => {
  const userName = users[Math.floor(Math.random() * users.length)]
  try {
    localStorage.setItem('userName', userName)
  } catch (error) {
    console.group('Error')
    const { msg, style } = errorMessage(error)
    console.error(msg, style)
    console.warn(
      `Check your browser settings. It's not allowing to access the localStorage.`
    )
    console.groupEnd()
  }
  return userName
}
export const getUser = () => {
  let userName
  try {
    userName = localStorage.getItem('userName')
  } catch (error) {
    userName = null
  }
  return userName
}

// WEBSOCKETS
const server =
  process.env.NODE_ENV === 'production'
    ? 'https://dekisr-readable.onrender.com'
    : 'http://localhost:3001'
const socket = io(server)

export const socketEmit = (message, info) => {
  return socket.emit(message, info)
}
export const socketOn = (message, func) => {
  return socket.on(message, func)
}
