import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <Fragment>
        <p>
          Parent Id: {comment.parentId} <br />
          Parent Deleted: {comment.parentDeleted.toString()} <br />
          Id: {comment.id} <br />
          Deleted: {comment.deleted.toString()} <br />
          Timestamp: {comment.timestamp} <br />
          Author: {comment.author} <br />
          Body: {comment.body} <br />
          Vote Score: {comment.voteScore} <br />
        </p>
      </Fragment>
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
