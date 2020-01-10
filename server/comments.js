const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  '8a7abc0b-9202-4d4b-b1d4-65e43b6ee71d': {
    id: '8a7abc0b-9202-4d4b-b1d4-65e43b6ee71d',
    parentId: 'fe097b8f-fda8-41b2-b31e-6642a2e24d05',
    timestamp: 1578177396000,
    body: 'But I am the **TRUE** __RED__!',
    author: 'red',
    voteScore: 52,
    votedBy: [
      'aliceblue',
      'antiquewhite',
      'aqua',
      'aquamarine',
      'azure',
      'beige',
      'bisque',
      'black',
      'blanchedalmond',
      'blue',
      'blueviolet',
      'brown',
      'burlywood',
      'cadetblue',
      'chartreuse',
      'chocolate',
      'coral',
      'cornflowerblue',
      'cornsilk',
      'cyan',
      'darkblue',
      'darkcyan',
      'darkgoldenrod',
      'darkgray',
      'darkgrey',
      'darkgreen',
      'darkkhaki',
      'darkmagenta',
      'darkolivegreen',
      'darkorange',
      'darkorchid',
      'darkred',
      'darksalmon',
      'darkseagreen',
      'darkslateblue',
      'darkslategray',
      'darkslategrey',
      'darkturquoise',
      'darkviolet',
      'deeppink',
      'deepskyblue',
      'dimgray',
      'dimgrey',
      'dodgerblue',
      'firebrick',
      'floralwhite',
      'forestgreen',
      'fuchsia',
      'gainsboro',
      'ghostwhite',
      'gold',
      'goldenrod'
    ],
    deleted: false,
    parentDeleted: false,
    lastEdit: null
  },
  'b30655e6-18be-41bd-816d-86121a75750a': {
    id: 'b30655e6-18be-41bd-816d-86121a75750a',
    parentId: 'fe097b8f-fda8-41b2-b31e-6642a2e24d05',
    timestamp: 1578288996000,
    body: '**Comments**. __Are__. ~~Cool~~.',
    author: 'powderblue',
    voteScore: -4,
    votedBy: ['deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue'],
    deleted: false,
    parentDeleted: false,
    lastEdit: null
  },
  'de44a90b-ee2b-4c85-a6e2-77190e33cdb9': {
    id: 'de44a90b-ee2b-4c85-a6e2-77190e33cdb9',
    parentId: '60142e8e-7953-410e-ad4e-1f778e5f9654',
    timestamp: 1578018996000,
    body: `That's it. **Enjoy**`,
    author: 'tomato',
    voteScore: 0,
    votedBy: [],
    deleted: false,
    parentDeleted: false,
    lastEdit: null
  },
  'e328b868-996d-41df-855d-a0f71a246761': {
    id: 'e328b868-996d-41df-855d-a0f71a246761',
    parentId: '60142e8e-7953-410e-ad4e-1f778e5f9654',
    timestamp: 1577900196000,
    body: 'I love that quotes!.',
    author: 'powderblue',
    voteScore: 2,
    votedBy: ['deepskyblue', 'dimgray'],
    deleted: false,
    parentDeleted: false,
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

function get(token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(comments[id].deleted || comments[id].parentDeleted ? {} : comments[id])
  })
}

// Add a function to get all comments
function getAll(token) {
  return new Promise((res) => {
    const comments = getData(token)
    let keys = Object.keys(comments)
    let filtered_keys = keys.filter((key) => !comments[key].deleted)
    res(filtered_keys.map((key) => comments[key]))
  })
}

function getByParent(token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(
      (key) => comments[key].parentId === parentId && !comments[key].deleted
    )
    res(filtered_keys.map((key) => comments[key]))
  })
}

function add(token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 0,
      votedBy: [],
      deleted: false,
      parentDeleted: false,
      lastEdit: null
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote(token, id, user, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    if (comment.votedBy.includes(user)) {
      console.log(`The user ${user} already voted in this comment.`)
      return
    } else {
      comment.votedBy = [...comment.votedBy, user]
      switch (option) {
        case 'upVote':
          comment.voteScore = comment.voteScore + 1
          break
        case 'downVote':
          comment.voteScore = comment.voteScore - 1
          break
        default:
          console.log(`comments.vote received incorrect parameter: ${option}`)
      }
    }
    res(comment)
  })
}

function disableByParent(token, post) {
  return new Promise((res) => {
    let comments = getData(token)
    keys = Object.keys(comments)
    filtered_keys = keys.filter((key) => comments[key].parentId === post.id)
    filtered_keys.forEach((key) => (comments[key].parentDeleted = true))
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let comments = getData(token)
    comments[id].deleted = true
    posts.incrementCommentCounter(token, comments[id].parentId, -1)
    res(comments[id])
  })
}

function edit(token, id, comment) {
  return new Promise((res) => {
    let comments = getData(token)
    for (prop in comment) {
      comments[id][prop] = comment[prop]
    }
    res(comments[id])
  })
}

module.exports = {
  reset,
  get,
  getAll,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
