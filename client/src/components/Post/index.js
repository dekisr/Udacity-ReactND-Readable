import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleVotePost, handleReloadPost } from '../../actions/posts'
import { handleToast } from '../../actions/toast'
import {
  formatToDate,
  formatToTime,
  emphasisHTML,
  safeHTML
} from '../../utils/helpers'
import StyledPost from './styles'
import Oction, { ChevronUp, ChevronDown } from '@primer/octicons-react'

class Post extends Component {
  changeVoteScore = (id, option, voteScore) => {
    const { dispatch } = this.props
    return dispatch(handleVotePost({ id, option, voteScore })).catch((err) => {
      dispatch(handleToast(`${err.message}. Resyinc the post...`, 'error'))
      /*
        on server errror:
        try to reload the post preventing bugs with Optimistic
        Updates if clicking too fast using slow connections
      */
      dispatch(handleReloadPost(id)).catch((err) =>
        dispatch(handleToast(err.message, 'error'))
      )
    })
  }
  render() {
    const { post, commentCount } = this.props
    return !post ? null : (
      <StyledPost category={post.category}>
        <StyledPost.VoteScore>
          <button
            onClick={() =>
              this.changeVoteScore(post.id, 'upVote', post.voteScore)
            }
            aria-label="Vote Post Up"
          >
            <Oction icon={ChevronUp} size="medium" verticalAlign="middle" />
          </button>
          {post.voteScore}
          <button
            onClick={() =>
              this.changeVoteScore(post.id, 'downVote', post.voteScore)
            }
            aria-label="Vote Post Down"
          >
            <Oction icon={ChevronDown} size="medium" verticalAlign="middle" />
          </button>
        </StyledPost.VoteScore>
        <StyledPost.Title>{post.title}</StyledPost.Title>
        <StyledPost.Body
          dangerouslySetInnerHTML={{
            __html: emphasisHTML(safeHTML(post.body))
          }}
        >
          {/* {this.props.dashboard && (
            <Link to={`/post/id/${post.id}`}>
              <StyledPost.Join category={post.category}>
                ... join the conversation
              </StyledPost.Join>
            </Link>
          )} */}
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

Post.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object,
  commentCount: PropTypes.number.isRequired
}

const mapStateToProps = ({ posts, comments }, { id }) => {
  const post = posts[id] || null
  const commentCount =
    Object.keys(comments).filter(
      (commentId) => comments[commentId].parentId === post.id
    ).length || 0
  return {
    post,
    commentCount
  }
}

export default connect(mapStateToProps)(Post)
