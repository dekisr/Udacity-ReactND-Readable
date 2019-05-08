export function errorMessage(msg) {
  return {
    msg: `%c Error -> ${msg}`,
    style: 'color: indianred; font-weight: bold; font-style: italic;'
  }
}
