import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  handleVotePost,
  handleReloadPost,
  handleDeletePost
} from '../../actions/posts'
import { handleToast } from '../../actions/toast'
import { updateSessionLog } from '../../actions/sessionLog'
import {
  formatToDate,
  formatToTime,
  emphasisHTML,
  safeHTML,
  socketEmit
} from '../../utils/helpers'
import StyledPost from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trashcan
} from '@primer/octicons-react'

class Post extends Component {
  state = {
    toHome: false,
    toPost: false
  }
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
  joinPost = () => {
    this.setState({ toPost: true })
  }
  deletePost = (id) => {
    const { dispatch, dashboard, currentUser } = this.props
    !dashboard && this.setState({ toHome: true })
    return dispatch(handleDeletePost(id))
      .then(() => {
        socketEmit('delete post', {
          id,
          user: currentUser
        })
        dispatch(
          updateSessionLog('Post DELETED by', currentUser)
        )
        dispatch(handleToast('The post was successfully deleted', 'success'))
      })
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  render() {
    const { toHome, toPost } = this.state
    const { post, commentCount, dashboard } = this.props
    return !post ? null : toPost ? (
      <Redirect push to={`/post/id/${post.id}`} />
    ) : toHome ? (
      <Redirect push to="/" />
    ) : (
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
        <StyledPost.Content>
          <StyledPost.Body dashboard={dashboard}
            dangerouslySetInnerHTML={{
              __html: emphasisHTML(safeHTML(post.body))
            }}
          />
          {dashboard && (
            <StyledPost.Join category={post.category} onClick={this.joinPost}>
              ... join the conversation
            </StyledPost.Join>
          )}
        </StyledPost.Content>
        <StyledPost.Edit>
          <span>
            {post.lastEdit &&
              `
              edited by: ${post.lastEdit.author}, on
              ${formatToDate(post.lastEdit.timestsmp)}
              `}
          </span>
          <Link to={`/post/edit/id/${post.id}`}>
            <button aria-label="Edit Post">
              <Oction
                icon={Pencil}
                size="small"
                verticalAlign="middle"
                ariaLabel="Edit Post"
              />
            </button>
          </Link>
          <button
            aria-label="Delete Post"
            onClick={() => this.deletePost(post.id)}
          >
            <Oction
              icon={Trashcan}
              size="small"
              verticalAlign="middle"
              ariaLabel="Delete Post"
            />
          </button>
        </StyledPost.Edit>
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
  id: PropTypes.string,
  post: PropTypes.object,
  commentCount: PropTypes.number,
  dashboard: PropTypes.bool,
  currentUser: PropTypes.string
}

const mapStateToProps = ({ posts, comments, currentUser }, { id }) => {
  const post = posts[id] || null
  const commentCount =
    Object.keys(comments).filter(
      (commentId) => comments[commentId].parentId === post.id
    ).length || 0
  return {
    post,
    commentCount,
    currentUser
  }
}

export default connect(mapStateToProps)(Post)
