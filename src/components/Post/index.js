import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
        <StyledPost.VoteScore>
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
        </StyledPost.VoteScore>
        <StyledPost.Title>{post.title}</StyledPost.Title>
        <StyledPost.Body>
          {post.body}
          <StyledPost.Join category={post.category}>... join the conversation</StyledPost.Join>
        </StyledPost.Body>
        <StyledPost.Info category={post.category}>
          <StyledPost.Info.Author>
            <StyledPost.Info.Author.Avatar author={post.author} />
            <span>{post.author}</span>
          </StyledPost.Info.Author>
          <StyledPost.Info.Date>
            <p>
              {formatToDate(post.timestamp)} - {formatToTime(post.timestamp)}
            </p>
          </StyledPost.Info.Date>
          <StyledPost.Info.CommentCount>
            {post.commentCount}
          </StyledPost.Info.CommentCount>
        </StyledPost.Info>
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
