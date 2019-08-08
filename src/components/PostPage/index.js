import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sortPostsComments } from '../../utils/helpers'
import Post from '../Post'
import Comment from '../Comment'
import CommentForm from '../CommentForm'
import StyledPostPage from './styles'

class PostPage extends Component {
  state = {
    sortBy: 'timestamp'
  }
  render() {
    const { postId, commentsIds, comments, currentUser } = this.props
    const { sortBy } = this.state
    return (
      <Fragment>
        <Post id={postId} />
        <StyledPostPage>
          <StyledPostPage.H2 author={currentUser}>
            Hey <span>{currentUser}</span>, how about adding a comment?
          </StyledPostPage.H2>
          <CommentForm parentId={postId} />
          {commentsIds.length > 0 && (
            <StyledPostPage.H2>
              Comments ({commentsIds.length})
            </StyledPostPage.H2>
          )}
          {sortPostsComments(commentsIds, comments, sortBy).map((commentId) => (
            <Comment key={commentId} id={commentId} />
          ))}
        </StyledPostPage>
      </Fragment>
    )
  }
}

const mapStateToProps = (
  { posts, comments, currentUser },
  { match: { params } }
) => {
  const postId = params.id
  return {
    postId,
    commentsIds: Object.keys(comments).filter(
      (commentId) => comments[commentId].parentId === postId
    ),
    comments,
    currentUser
  }
}

export default connect(mapStateToProps)(PostPage)
