import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Categories from './Categories'

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
          <Categories key={name} name={name} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    postIds: Object.keys(posts).sort(
      (a, b) => posts[b].timestamp - posts[a].timestamp
    ),
    categoriesNames: Object.keys(categories).sort((a, b) => {
      const nameA = categories[a].name.toUpperCase()
      const nameB = categories[b].name.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
  }
}

export default connect(mapStateToProps)(Dashboard)
