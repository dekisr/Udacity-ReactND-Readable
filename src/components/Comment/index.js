import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleVoteComment } from '../../actions/comments'
import { formatToTime, formatToDate } from '../../utils/helpers'
import StyledComment from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  TriangleUp
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
        <StyledComment.Body>{comment.body}</StyledComment.Body>
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
