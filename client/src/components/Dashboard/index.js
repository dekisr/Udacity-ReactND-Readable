import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Hero from '../Hero'
import Post from '../Post'
import { sortPostsComments } from '../../utils/helpers'

class Dashboard extends Component {
  state = {
    sortBy: 'timestamp',
    category: ''
  }
  // componentDidUpdate(prevProps) {
  //   const { category } = this.props
  //   prevProps.category !== category &&
  //     this.setState({
  //       category: category
  //     })
  // }
  render() {
    const { postIds, posts, category } = this.props
    const filteredIds = category
      ? postIds.filter((id) => posts[id].category === this.props.category)
      : postIds
    const { sortBy } = this.state
    console.log('WHAAAOADJISA ', this.state.category)
    return (
      <Fragment>
        <Hero category={this.props.category} />
        {Object.keys(posts).length === 0 ? (
          <h2>there are no posts yet...</h2>
        ) : (
          // (
          //   sortPostsComments(postIds, posts, sortBy).map((id) => (
          //     <Post key={id} id={id} dashboard={true} />
          //   )
          //   )
          // !this.props.category ? (
          //   postIds.map((id) => <Post key={id} id={id} dashboard={true} />)
          // ) : (
          //   postIds
          //     .filter((id) => posts[id].category === this.props.category)
          //     .map((id) => <Post key={id} id={id} dashboard={true} />)
          // )
          filteredIds.length ?
          filteredIds.map((id) => <Post key={id} id={id} dashboard={true} />) :
          <h2>There are no posts in this category</h2>
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

const mapStateToProps = ({ posts }) => {
  return {
    posts,
    postIds: Object.keys(posts)
  }
}

export default connect(mapStateToProps)(Dashboard)
