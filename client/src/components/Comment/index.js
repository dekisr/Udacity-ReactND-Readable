import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleVoteComment, handleDeleteComment } from '../../actions/comments'
import { handleToast } from '../../actions/toast'
import {
  formatToTime,
  formatToDate,
  safeHTML,
  emphasisHTML
} from '../../utils/helpers'
import StyledComment from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trashcan
} from '@primer/octicons-react'

class Comment extends Component {
  changeVoteScore = (id, option, voteScore) => {
    const { dispatch } = this.props
    return dispatch(handleVoteComment({ id, option, voteScore })).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }
  deleteComment = (id) => {
    const { dispatch } = this.props
    return dispatch(handleDeleteComment(id))
      .then(() =>
        dispatch(handleToast('The comment was successfully deleted', 'success'))
      )
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  render() {
    const { comment } = this.props
    return !comment ? null : (
      <StyledComment author={comment.author}>
        <StyledComment.VoteScore>
          <button
            aria-label="Vote Comment Up"
            onClick={() =>
              this.changeVoteScore(comment.id, 'upVote', comment.voteScore)
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
              this.changeVoteScore(comment.id, 'downVote', comment.voteScore)
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
            onClick={() => this.deleteComment(comment.id)}
          >
            <Oction
              icon={Trashcan}
              size="small"
              verticalAlign="middle"
              ariaLabel="Delete Comment"
            />
          </button>
        </StyledComment.Edit>
      </StyledComment>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.object
}

const mapStateToProps = ({ comments }, { id }) => {
  const comment = comments[id] || null
  return {
    comment
  }
}

export default connect(mapStateToProps)(Comment)
