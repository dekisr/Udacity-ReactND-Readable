import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../Post'
import Category from '../Category'
import Comment from '../Comment'
import { sortCategories } from '../../utils/helpers'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
        {this.props.postIds.map((id) => (
          <Post key={id} id={id} />
        ))}
        <h1>Categories</h1>
        {this.props.categoriesNames.map((name) => (
          <Category key={name} name={name} />
        ))}
        <h1>Comments</h1>
        {this.props.commentsIds.map((id) => (
          <Comment key={id} id={id} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories, comments }) => {
  return {
    postIds: Object.keys(posts).sort(
      (a, b) => posts[b].timestamp - posts[a].timestamp
    ),
    categoriesNames: sortCategories(categories),
    commentsIds: Object.keys(comments)
  }
}

export default connect(mapStateToProps)(Dashboard)
