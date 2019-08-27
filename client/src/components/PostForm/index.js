import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddPost } from '../../actions/posts'
import { handleToast } from '../../actions/toast'
import { sortCategories, trimReplace, removeSpaces } from '../../utils/helpers'
import StyledPostForm from './styles'

const initialState = {
  category: 'none',
  title: '',
  body: '',
  categoryError: '',
  titleError: '',
  bodyError: '',
  error: '',
  isValid: false
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
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false })
  }
  validateInput = (name, value) => {
    let error = ''
    const valueChars = removeSpaces(value).length
    switch (name) {
      case 'category':
        value === 'none'
          ? (error = '🧟‍♀️ You must select a category')
          : (error = '')
        return this.setState({ categoryError: error })
      case 'title':
        valueChars < 5 || valueChars > 50
          ? (error =
              '🧟‍♂️ Your title be longer than 5 and up to 50 characters long.')
          : (error = '')
        return this.setState({ titleError: error })
      case 'body':
        valueChars < 41 || valueChars > 600
          ? (error =
              '🧟‍♀️ Your post must be longer than 40 and up to 600 characters long.')
          : (error = '')
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
    const { title, body, category, isValid } = this.state
    const { dispatch, currentUser } = this.props
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: trimReplace(title),
      body: trimReplace(body),
      author: currentUser,
      category: category
    }
    isValid
      ? dispatch(handleAddPost(post))
          .then(() => {
            this.setState({
              ...initialState,
              toHome: true
            })
          })
          .then(() => {
            dispatch(
              handleToast('The post was successfully created', 'success')
            )
          })
          .catch((err) => dispatch(handleToast(err.message, 'error')))
      : this.setState({ error: '🧛🏻‍♀️ What?' })
  }
  render() {
    const {
      category,
      title,
      body,
      categoryError,
      titleError,
      bodyError,
      isValid,
      error,
      toHome
    } = this.state
    const titleChars = removeSpaces(title).length
    const bodyChars = removeSpaces(body).length
    return toHome ? (
      <Redirect to="/" />
    ) : (
      <Fragment>
        <h1>New Post</h1>
        <StyledPostForm noValidate category={category} onSubmit={this.handleSubmit}>
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
          {categoryError && <span>{categoryError}</span>}
          <input
            type="text"
            name="title"
            placeholder="Title"
            maxLength={50 + (title.length - titleChars)}
            value={this.state.title}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {titleError && <span>{titleError}</span>}
          <textarea
            name="body"
            placeholder="Body"
            maxLength={600 + (body.length - bodyChars)}
            value={this.state.body}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {body.length > 0 && (
            <StyledPostForm.Options>
              <dl>
                <dt>options:</dt>
                <dd>
                  **text**:<b>text</b>
                </dd>
                <dd>
                  __text__:<i>text</i>
                </dd>
                <dd>
                  ~~text~~:<s>text</s>
                </dd>
              </dl>
              <span>
                <b>{bodyChars} / 600</b>
              </span>
            </StyledPostForm.Options>
          )}
          {bodyError && <span>{bodyError}</span>}
          {error && <span>{error}</span>}
          <button type="submit" disabled={!isValid}>
            Create a new post!
          </button>
        </StyledPostForm>
      </Fragment>
    )
  }
}

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  currentUser: PropTypes.string
}

const mapStateToProps = ({ categories, currentUser }) => {
  return {
    categories: sortCategories(categories),
    currentUser
  }
}

export default connect(mapStateToProps)(PostForm)
