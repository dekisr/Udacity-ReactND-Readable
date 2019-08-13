import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from '../Post'
import Comment from '../Comment'
import CommentForm from '../CommentForm'
import Error from '../Error'
import { sortPostsComments } from '../../utils/helpers'
import StyledPostPage from './styles'

class PostPage extends Component {
  state = {
    sortBy: 'voteScore'
  }
  sortComments = (sortBy) => {
    this.setState({sortBy})
  }
  render() {
    const { post, postId, postComments, commentsIds, currentUser } = this.props
    const { sortBy } = this.state
    return !post ? (
      <Error message="This post does not exist." />
    ) : (
      <Fragment>
        <Post id={postId} />
        <StyledPostPage>
          <StyledPostPage.H2 author={currentUser}>
            Hey <span>{currentUser}</span>, how about adding a comment?
          </StyledPostPage.H2>
          <CommentForm parentId={postId} />
          {commentsIds.length > 0 && (
            <Fragment>
              <StyledPostPage.H2>
                Comments ({commentsIds.length})
              </StyledPostPage.H2>
              <StyledPostPage.Sort>
                <span>sort: </span>
                <button onClick={() => this.sortComments('timestamp')}>date</button>
                <button onClick={() => this.sortComments('voteScore')}>vote score</button>
              </StyledPostPage.Sort>
            </Fragment>
          )}
          {Object.keys(postComments).length === 0
            ? null
            : sortPostsComments(commentsIds, postComments, sortBy).map(
                (commentId) => <Comment key={commentId} id={commentId} />
              )}
        </StyledPostPage>
      </Fragment>
    )
  }
}

PostPage.propTypes = {
  post: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postComments: PropTypes.object.isRequired,
  commentsIds: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired
}

const mapStateToProps = (
  { posts, comments, currentUser },
  { match: { params } }
) => {
  const postId = params.id
  const post = posts[postId] || null
  const commentsIds = Object.keys(comments).filter(
    (commentId) => comments[commentId].parentId === postId
  )
  const postComments = commentsIds.reduce((acc, id) => {
    acc[id] = { ...comments[id] }
    return acc
  }, {})
  return {
    post,
    postId,
    postComments,
    commentsIds,
    currentUser
  }
}

export default connect(mapStateToProps)(PostPage)
