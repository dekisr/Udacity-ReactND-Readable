import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewPost } from '../../actions/posts'
import { sortCategories } from '../../utils/helpers'
import uuid from 'uuid'
import StyledNewPost from './styles'


class NewPost extends Component {
  state = {
    title: '',
    category: 'none',
    body: ''
  }
  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('teste submit')
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.props.currentUser,
      category: this.state.category
    }
    return this.props.dispatch(handleNewPost(post))
  }
  render() {
    return (
      <StyledNewPost>
        <h1>New Post</h1>
        <StyledNewPost.Form onSubmit={this.handleSubmit}>
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            <option disabled value="none">
              Select a category
            </option>
            {this.props.categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <StyledNewPost.TextArea
            name="body"
            placeholder="Body"
            maxLength="600"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <button type="submit">Create a new post!</button>
        </StyledNewPost.Form>
      </StyledNewPost>
    )
  }
}

const mapStateToProps = ({ currentUser, categories }) => {
  return {
    currentUser,
    categories: sortCategories(categories)
  }
}

export default connect(mapStateToProps)(NewPost)
