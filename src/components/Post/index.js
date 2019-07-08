import React, { Component } from 'react'
import { connect } from 'react-redux'
import StyledPost from './styles'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <StyledPost>
        <StyledPost.Title>Title: {post.title}</StyledPost.Title>
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
      </StyledPost>
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
