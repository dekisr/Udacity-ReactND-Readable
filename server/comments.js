const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "81693920-a5f8-11e9-ad49-fde98c3302fd": {
    id: '81693920-a5f8-11e9-ad49-fde98c3302fd',
    parentId: "3e9bef70-a5f8-11e9-80d3-216ed62915e5",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 100,
    deleted: false,
    parentDeleted: false
  },
  "8b5ab1c0-a5f8-11e9-a3aa-15673fce599a": {
    id: '8b5ab1c0-a5f8-11e9-a3aa-15673fce599a',
    parentId: "3e9bef70-a5f8-11e9-80d3-216ed62915e5",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -100,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}