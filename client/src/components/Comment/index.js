import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  handleVoteComment,
  handleDeleteComment,
  handleReloadComment
} from '../../actions/comments'
import { updateSessionLog } from '../../actions/sessionLog'
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
import Oction, {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trashcan
} from '@primer/octicons-react'

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
          dispatch(
            updateSessionLog('A comment received a vote from', currentUser)
          )
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
        dispatch(updateSessionLog('A comment has been deleted by', currentUser))
        dispatch(handleToast('The comment was successfully deleted', 'success'))
      })
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  render() {
    const { confirmDelete } = this.state
    const { comment } = this.props
    return !comment ? null : (
      <StyledComment author={comment.author}>
        <StyledComment.VoteScore>
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
            <Oction
              icon={ChevronUp}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Up"
            />
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
            <Oction
              icon={ChevronDown}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Down"
            />
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
              <Oction
                icon={Pencil}
                size="small"
                verticalAlign="middle"
                ariaLabel="Edit Comment"
              />
            </button>
          </Link>
          <button
            aria-label="Delete Comment"
            onClick={() => this.setState({ confirmDelete: true })}
          >
            <Oction
              icon={Trashcan}
              size="small"
              verticalAlign="middle"
              ariaLabel="Delete Comment"
            />
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
