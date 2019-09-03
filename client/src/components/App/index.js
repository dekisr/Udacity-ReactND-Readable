import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../../actions/shared'
import { handleReloadPost, deletePost } from '../../actions/posts'
import { handleReloadComment, deleteComment } from '../../actions/comments';
import { handleToast } from '../../actions/toast'
import { updateSessionLog } from '../../actions/sessionLog'
import Loading from '../Loading'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import PostForm from '../PostForm'
import Error from '../Error'
import StyledApp from './styles'
import CommentForm from '../CommentForm'
import { socketOn } from '../../utils/helpers'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
    socketOn('new post', ({ id, user }) => {
      dispatch(handleReloadPost(id))
        .then(() => dispatch(updateSessionLog('New post created by', user)))
        .catch((err) => dispatch(handleToast(err.message, 'error')))
    })
    socketOn('edit post', ({ id, user }) => {
      dispatch(handleReloadPost(id))
        .then(() =>
          dispatch(updateSessionLog('A post has been edited by', user))
        )
        .catch((err) => dispatch(handleToast(err.message, 'error')))
    })
    socketOn('delete post', ({ id, user }) => {
      dispatch(deletePost(id))
      dispatch(updateSessionLog('Post DELETED by', user))
    })

    socketOn('new comment', ({ id, user }) => {
      dispatch(handleReloadComment(id))
        .then(() => dispatch(updateSessionLog('New comment posted by', user)))
        .catch((err) => dispatch(handleToast(err.message, 'error')))
    })
    socketOn('edit comment', ({ id, user }) => {
      dispatch(handleReloadComment(id))
        .then(() =>
          dispatch(updateSessionLog('A comment has been edited by', user))
        )
        .catch((err) => dispatch(handleToast(err.message, 'error')))
    })
    socketOn('delete comment', ({ id, user }) => {
      dispatch(deleteComment(id))
      dispatch(updateSessionLog('Comment DELETED by', user))
    })
  }
  render() {
    const {
      loadingData,
      loadingBar,
      toast,
      toastIds,
      showToastWrapper,
      sessionLog
    } = this.props
    return (
      <BrowserRouter>
        {loadingBar && <Loading />}
        <Header />
        {loadingData ? (
          <h1>LOOOADING</h1>
        ) : (
          <StyledApp>
            <h1>{process.env.NODE_ENV}</h1>
            {sessionLog.messages.map((item) => {
              return (
                <p>
                  <b>[{item.timestamp}]</b> {item.message} <b>{item.user}</b>
                </p>
              )
            })}
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/post/id/:id" exact component={PostPage} />
              <Route path="/post/new" exact component={PostForm} />
              <Route path="/post/edit/id/:id" exact component={PostForm} />
              <Route
                path="/comment/edit/id/:id"
                exact
                component={CommentForm}
              />
              <Route
                render={() => (
                  <Error message="404:What<?> 🙀 It looks like this page does not exist." />
                )}
              />
            </Switch>
            <StyledApp.ToastWrapper show={showToastWrapper}>
              {toastIds.map((key) => {
                return (
                  <StyledApp.Toast
                    key={key}
                    isVisible={toast[key].isVisible}
                    alertType={toast[key].alertType}
                  >
                    <p>{toast[key].message}</p>
                  </StyledApp.Toast>
                )
              })}
            </StyledApp.ToastWrapper>
          </StyledApp>
        )}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({
  loading: { loadingData, loadingBar },
  toast,
  sessionLog
}) => {
  const toastIds = Object.keys(toast)
  const showToastWrapper = Object.values(toast).filter(
    (toast) => toast.isVisible === true
  ).length
  return {
    loadingData,
    loadingBar,
    toast,
    toastIds,
    showToastWrapper,
    sessionLog
  }
}

export default connect(mapStateToProps)(App)
