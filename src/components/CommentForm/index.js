import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddComment, handleEditComment } from '../../actions/comments'
import StyledCommentForm from './styles'

class CommentForm extends Component {
  state = {
    body: '',
    bodyError: '',
    valid: false,
    toPost: false
  }
  componentDidMount() {
    const { comment } = this.props
    comment && this.setState({ body: this.props.comment.body })
  }
  validateComment = (value) => {
    let error = ''
    const { comment } = this.props
    value.length > 20 && value.length < 301
      ? (error = '')
      : (error =
          '🧟 Your comment must be longer than 20 and up to 300 characters long.')
    if (comment && comment.body === value) {
      error = '🧟 It was supposed to change this comment.'
    }
    this.setState({ bodyError: error })
    error ? this.setState({ valid: false }) : this.setState({ valid: true })
  }
  handleChange = (event) => {
    const value = event.target.value
    this.setState({ body: value })
    this.validateComment(value.trim().replace(/\s+/g, ' '))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { comment, parentId, currentUser, dispatch } = this.props
    let commentData
    if (comment) {
      commentData = {
        id: comment.id,
        timestamp: comment.timestamp,
        body: this.state.body.trim().replace(/\s+/g, ' '),
        lastEdit: {
          timestamp: Date.now(),
          author: currentUser
        }
      }
      commentData.body.length > 20 &&
      commentData.body.length < 301 &&
      this.state.body !== comment.body
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
        body: this.state.body.trim().replace(/\s+/g, ' '),
        author: currentUser,
        parentId: parentId,
        lastEdit: null
      }
      commentData.body.length > 20 && commentData.body.length < 301
        ? dispatch(handleAddComment(commentData)).then(() => {
            this.setState({ body: '' })
          })
        : this.setState({
            bodyError: '🧟‍ What?'
          })
    }
  }
  render() {
    const { comment, parentId, currentUser } = this.props
    const { body, bodyError, valid, toPost } = this.state
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
          maxLength="300"
          value={body}
          onChange={this.handleChange}
          // onBlur={this.handleBlur}
        />
        {body.length > 0 && (
          <span>
            <b>{body.trim().replace(/\s+/g, ' ').length} / 300</b>
          </span>
        )}
        {bodyError && <span>{bodyError}</span>}
        <button type="submit" disabled={!valid}>
          Add new comment
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
