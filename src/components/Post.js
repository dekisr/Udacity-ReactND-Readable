import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <Fragment>
        <h3>Title: {post.title}</h3>
        <p>
          Author: {post.author} <br />
          Timestamp: {post.timestamp} <br />
          Category: {post.category} <br />
          Body: {post.body} <br />
          Comment Count: {post.commentCount} <br />
          Deleted: {post.deleted.toString()} <br />
          Id: {post.id} <br />
          Vote Score: {post.voteScore} <br />
        </p>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts[id]
  return {
    post
  }
}

export default connect(mapStateToProps)(Post)
