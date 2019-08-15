import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { handleVoteComment } from '../../actions/comments'
import { formatToTime, formatToDate } from '../../utils/helpers'
import StyledComment from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  Pencil,
  Trashcan
} from '@primer/octicons-react'

class Comment extends Component {
  handleCommentScore = (id, option) => {
    const { dispatch } = this.props
    return dispatch(handleVoteComment({ id, option }))
  }
  render() {
    const { comment } = this.props
    return !comment ? null : (
      <StyledComment author={comment.author}>
        <StyledComment.VoteScore>
          <button
            aria-label="Vote Comment Up"
            onClick={() => this.handleCommentScore(comment.id, 'upVote')}
          >
            <Oction
              icon={ChevronUp}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Up"
            />
          </button>
          {comment.voteScore}
          <button
            aria-label="Vote Comment Down"
            onClick={() => this.handleCommentScore(comment.id, 'downVote')}
          >
            <Oction
              icon={ChevronDown}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Down"
            />
          </button>
        </StyledComment.VoteScore>
        <StyledComment.Body>
          {comment.body}
          {comment.lastEdit && (
            <span>
              edited by: {comment.lastEdit.author}, on{' '}
              {formatToDate(comment.lastEdit.timestamp)}
            </span>
          )}
        </StyledComment.Body>
        <StyledComment.Edit>
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
          <button aria-label="Delete Comment" onClick={() => this.teste(comment.id)}>
            <Oction
              icon={Trashcan}
              size="small"
              verticalAlign="middle"
              ariaLabel="Delete Comment"
            />
          </button>
        </StyledComment.Edit>
        <StyledComment.Info>
          <StyledComment.Info.Date>
            {formatToDate(comment.timestamp)} - {}
            {formatToTime(comment.timestamp)}
          </StyledComment.Info.Date>
          <StyledComment.Info.Author>
            <StyledComment.Info.Avatar author={comment.author} />
            <span>{comment.author}</span>
          </StyledComment.Info.Author>
        </StyledComment.Info>
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