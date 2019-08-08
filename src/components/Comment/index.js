import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatToTime, formatToDate } from '../../utils/helpers'
import StyledComment from './styles'
import Oction, {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  TriangleUp
} from '@primer/octicons-react'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <StyledComment author={comment.author}>
        <StyledComment.VoteScore>
          <button aria-label="Vote Post Up">
            <Oction
              icon={ChevronUp}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Up"
            />
          </button>
          {comment.voteScore}
          <button aria-label="Vote Post Down">
            <Oction
              icon={ChevronDown}
              size="medium"
              verticalAlign="middle"
              ariaLabel="Vote Down"
            />
          </button>
        </StyledComment.VoteScore>
        <StyledComment.Body>{comment.body}</StyledComment.Body>
        <p>{comment.author}</p>
      </StyledComment>
    )
  }
}

const mapStateToProps = ({ comments }, { id }) => {
  const comment = comments[id]
  return {
    comment
  }
}

export default connect(mapStateToProps)(Comment)
