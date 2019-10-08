import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { handleAddPost, handleEditPost } from '../../actions/posts'
import { handleToast } from '../../actions/toast'
import { updateSessionLog, setNewStatus } from '../../actions/sessionLog'
import Error from '../Error'
import {
  sortCategories,
  trimReplace,
  removeSpaces,
  socketEmit
} from '../../utils/helpers'
import { PageTitle } from '../../utils/globalStyles'
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
    toHome: false,
    toPost: false
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
    const { post } = this.props

    let error
    post &&
    post.category === trimReplace(category) &&
    post.title === trimReplace(title) &&
    post.body === trimReplace(body)
      ? (error = '🧟‍♀️ It was supposed to change something in this post.')
      : (error = '')
    this.setState({ error })

    category !== 'none' &&
    title &&
    body &&
    !categoryError &&
    !titleError &&
    !bodyError &&
    !error
      ? this.setState({ isValid: true })
      : this.setState({ isValid: false })
  }
  validateInput = (name, value) => {
    const valueChars = removeSpaces(value).length
    let error = ''
    switch (name) {
      case 'category':
        value === 'none'
          ? (error = '🧟‍♂️ You must select a category')
          : (error = '')
        return this.setState({ categoryError: error })
      case 'title':
        valueChars < 5 || valueChars > 50
          ? (error =
              '🧟‍♂️ Your title must be longer than 5 and up to 50 characters long.')
          : (error = '')
        return this.setState({ titleError: error })
      case 'body':
        valueChars < 41 || valueChars > 600
          ? (error =
              '🧟‍♂️ Your post must be longer than 40 and up to 600 characters long.')
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
    const { category, title, body, isValid } = this.state
    const { dispatch, post, currentUser } = this.props
    if (post) {
      const postData = {
        id: post.id,
        category: category,
        title: trimReplace(title),
        body: trimReplace(body),
        lastEdit: {
          timestamp: Date.now(),
          author: currentUser
        }
      }
      isValid
        ? dispatch(handleEditPost(postData))
            .then(() => this.setState({ toPost: true }))
            .then(() => {
              socketEmit('edit post', {
                id: postData.id,
                user: currentUser
              })
              dispatch(updateSessionLog('You edited a post, ', currentUser))
              dispatch(setNewStatus(true))
              dispatch(
                handleToast('The post was successfully edited', 'success')
              )
            })
            .catch((err) => dispatch(handleToast(err.message, 'error')))
        : this.setState({ error: '🧛🏻‍♂️ What?' })
    } else {
      const postData = {
        id: uuid(),
        timestamp: Date.now(),
        category: category,
        title: trimReplace(title),
        body: trimReplace(body),
        author: currentUser,
        lastEdit: null
      }
      isValid
        ? dispatch(handleAddPost(postData))
            .then(() => {
              this.setState({
                ...initialState,
                toHome: true
              })
            })
            .then(() => {
              socketEmit('new post', {
                id: postData.id,
                user: currentUser
              })
              dispatch(
                updateSessionLog('You just created a new post, ', currentUser)
              )
              dispatch(setNewStatus(true))
              dispatch(
                handleToast('The post was successfully created', 'success')
              )
            })
            .catch((err) => dispatch(handleToast(err.message, 'error')))
        : this.setState({ error: '🧛🏻‍♀️ What?' })
    }
  }
  componentDidUpdate(prevProps) {
    const { post, newPost } = this.props
    prevProps.newPost !== newPost &&
      newPost &&
      this.setState({ ...initialState })
    prevProps.newPost !== newPost &&
      !newPost &&
      post &&
      this.setState({
        category: post.category,
        title: post.title,
        body: post.body
      })
  }
  componentDidMount() {
    const { post } = this.props
    post &&
      this.setState({
        category: post.category,
        title: post.title,
        body: post.body
      })
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
      toHome,
      toPost
    } = this.state
    const { post, newPost } = this.props
    const titleChars = removeSpaces(title).length
    const bodyChars = removeSpaces(body).length
    return toHome ? (
      <Redirect push to="/" />
    ) : toPost && post ? (
      <Redirect push to={`/post/id/${post.id}`} />
    ) : !post && !newPost ? (
      <Error message="🦸🏾‍♀️ It looks like this post does not exist. 🦸🏾‍♂️" />
    ) : (
      <Fragment>
        {post ? <PageTitle>Edit Post</PageTitle> : <PageTitle>New Post</PageTitle>}
        <StyledPostForm
          noValidate
          category={category}
          onSubmit={this.handleSubmit}
        >
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
            // maxLength={600 + (body.length - bodyChars)}
            value={this.state.body}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {body.length > 0 && (
            <StyledPostForm.Options
              invalidChars={bodyChars > 600 || bodyChars < 41}
            >
              <dl>
                <dt>options:</dt>
                <dd>
                  **text**:<b>text</b>
                </dd>
                <dd>
                  __text__:<em>text</em>
                </dd>
                <dd>
                  ~~text~~:<s>text</s>
                </dd>
              </dl>
              <div aria-label="Characters Counter">
                <b>
                  <span>{bodyChars}</span> / 600
                </b>
              </div>
            </StyledPostForm.Options>
          )}
          {bodyError && <span>{bodyError}</span>}
          {error && <span>{error}</span>}
          <button type="submit" disabled={!isValid}>
            {post ? 'Edit post' : 'Create a new post!'}
          </button>
        </StyledPostForm>
      </Fragment>
    )
  }
}

PostForm.propTypes = {
  categories: PropTypes.array,
  newPost: PropTypes.bool,
  post: PropTypes.object,
  currentUser: PropTypes.string
}

const mapStateToProps = ({ categories, posts, currentUser }, ownProps) => {
  const newPost = ownProps.location.pathname === '/post/new'
  const postId = ownProps.match ? ownProps.match.params.id : null
  const post = posts[postId] || null
  return {
    categories: sortCategories(categories),
    newPost,
    post,
    currentUser
  }
}

export default connect(mapStateToProps)(PostForm)
