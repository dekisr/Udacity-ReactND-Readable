import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddComment, handleEditComment } from '../../actions/comments'
import { trimReplace, removeSpaces } from './../../utils/helpers'
import StyledCommentForm from './styles'

class CommentForm extends Component {
  state = {
    body: '',
    bodyError: '',
    valid: false,
    toPost: false
  }
  handleChange = (event) => {
    const value = event.target.value
    this.setState({ body: value })
    this.validateComment(trimReplace(value))
  }
  validateComment = (value) => {
    const { comment } = this.props
    const valueChars = removeSpaces(value).length
    let error = ''

    valueChars < 21 || valueChars > 300
      ? (error =
          '🧟 Your comment must be longer than 20 and up to 300 characters long.')
      : comment && comment.body === value
      ? (error = '🧟 It was supposed to change this comment.')
      : (error = '')

    this.setState({ bodyError: error })
    error ? this.setState({ valid: false }) : this.setState({ valid: true })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { body } = this.state
    const { dispatch, comment, parentId, currentUser } = this.props
    const bodyChars = removeSpaces(body).length
    let commentData
    if (comment) {
      commentData = {
        id: comment.id,
        body: trimReplace(body),
        lastEdit: {
          timestamp: Date.now(),
          author: currentUser
        }
      }
      bodyChars > 20 &&
      bodyChars < 301 &&
      body !== comment.body
        ? dispatch(handleEditComment(commentData)).then(() =>
            this.setState({ toPost: true })
          )
        : this.setState({
            bodyError: '🧟‍ What?'
          })
    } else {
      commentData = {
        id: uuid(),
        timestamp: Date.now(),
        body: trimReplace(body),
        author: currentUser,
        parentId: parentId,
        lastEdit: null
      }
      bodyChars > 20 && bodyChars < 301
        ? dispatch(handleAddComment(commentData)).then(() => {
            this.setState({ body: '' })
          })
        : this.setState({
            bodyError: '🧟‍ What?'
          })
    }
  }
  componentDidMount() {
    const { comment } = this.props
    comment && this.setState({ body: comment.body })
  }
  render() {
    const { comment, parentId, currentUser } = this.props
    const { body, bodyError, valid, toPost } = this.state
    const bodyChars = removeSpaces(body).length
    return toPost ? (
      <Redirect to={`/post/id/${comment.parentId}`} />
    ) : !comment && !parentId ? (
      <h1>This comment does not exist.</h1>
    ) : (
      <StyledCommentForm
        noValidade
        onSubmit={this.handleSubmit}
        author={currentUser}
      >
        <StyledCommentForm.TextArea
          name="body"
          placeholder="Type your message"
          maxLength={300 + (body.length - bodyChars)}
          value={body}
          onChange={this.handleChange}
          // onBlur={this.handleBlur}
        />
        {body.length > 0 && (
          <span>
            <b>{bodyChars} / 300</b>
          </span>
        )}
        {bodyError && <span>{bodyError}</span>}
        <button type="submit" disabled={!valid}>
          {comment ? 'Edit comment' : 'Add new comment'}
        </button>
      </StyledCommentForm>
    )
  }
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  currentUser: PropTypes.string.isRequired
}

const mapStateToProps = ({ comments, currentUser }, ownProps) => {
  const commentId = ownProps.match ? ownProps.match.params.id : null
  const comment = comments[commentId] || null
  return {
    comment,
    currentUser: currentUser
  }
}

export default connect(mapStateToProps)(CommentForm)
