import React, { Component } from 'react'
import { connect } from 'react-redux'

class Category extends Component {
  render() {
    const { category } = this.props
    return <span>[{category.name}]</span>
  }
}

const mapStateToProps = ({ categories }, { name }) => {
  const category = categories[name]
  return {
    category
  }
}

export default connect(mapStateToProps)(Category)
