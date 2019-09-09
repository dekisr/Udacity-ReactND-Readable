import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Hero from '../Hero'
import Post from '../Post'
import Error from '../Error'
import { sortPostsComments } from '../../utils/helpers'

class Dashboard extends Component {
  state = {
    sortBy: 'timestamp'
  }
  handleSort = (sortBy) => {
    this.setState({ sortBy })
  }
  render() {
    const { postIds, posts, category } = this.props
    const { sortBy } = this.state
    const filteredIds = category
      ? postIds.filter((id) => posts[id].category === category)
      : postIds
    return (
      <Fragment>
        <Hero category={this.props.category} handleSort={this.handleSort} />
        {!postIds.length ? (
          <Error message="There are no posts yet..." hideButton={true} />
        ) : filteredIds.length ? (
          sortPostsComments(filteredIds, posts, sortBy).map((id) => (
            <Post key={id} id={id} dashboard={true} />
          ))
        ) : (
          <Error
            message="There are no posts in this category..."
            hideButton={true}
          />
        )}
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  posts: PropTypes.object.isRequired,
  postIds: PropTypes.array.isRequired,
  category: PropTypes.string
}

const mapStateToProps = ({ posts }, { match: { params } }) => {
  return {
    posts,
    postIds: Object.keys(posts),
    category: params.category
  }
}

export default connect(mapStateToProps)(Dashboard)
