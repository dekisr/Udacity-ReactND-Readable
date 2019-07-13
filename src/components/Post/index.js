import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatToDate, formatToTime } from '../../utils/helpers'
import StyledPost from './styles'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <StyledPost>
        <StyledPost.Info>
          <StyledPost.Info.Category>{post.category}</StyledPost.Info.Category>
          <StyledPost.Info.Author><span>{post.author}</span></StyledPost.Info.Author>
          <StyledPost.Info.Date>{formatToDate(post.timestamp)}</StyledPost.Info.Date>
          <StyledPost.Info.Date>{formatToTime(post.timestamp)}</StyledPost.Info.Date>
          <StyledPost.Info.CommentCount>{post.commentCount}</StyledPost.Info.CommentCount>
          <StyledPost.Info.VoteScore>
            <button>VOTE UP</button>
            {post.voteScore}
            <button>VOTE DOWN</button>
          </StyledPost.Info.VoteScore>
        </StyledPost.Info>
        <StyledPost.Title>Title: {post.title}</StyledPost.Title>
        <StyledPost.Body>Body: {post.body}</StyledPost.Body>
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
