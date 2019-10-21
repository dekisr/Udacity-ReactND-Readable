import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../../actions/shared'
import { handleReloadPost, deletePost } from '../../actions/posts'
import { handleReloadComment, deleteComment } from '../../actions/comments'
import { handleToast } from '../../actions/toast'
import { updateSessionLog, setNewStatus } from '../../actions/sessionLog'
import Loading from '../Loading'
import Header from '../Header'
import Footer from '../Footer'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import PostForm from '../PostForm'
import Error from '../Error'
import ScrollToTop from '../ScrollToTop'
import GlobalStyle from '../../utils/globalStyles'
import StyledApp from './styles'
import CommentForm from '../CommentForm'
import { socketOn } from '../../utils/helpers'

class App extends Component {
  socketsOn = (sockets) => {
    const { dispatch } = this.props
    socketOn('reset data', ({ user }) => {
      dispatch(
        updateSessionLog(
          'You should reload the app because the data has been reset by ',
          user
        )
      )
      dispatch(setNewStatus(true))
    })
    return sockets.map((item) => {
      return item.name.includes('delete')
        ? socketOn(item.name, ({ id, user }) => {
            dispatch(item.function(id))
            dispatch(updateSessionLog(item.message, user))
            dispatch(setNewStatus(true))
          })
        : socketOn(item.name, ({ id, user }) => {
            dispatch(item.function(id))
              .then(() => dispatch(updateSessionLog(item.message, user)))
              .then(() => dispatch(setNewStatus(true)))
              .catch((err) => dispatch(handleToast(err.message, 'error')))
          })
    })
  }
  sockets = [
    {
      name: 'new post',
      message: 'New post created by ',
      function: handleReloadPost
    },
    {
      name: 'edit post',
      message: 'A post has been edited by ',
      function: handleReloadPost
    },
    {
      name: 'vote post',
      message: 'A post received a vote from ',
      function: handleReloadPost
    },
    {
      name: 'delete post',
      message: 'Post DELETED by ',
      function: deletePost
    },
    {
      name: 'new comment',
      message: 'New comment by ',
      function: handleReloadComment
    },
    {
      name: 'edit comment',
      message: 'A comment has been edited by ',
      function: handleReloadComment
    },
    {
      name: 'vote comment',
      message: 'A comment received a vote from ',
      function: handleReloadComment
    },
    {
      name: 'delete comment',
      message: 'Comment DELETED by ',
      function: deleteComment
    }
  ]

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
    this.socketsOn(this.sockets)
  }
  render() {
    const {
      loadingData,
      loadingBar,
      toast,
      toastIds,
      showToastWrapper
    } = this.props
    return (
      <BrowserRouter>
        <GlobalStyle />
        <ScrollToTop>
          {loadingBar && <Loading />}
          {loadingData ? (
            <Loading initialData={true} />
          ) : (
            <Fragment>
              <Header />
              <StyledApp>
                <Switch>
                  <Route path="/" exact component={Dashboard} />

                  <Route
                    path="/:category(red|blue|yellow)"
                    exact
                    component={Dashboard}
                  />

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
              <Footer />
            </Fragment>
          )}
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ loading: { loadingData, loadingBar }, toast }) => {
  const toastIds = Object.keys(toast)
  const showToastWrapper = Object.values(toast).filter(
    (toast) => toast.isVisible === true
  ).length
  return {
    loadingData,
    loadingBar,
    toast,
    toastIds,
    showToastWrapper
  }
}

export default connect(mapStateToProps)(App)
