import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewPost } from '../../actions/posts'
import { sortCategories } from '../../utils/helpers'
import uuid from 'uuid'
import StyledNewPost from './styles'

const initialState = {
  category: 'none',
  title: '',
  body: '',
  categoryError: '',
  titleError: '',
  bodyError: '',
  valid: false
}

class NewPost extends Component {
  state = { ...initialState }

  validateForm = () => {
    const {
      category, title, body,
      categoryError, titleError, bodyError
    } = this.state

    category !== 'none' && title && body &&
    !categoryError && !titleError && !bodyError
      ? this.setState({ valid: true })
      : this.setState({ valid: false })
  }
  validateInput = (name, value) => {
    let error = ''
    switch (name) {
      case 'category':
        value === 'none' ? (error = 'You must select a category') : (error = '')
        return this.setState({ categoryError: error })
      case 'title':
        value.length < 5 ? (error = 'Title MUST have 5 chars') : (error = '')
        return this.setState({ titleError: error })
      case 'body':
        value.length < 10 ? (error = 'Write more') : (error = '')
        return this.setState({ bodyError: error })
      default:
        return this.setState({ error })
    }
  }
  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value }, this.validateForm)
    this.validateInput(name, value.trim().replace(/\s+/g, ' '))
  }
  handleBlur = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.validateInput(name, value.trim().replace(/\s+/g, ' '))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.props.currentUser,
      category: this.state.category
    }
    this.props.dispatch(handleNewPost(post))
    this.setState({...initialState})
  }
  render() {
    const { categoryError, titleError, bodyError, valid } = this.state
    return (
      <StyledNewPost>
        <h1>New Post</h1>
        <StyledNewPost.Form noValidate onSubmit={this.handleSubmit}>
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          >
            <option disabled value="none">
              Select a category
            </option>
            {this.props.categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {categoryError && <div>{categoryError}</div>}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {titleError && <div>{titleError}</div>}
          <StyledNewPost.TextArea
            name="body"
            placeholder="Body"
            maxLength="600"
            value={this.state.body}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {bodyError && <div>{bodyError}</div>}
          <button type="submit" disabled={!valid}>
            Create a new post!
          </button>
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
