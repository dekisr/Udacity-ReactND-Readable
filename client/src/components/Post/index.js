import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  handleVotePost,
  handleReloadPost,
  handleDeletePost
} from '../../actions/posts'
import { handleToast } from '../../actions/toast'
import { updateSessionLog } from '../../actions/sessionLog'
import Confirm from '../Confirm'
import {
  formatToDate,
  formatToTime,
  emphasisHTML,
  safeHTML,
  socketEmit
} from '../../utils/helpers'
import StyledPost from './styles'

class Post extends Component {
  state = {
    toPost: false,
    confirmDelete: false
  }
  changeVoteScore = (id, option, voteScore, votedBy) => {
    const { dispatch, currentUser } = this.props
    if (votedBy.includes(currentUser)) {
      return dispatch(
        handleToast(`The user ${currentUser} already voted here!`, 'alert')
      )
    } else {
      return dispatch(handleVotePost({ id, option, voteScore, currentUser }))
        .then(() => {
          socketEmit('vote post', {
            id,
            user: currentUser
          })
          dispatch(updateSessionLog('You voted for a post, ', currentUser))
        })
        .catch((err) => {
          dispatch(handleToast(`${err.message}. Resyinc the post...`, 'error'))
          /*
          on server errror:
          try to reload the post preventing bugs with Optimistic
          Updates if clicking too fast using slow connections and bad hardware
        */
          dispatch(handleReloadPost(id)).catch((err) =>
            dispatch(handleToast(err.message, 'error'))
          )
        })
    }
  }
  joinPost = () => {
    this.setState({ toPost: true })
  }
  deletePost = (id) => {
    const { dispatch, dashboard, currentUser, history } = this.props
    return dispatch(handleDeletePost(id))
      .then(() => {
        !dashboard && history.push('/')
        socketEmit('delete post', {
          id,
          user: currentUser
        })
        dispatch(updateSessionLog('You DELETED a post, ', currentUser))
        dispatch(handleToast('The post was successfully deleted', 'success'))
      })
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  render() {
    const { toPost, confirmDelete } = this.state
    const { post, commentCount, dashboard, currentUser } = this.props
    return !post ? null : toPost ? (
      <Redirect push to={`/post/id/${post.id}`} />
    ) : (
      <StyledPost category={post.category}>
        <StyledPost.VoteScore voted={post.votedBy.includes(currentUser)}>
          <button
            onClick={() =>
              this.changeVoteScore(
                post.id,
                'upVote',
                post.voteScore,
                post.votedBy
              )
            }
            aria-label="Vote Post Up"
          >
            <i>keyboard_arrow_up</i>
          </button>
          {post.voteScore}
          <button
            onClick={() =>
              this.changeVoteScore(
                post.id,
                'downVote',
                post.voteScore,
                post.votedBy
              )
            }
            aria-label="Vote Post Down"
          >
            <i>keyboard_arrow_down</i>
          </button>
        </StyledPost.VoteScore>
        <StyledPost.Title>{post.title}</StyledPost.Title>
        <StyledPost.Content>
          <StyledPost.Body
            dashboard={dashboard}
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
              <i>edit</i>
            </button>
          </Link>
          <button
            aria-label="Delete Post"
            onClick={() => this.setState({ confirmDelete: true })}
          >
            <i>delete_forever</i>
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
        <Confirm
          post
          active={confirmDelete}
          message="Are you sure to delete this post?"
          confirm={() => this.deletePost(post.id)}
          cancel={() => this.setState({ confirmDelete: false })}
        />
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

export default withRouter(connect(mapStateToProps)(Post))
