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
  handleVoteScore = (id, option) => {
    const { dispatch } = this.props
    return dispatch(handleVotePost({ id, option }))
  }
  render() {
    const { post, commentCount } = this.props
    return !post ? (
      <h1>NOOOOO</h1>
    ) : (
      <StyledPost category={post.category}>
        <StyledPost.VoteScore>
          <button
            onClick={() => this.handleVoteScore(post.id, 'upVote')}
            aria-label="Vote Post Up"
          >
            <Oction icon={ChevronUp} size="medium" verticalAlign="middle" />
          </button>
          {post.voteScore}
          <button
            onClick={() => this.handleVoteScore(post.id, 'downVote')}
            aria-label="Vote Post Down"
          >
            <Oction icon={ChevronDown} size="medium" verticalAlign="middle" />
          </button>
        </StyledPost.VoteScore>
        <StyledPost.Title>{post.title}</StyledPost.Title>
        <StyledPost.Body>
          {post.body}
          {this.props.dashboard && (
            <Link to={`/post/id/${post.id}`}>
              <StyledPost.Join category={post.category}>
                ... join the conversation
              </StyledPost.Join>
            </Link>
          )}
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
            {commentCount}
          </StyledPost.Info.CommentCount>
        </StyledPost.Info>
      </StyledPost>
    )
  }
}

const mapStateToProps = ({ posts, comments }, { id }) => {
  const post = posts[id] || null
  return {
    post,
    commentCount: Object.keys(comments).filter(
      (commentId) => comments[commentId].parentId === post.id
    ).length
  }
}

export default connect(mapStateToProps)(Post)
