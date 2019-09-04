const clone = require('clone')

let db = {}

const defaultData = {
  '3e9bef70-a5f8-11e9-80d3-216ed62915e5': {
    id: '3e9bef70-a5f8-11e9-80d3-216ed62915e5',
    timestamp: 1467166872634,
    title: 'Hello there',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit, enim vel luctus semper, ipsum ipsum condimentum nisi, et pretium lorem arcu eu justo. Sed mattis nibh et lacinia finibus. Etiam imperdiet libero ultricies neque dapibus, vel lacinia enim pharetra. Sed mattis massa nisl, ullamcorper blandit tortor feugiat id. Suspendisse hendrerit, est sit amet cursus scelerisque, lectus dolor finibus tellus, ut euismod ligula arcu sit amet risus. Praesent malesuada, mi sed tincidunt tincidunt.',
    author: 'lightseagreen',
    category: 'red',
    voteScore: 6,
    votedBy: ['blue', 'red'],
    deleted: false,
    commentCount: 2,
    lastEdit: null
  },
  '73405860-a5f8-11e9-896c-67c1c09b9d3e': {
    id: '73405860-a5f8-11e9-896c-67c1c09b9d3e',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit, enim vel luctus semper, ipsum ipsum condimentum nisi, et pretium lorem arcu eu justo. Sed mattis nibh et lacinia finibus. Etiam imperdiet libero ultricies neque dapibus, vel lacinia enim pharetra. Sed mattis massa nisl, ullamcorper blandit tortor feugiat id. Suspendisse hendrerit, est sit amet cursus scelerisque, lectus dolor finibus tellus, ut euismod ligula arcu sit amet risus. Praesent malesuada, mi sed tincidunt tincidunt.',
    author: 'palegoldenrod',
    category: 'blue',
    voteScore: -5,
    votedBy: ['blue', 'red'],
    deleted: false,
    commentCount: 0,
    lastEdit: null
  }
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

// Add a function to reset data
function reset(token) {
  return new Promise((res) => {
    let data = (db[token] = clone(defaultData))
    res(data)
  })
}

function getByCategory(token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(
      (key) => posts[key].category === category && !posts[key].deleted
    )
    res(filtered_keys.map((key) => posts[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(posts[id].deleted ? {} : posts[id])
  })
}

function getAll(token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter((key) => !posts[key].deleted)
    res(filtered_keys.map((key) => posts[key]))
  })
}

function add(token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 0,
      votedBy: [],
      deleted: false,
      commentCount: 0,
      lastEdit: null
    }

    res(posts[post.id])
  })
}

function vote(token, id, user, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    if (post.votedBy.includes(user)) {
      console.log(`The user ${user} already voted in this post.`)
      return
    } else {
      post.votedBy = [...post.votedBy, user]
      switch (option) {
        case 'upVote':
          post.voteScore = post.voteScore + 1
          break
        case 'downVote':
          post.voteScore = post.voteScore - 1
          break
        default:
          console.log(`posts.vote received incorrect parameter: ${option}`)
      }
    }
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let posts = getData(token)
    posts[id].deleted = true
    res(posts[id])
  })
}

function edit(token, id, post) {
  return new Promise((res) => {
    let posts = getData(token)
    for (prop in post) {
      posts[id][prop] = post[prop]
    }
    res(posts[id])
  })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  reset,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
