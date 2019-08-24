import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddPost } from '../../actions/posts'
import { sortCategories, trimReplace } from '../../utils/helpers'
import StyledPostForm from './styles'

const initialState = {
  category: 'none',
  title: '',
  body: '',
  categoryError: '',
  titleError: '',
  bodyError: '',
  valid: false
}

class PostForm extends Component {
  state = {
    ...initialState,
    toHome: false
  }

  validateForm = () => {
    const {
      category,
      title,
      body,
      categoryError,
      titleError,
      bodyError
    } = this.state

    category !== 'none' &&
    title &&
    body &&
    !categoryError &&
    !titleError &&
    !bodyError
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
    this.validateInput(name, trimReplace(value))
  }
  handleBlur = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.validateInput(name, trimReplace(value))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { title, body, category } = this.state
    const { dispatch, currentUser } = this.props
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: title,
      body: body.trim().replace(/\s+/g, ' '),
      author: currentUser,
      category: category
    }
    dispatch(handleAddPost(post)).then(() => {
      this.setState({
        ...initialState,
        toHome: true
      }, () => {
        this.props.toast('VAAAAI')
      })
    })
  }
  render() {
    const { categoryError, titleError, bodyError, valid, toHome } = this.state
    return toHome ? (
      <Redirect to="/" />
    ) : (
      <StyledPostForm>
        <h1>New Post</h1>
        <StyledPostForm.Form noValidate onSubmit={this.handleSubmit}>
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
              <option key={category} value={category}>
                {category}
              </option>
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
          <textarea
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
        </StyledPostForm.Form>
      </StyledPostForm>
    )
  }
}

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired
}

const mapStateToProps = ({ categories, currentUser }) => {
  return {
    categories: sortCategories(categories),
    currentUser: currentUser
  }
}

export default connect(mapStateToProps)(PostForm)
