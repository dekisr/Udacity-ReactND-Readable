import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from  '../Post'

class PostPage extends Component {
  render() {
    return (
      <div>
        <Post id={this.props.id} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts }, { match: { params } }) => {
  const id = params.id
  return {
    post: posts[id],
    id
  }
}

export default connect(mapStateToProps)(PostPage)
