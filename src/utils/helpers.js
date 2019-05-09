export const logError = () => {
  return (err) => {
    console.group('WHAT?')
    const { msg, style } = errorMessage(err)
    console.log(msg, style)
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
