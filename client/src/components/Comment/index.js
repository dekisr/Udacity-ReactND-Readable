import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  handleVoteComment,
  handleDeleteComment,
  handleReloadComment
} from '../../actions/comments'
import { updateSessionLog, setNewStatus } from '../../actions/sessionLog'
import { handleToast } from '../../actions/toast'
import Confirm from '../Confirm'
import {
  formatToTime,
  formatToDate,
  safeHTML,
  emphasisHTML,
  socketEmit
} from '../../utils/helpers'
import StyledComment from './styles'

class Comment extends Component {
  state = {
    confirmDelete: false
  }
  changeVoteScore = (id, option, voteScore, votedBy) => {
    const { dispatch, currentUser } = this.props
    if (votedBy.includes(currentUser)) {
      return dispatch(
        handleToast(`The user ${currentUser} already voted here!`, 'alert')
      )
    } else {
      return dispatch(handleVoteComment({ id, option, voteScore, currentUser }))
        .then(() => {
          socketEmit('vote comment', {
            id,
            user: currentUser
          })
          dispatch(updateSessionLog('You voted for a comment, ', currentUser))
          dispatch(setNewStatus(true))
        })
        .catch((err) => {
          dispatch(
            handleToast(`${err.message}. Resyinc the comment...`, 'error')
          )
          /*
          on server errror:
          try to reload the comment preventing bugs with Optimistic
          Updates if clicking too fast using slow connections and bad hardware
        */
          dispatch(handleReloadComment(id)).catch((err) =>
            dispatch(handleToast(err.message, 'error'))
          )
        })
    }
  }
  deleteComment = (id) => {
    const { dispatch, currentUser } = this.props
    return dispatch(handleDeleteComment(id))
      .then(() => {
        socketEmit('delete comment', {
          id,
          user: currentUser
        })
        dispatch(updateSessionLog('You deleted a comment, ', currentUser))
        dispatch(setNewStatus(true))
        dispatch(handleToast('The comment was successfully deleted', 'success'))

      })
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  render() {
    const { confirmDelete } = this.state
    const { comment, currentUser } = this.props
    return !comment ? null : (
      <StyledComment author={comment.author}>
        <StyledComment.VoteScore voted={comment.votedBy.includes(currentUser)}>
          <button
            aria-label="Vote Comment Up"
            onClick={() =>
              this.changeVoteScore(
                comment.id,
                'upVote',
                comment.voteScore,
                comment.votedBy
              )
            }
          >
            <i>keyboard_arrow_up</i>
          </button>
          <div aria-label="Comment Vote Score">{comment.voteScore}</div>
          <button
            aria-label="Vote Comment Down"
            onClick={() =>
              this.changeVoteScore(
                comment.id,
                'downVote',
                comment.voteScore,
                comment.votedBy
              )
            }
          >
            <i>keyboard_arrow_down</i>
          </button>
        </StyledComment.VoteScore>
        <StyledComment.Body
          dangerouslySetInnerHTML={{
            __html: emphasisHTML(safeHTML(comment.body))
          }}
        />
        <StyledComment.Info>
          <StyledComment.Info.Date>
            {formatToDate(comment.timestamp)} - {}
            {formatToTime(comment.timestamp)}
          </StyledComment.Info.Date>
          <StyledComment.Info.Author aria-label="Author">
            <StyledComment.Info.Avatar
              aria-label="Avatar"
              author={comment.author}
            />
            <span aria-label="Name">{comment.author}</span>
          </StyledComment.Info.Author>
        </StyledComment.Info>
        <StyledComment.Edit>
          <span>
            {comment.lastEdit &&
              `
              edited by: ${comment.lastEdit.author}, on
              ${formatToDate(comment.lastEdit.timestsmp)}
              `}
          </span>
          <Link to={`/comment/edit/id/${comment.id}`}>
            <button aria-label="Edit Comment">
              <i>edit</i>
            </button>
          </Link>
          <button
            aria-label="Delete Comment"
            onClick={() => this.setState({ confirmDelete: true })}
          >
            <i>delete_forever</i>
          </button>
        </StyledComment.Edit>
        <Confirm
          active={confirmDelete}
          message="Want to delete this comment?"
          confirm={() => this.deleteComment(comment.id)}
          cancel={() => this.setState({ confirmDelete: false })}
        />
      </StyledComment>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.object
}

const mapStateToProps = ({ comments, currentUser }, { id }) => {
  const comment = comments[id] || null
  return {
    comment,
    currentUser
  }
}

export default connect(mapStateToProps)(Comment)
