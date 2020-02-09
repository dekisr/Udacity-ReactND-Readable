require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const socketIO = require('socket.io')
const config = require('./config')
const categories = require('./categories')
const posts = require('./posts')
const comments = require('./comments')

const app = express()
const server = app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
const io = socketIO(server)
io.on('connection', (socket) => {
  socket.on('reset data', (info) => {
    socket.broadcast.emit('reset data', info)
  })
  // POSTS
  socket.on('new post', (info) => {
    socket.broadcast.emit('new post', info)
  })
  socket.on('edit post', (info) => {
    socket.broadcast.emit('edit post', info)
  })
  socket.on('vote post', (info) => {
    socket.broadcast.emit('vote post', info)
  })
  socket.on('delete post', (info) => {
    socket.broadcast.emit('delete post', info)
  })
  // COMMENTS
  socket.on('new comment', (info) => {
    socket.broadcast.emit('new comment', info)
  })
  socket.on('edit comment', (info) => {
    socket.broadcast.emit('edit comment', info)
  })
  socket.on('vote comment', (info) => {
    socket.broadcast.emit('vote comment', info)
  })
  socket.on('delete comment', (info) => {
    socket.broadcast.emit('delete comment', info)
  })
})

const corsOptions = {
  origin: '*',
  credentials: true
}
app.use(express.static('public'))
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  const help = `
  <pre>
    Readable Project Server API.
    This is a project for study purposes.
    Find more information at github.com/dekisr
  </pre>
  `
  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')
  if (token === 'Charizard') {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself.'
    })
  }
})

app.get('/categories', (req, res) => {
  categories.getAll(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting categories.'
      })
    }
  )
})

app.get('/:category/posts', (req, res) => {
  posts.getByCategory(req.token, req.params.category).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting posts by category.'
      })
    }
  )
})

// Add an endpoint to reset data
app.get('/posts/reset', (req, res) => {
  posts.reset(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error reseting posts.'
      })
    }
  )
})

app.get('/posts', (req, res) => {
  posts.getAll(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting posts.'
      })
    }
  )
})

app.post('/posts', bodyParser.json(), (req, res) => {
  posts.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error sending the post.'
      })
    }
  )
})

app.get('/posts/:id', (req, res) => {
  posts.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting the post.'
      })
    }
  )
})

app.delete('/posts/:id', (req, res) => {
  posts
    .disable(req.token, req.params.id)
    .then((post) => comments.disableByParent(req.token, post))
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)
        res.status(500).send({
          error: 'There was an error deleting the post.'
        })
      }
    )
})

app.post('/posts/:id', bodyParser.json(), (req, res) => {
  const { option, user } = req.body
  const id = req.params.id
  posts.vote(req.token, id, user, option).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error sending the post.'
      })
    }
  )
})

app.put('/posts/:id', bodyParser.json(), (req, res) => {
  posts.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error updating the post.'
      })
    }
  )
})

app.get('/posts/:id/comments', (req, res) => {
  comments.getByParent(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting comments.'
      })
    }
  )
})

// Add an endpoint to reset data
app.get('/comments/reset', (req, res) => {
  comments.reset(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error reseting comments.'
      })
    }
  )
})

// Add an endpoint to get all comments
app.get('/comments', (req, res) => {
  comments.getAll(req.token).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting comments.'
      })
    }
  )
})

app.get('/comments/:id', (req, res) => {
  comments.get(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error requesting the comment.'
      })
    }
  )
})

app.put('/comments/:id', bodyParser.json(), (req, res) => {
  comments.edit(req.token, req.params.id, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error updating the comment.'
      })
    }
  )
})

app.post('/comments', bodyParser.json(), (req, res) => {
  comments.add(req.token, req.body).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error sending the comment.'
      })
    }
  )
})

app.post('/comments/:id', bodyParser.json(), (req, res) => {
  const { option, user } = req.body
  const id = req.params.id
  comments.vote(req.token, id, user, option).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error sending the comment.'
      })
    }
  )
})

app.delete('/comments/:id', (req, res) => {
  comments.disable(req.token, req.params.id).then(
    (data) => res.send(data),
    (error) => {
      console.error(error)
      res.status(500).send({
        error: 'There was an error deleting the comment.'
      })
    }
  )
})
