import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sortCategories, sortPostsComments } from '../../utils/helpers'
import Post from '../Post'
import Category from '../Category'
import Comment from '../Comment'

class Dashboard extends Component {
  state = {
    sortBy: 'voteScore'
  }
  render() {
    const { postIds, posts } = this.props
    const { sortBy } = this.state
    return (
      <Fragment>
        {sortPostsComments(postIds, posts, sortBy).map((id) => (
          <Post key={id} id={id} dashboard={true} />
        ))}
        {/* <h1>Categories</h1>
        {this.props.categoriesNames.map((name) => (
          <Category key={name} name={name} />
        ))}
        <h1>Comments</h1>
        {this.props.commentsIds.map((id) => (
          <Comment key={id} id={id} />
        ))} */}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ posts, categories, comments }) => {
  return {
    postIds: Object.keys(posts),
    posts,
    categoriesNames: sortCategories(categories),
    commentsIds: Object.keys(comments)
  }
}

export default connect(mapStateToProps)(Dashboard)
