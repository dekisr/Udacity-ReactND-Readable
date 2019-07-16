import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVotePost } from '../../actions/posts'
import { formatToDate, formatToTime } from '../../utils/helpers'
import StyledPost from './styles'


class Post extends Component {
  postScoreModifier = (id, option) => {
    const { dispatch } = this.props
    return dispatch(handleVotePost({id,option}))
  }
  render() {
    const { post } = this.props
    return (
      <StyledPost category={post.category}>
        <StyledPost.Info>
          <StyledPost.Info.Category>{post.category}</StyledPost.Info.Category>
          <StyledPost.Info.Author><span>{post.author}</span></StyledPost.Info.Author>
          <StyledPost.Info.Date>{formatToDate(post.timestamp)}</StyledPost.Info.Date>
          <StyledPost.Info.Date>{formatToTime(post.timestamp)}</StyledPost.Info.Date>
          <StyledPost.Info.CommentCount>{post.commentCount}</StyledPost.Info.CommentCount>
          <StyledPost.Info.VoteScore>
            <button onClick={() => this.postScoreModifier(post.id, 'upVote')}>VOTE UP</button>
            {post.voteScore}
            <button onClick={() => this.postScoreModifier(post.id, 'downVote')}>VOTE DOWN</button>
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
