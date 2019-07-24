import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVotePost } from '../../actions/posts'
import { formatToDate, formatToTime } from '../../utils/helpers'
import StyledPost from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  TriangleUp
} from '@primer/octicons-react'

class Post extends Component {
  postScoreModifier = (id, option) => {
    const { dispatch } = this.props
    return dispatch(handleVotePost({ id, option }))
  }
  render() {
    const { post } = this.props
    return !post ? (
      <h1>NOOOOO</h1>
    ) : (
      <StyledPost category={post.category}>
        <StyledPost.Info category={post.category}>
          <StyledPost.Info.Category>{post.category}</StyledPost.Info.Category>
          <StyledPost.Avatar author={post.author} />
          <StyledPost.Info.Author>
            <span>{post.author}</span>
          </StyledPost.Info.Author>
          <StyledPost.Info.Date>
            {formatToDate(post.timestamp)}
          </StyledPost.Info.Date>
          <StyledPost.Info.Date>
            {formatToTime(post.timestamp)}
          </StyledPost.Info.Date>
          <StyledPost.Info.CommentCount>
            {post.commentCount}
          </StyledPost.Info.CommentCount>
          <StyledPost.Info.VoteScore>
            <button onClick={() => this.postScoreModifier(post.id, 'upVote')}>
              <Oction
                icon={ChevronUp}
                size="medium"
                verticalAlign="middle"
                ariaLabel="Vote Up"
              />
            </button>
            {post.voteScore}
            <button onClick={() => this.postScoreModifier(post.id, 'downVote')}>
              <Oction
                icon={ChevronDown}
                size="medium"
                verticalAlign="middle"
                ariaLabel="Vote Down"
              />
            </button>
          </StyledPost.Info.VoteScore>
        </StyledPost.Info>
        <StyledPost.Title>Title: {post.title}</StyledPost.Title>
        <StyledPost.Body>Body: {post.body}</StyledPost.Body>
      </StyledPost>
    )
  }
}

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts[id] || null
  return {
    post
  }
}

export default connect(mapStateToProps)(Post)
