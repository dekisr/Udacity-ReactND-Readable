import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddComment } from '../../actions/comments'
import StyledCommentForm from './styles'

class CommentForm extends Component {
  state = {
    body: '',
    bodyError: '',
    valid: false
  }
  validateComment = (value) => {
    let error = ''
    value.length > 20
    ? (error = '')
    : (error = '🧟 Your comment must be longer than 20 characters.')
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
    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.state.body.trim().replace(/\s+/g, ' '),
      author: this.props.currentUser,
      parentId: this.props.parentId
    }
    comment.body.length > 20 && comment.body.length < 301
      ? this.props.dispatch(handleAddComment(comment))
      : this.setState({
          bodyError: '🧟‍ What?'
        })
  }
  render() {
    const { currentUser } = this.props
    const { body, bodyError, valid } = this.state
    return (
      <StyledCommentForm
        noValidade
        onSubmit={this.handleSubmit}
        author={currentUser}
      >
        <StyledCommentForm.TextArea
          name="body"
          placeholder="Type your message"
          maxLength="300"
          value={this.state.body}
          onChange={this.handleChange}
          // onBlur={this.handleBlur}
        />
        {body.length > 0 && <span><b>{body.trim().replace(/\s+/g, ' ').length} / 300</b></span>}
        {bodyError && <span>{bodyError}</span>}
        <button type="submit" disabled={!valid}>
          Add new comment
        </button>
      </StyledCommentForm>
    )
  }
}

CommentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired
}

const mapStateToProps = ({ currentUser }, { parentId }) => ({
  currentUser
})

export default connect(mapStateToProps)(CommentForm)
