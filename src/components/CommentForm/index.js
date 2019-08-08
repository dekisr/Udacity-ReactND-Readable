import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../../actions/comments'
import uuid from 'uuid'
import StyledCommentForm from './styles'

class CommentForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const comment = {
      id: uuid(),
      timestamp: Date.now(),
      body: 'teste teste teste',
      author: this.props.currentUser,
      parentId: this.props.parentId
    }
    this.props.dispatch(handleAddComment(comment))
  }
  render() {
    const { currentUser } = this.props
    return (
      <StyledCommentForm onSubmit={this.handleSubmit} author={currentUser}>
        <StyledCommentForm.TextArea />
        <button type="submit">Add new comment</button>
      </StyledCommentForm>
    )
  }
}

const mapStateToProps = ({ currentUser }, { parentId }) => ({
  currentUser,
  parentId
})

export default connect(mapStateToProps)(CommentForm)
