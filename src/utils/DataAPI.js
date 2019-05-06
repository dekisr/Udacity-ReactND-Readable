const api = 'http://localhost:3001'
let token = Math.random()
  .toString(36)
  .substr(-8)
const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const getTest = () => {
  fetch(`${api}/posts`, { headers })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
}
