import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddComment, handleEditComment } from '../../actions/comments'
import { updateSessionLog } from '../../actions/sessionLog'
import { handleToast } from '../../actions/toast'
import Error from '../Error'
import { trimReplace, removeSpaces, socketEmit } from './../../utils/helpers'
import StyledCommentForm from './styles'

class CommentForm extends Component {
  state = {
    body: '',
    bodyError: '',
    isValid: false,
    toPost: false
  }
  validateComment = (value) => {
    const { comment } = this.props
    const valueChars = removeSpaces(value).length
    let error = ''

    valueChars < 21 || valueChars > 300
      ? (error =
          '🧟‍♂️ Your comment must be longer than 20 and up to 300 characters long.')
      : comment && comment.body === value
      ? (error = '🧟‍♀️ It was supposed to change this comment.')
      : (error = '')

    this.setState({ bodyError: error })
    error ? this.setState({ isValid: false }) : this.setState({ isValid: true })
  }
  handleChange = (event) => {
    const value = event.target.value
    this.setState({ body: value })
    this.validateComment(trimReplace(value))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { body, isValid } = this.state
    const { dispatch, comment, parentId, currentUser } = this.props
    if (comment) {
      const commentData = {
        id: comment.id,
        body: trimReplace(body),
        lastEdit: {
          timestamp: Date.now(),
          author: currentUser
        }
      }
      isValid && body !== comment.body
        ? dispatch(handleEditComment(commentData))
            .then(() =>
              this.setState({ body: '', isValid: false, toPost: true })
            )
            .then(() => {
              socketEmit('edit comment', {
                id: commentData.id,
                user: currentUser
              })
              dispatch(
                updateSessionLog(
                  'A comment has been edited by',
                  currentUser
                )
              )
              dispatch(
                handleToast('The comment was successfully edited', 'success')
              )
            })
            .catch((err) => dispatch(handleToast(err.message, 'error')))
        : this.setState({
            bodyError: '🧛🏻‍♂️ What?'
          })
    } else {
      const commentData = {
        id: uuid(),
        timestamp: Date.now(),
        body: trimReplace(body),
        author: currentUser,
        parentId: parentId,
        lastEdit: null
      }
      isValid
        ? dispatch(handleAddComment(commentData))
            .then(() => {
              this.setState({ body: '', isValid: false })
            })
            .then(() => {
              socketEmit('new comment', {
                id: commentData.id,
                user: currentUser
              })
              dispatch(
                updateSessionLog(
                  'New comment posted by',
                  currentUser
                )
              )
              dispatch(
                handleToast('The comment was successfully posted', 'success')
              )
            })
            .catch((err) => dispatch(handleToast(err.message, 'error')))
        : this.setState({
            bodyError: '🧛🏻‍♂️ What?'
          })
    }
  }
  componentDidMount() {
    const { comment } = this.props
    comment && this.setState({ body: comment.body })
  }
  render() {
    const { body, bodyError, isValid, toPost } = this.state
    const { comment, parentId, currentUser } = this.props
    const bodyChars = removeSpaces(body).length
    return toPost ? (
      <Redirect push to={`/post/id/${comment.parentId}`} />
    ) : !comment && !parentId ? (
      <Error message="👨‍🌾 We couldn't find any comments with this id. 👩‍🌾" />
    ) : (
      <Fragment>
        {comment && <h1>Edit comment</h1>}
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
            <StyledCommentForm.Options>
              <dl>
                <dt>options:</dt>
                <dd>
                  **text**:<b>text</b>
                </dd>
                <dd>
                  __text__:<i>text</i>
                </dd>
                <dd>
                  ~~text~~:<s>text</s>
                </dd>
              </dl>
              <span>
                <b>{bodyChars} / 300</b>
              </span>
            </StyledCommentForm.Options>
          )}
          {bodyError && <span>{bodyError}</span>}
          <button type="submit" disabled={!isValid}>
            {comment ? 'Edit comment' : 'Add new comment'}
          </button>
        </StyledCommentForm>
      </Fragment>
    )
  }
}

CommentForm.propTypes = {
  comment: PropTypes.object,
  parentId: PropTypes.string,
  currentUser: PropTypes.string
}

const mapStateToProps = ({ comments, currentUser }, ownProps) => {
  const commentId = ownProps.match ? ownProps.match.params.id : null
  const comment = comments[commentId] || null
  return {
    comment,
    currentUser
  }
}

export default connect(mapStateToProps)(CommentForm)
