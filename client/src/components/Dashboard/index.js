import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from '../Post'
import Category from '../Category'
import Comment from '../Comment'
import { sortCategories, sortPostsComments } from '../../utils/helpers'

class Dashboard extends Component {
  state = {
    sortBy: 'timestamp'
  }
  render() {
    const { postIds, posts } = this.props
    const { sortBy } = this.state

    return (
      <Fragment>
        {Object.keys(posts).length === 0 ? (
          <h2>there are no posts yet...</h2>
        ) : (
          sortPostsComments(postIds, posts, sortBy).map((id) => (
            <Post key={id} id={id} dashboard={true} />
          ))
        )}
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

Dashboard.propTypes = {
  posts: PropTypes.object.isRequired,
  postIds: PropTypes.array.isRequired
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
    postIds: Object.keys(posts)
  }
}

export default connect(mapStateToProps)(Dashboard)
