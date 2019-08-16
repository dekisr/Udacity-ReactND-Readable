import users from './users'

export const logError = () => {
  return (err) => {
    console.group('WHAT?')
    const { msg, style } = errorMessage(err)
    console.error(msg, style)
    console.groupEnd()
  }
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
  return string.trim().replace(/\s+/g, ' ')
}

// USERS
export const getRandomUser = () => {
  const userName = users[Math.floor(Math.random() * users.length)]
  localStorage.setItem('userName', userName)
  return userName
}
