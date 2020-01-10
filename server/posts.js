const clone = require('clone')

let db = {}

const defaultData = {
  'a28f654a-7f8e-427e-8430-9838ab4dd9d5': {
    id: 'a28f654a-7f8e-427e-8430-9838ab4dd9d5',
    timestamp: 1578201156000,
    title: 'The CSS <color>',
    body: `The **<color>** CSS data type represents a color in the **sRGB** color space. A **<color>** may also include an alpha-channel transparency value, indicating how the color should composite with its background.\n\nA **<color>** can be defined in any of the following ways:\n**·** Using a **keyword** (such as blue or transparent)\n**·** Using the **RGB** cubic-coordinate system (via the #-hexadecimal or the __rgb()__ and __rgba()__ functional notations)\n**·** Using the **HSL** cylindrical-coordinate system (via the __hsl()__ and __hsla()__ functional notations)\n\nRead more at: __https://developer.mozilla.org/en-US/docs/Web/CSS/color_value__`,
    author: 'floralwhite',
    category: 'yellow',
    voteScore: 0,
    votedBy: [],
    deleted: false,
    commentCount: 0,
    lastEdit: null
  },
  'fe097b8f-fda8-41b2-b31e-6642a2e24d05': {
    id: 'fe097b8f-fda8-41b2-b31e-6642a2e24d05',
    timestamp: 1578053953000,
    title: 'Red <!>',
    body: `**Red** is the color at the end of the visible spectrum of light, next to orange and opposite violet. It has a dominant wavelength of approximately __625–740__ nanometres. It is a **primary** color in the RGB color model and the CMYK color model, and is the complementary color of cyan.\n\nSince red is the color of **blood**, it has historically been associated with **sacrifice**, **danger** and **courage**. Modern surveys in Europe and the United States show red is also the color most commonly associated with heat, activity, passion, sexuality, ~~anger~~, love and joy. In China, India and many other Asian countries it is the color of symbolizing **happiness** and **good fortune**.\n\n__from **Wikipedia**__`,
    author: 'crimson',
    category: 'red',
    voteScore: -5,
    votedBy: ['blue', 'red', 'yellow', 'black', 'grey', 'white'],
    deleted: false,
    commentCount: 2,
    lastEdit: { timestamp: 1578629537676, author: 'red' }
  },
  '60142e8e-7953-410e-ad4e-1f778e5f9654': {
    id: '60142e8e-7953-410e-ad4e-1f778e5f9654',
    timestamp: 1577847600000,
    title: 'About Life',
    body: `**Maggie Fitzgerald**: __She's tough, I can't go inside, I can't get close enough to hit her__.\n**Frankie Dunn**: __You know why that is__?\n**Maggie Fitzgerald**: __Why__?\n**Frankie Dunn**: __Cause she's a **better** fighter than you are, that's why. She's **younger**, she's **stronger**, and she's **more experienced**__.\n**Frankie Dunn**: __**Now, what are you gonna do about it**__?\n**Maggie Fitzgerald**: __[Next round starts. Maggie knocks her out in few seconds]__\n\n__Million Dollar Baby - 2004__`,
    author: 'deepskyblue',
    category: 'blue',
    voteScore: 11,
    votedBy: [
      'blueviolet',
      'brown',
      'burlywood',
      'cadetblue',
      'chartreuse',
      'chocolate',
      'coral',
      'cornflowerblue',
      'cornsilk',
      'crimson',
      'cyan'
    ],
    deleted: false,
    commentCount: 3,
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
