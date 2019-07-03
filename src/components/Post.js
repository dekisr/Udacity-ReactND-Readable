import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <Fragment>
        <h3>{post.title}</h3>
        <h5>{post.author}</h5>
        <p>{post.body}</p>
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post =  posts[id]
  return {
    post: post
  }
}

export default connect(mapStateToProps)(Post)
