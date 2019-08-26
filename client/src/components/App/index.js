import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../../actions/shared'
import { handleToast } from '../../actions/toast'
import Loading from '../Loading'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import PostForm from '../PostForm'
import Error from '../Error'
import StyledApp from './styles'
import CommentForm from '../CommentForm'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }
  render() {
    const { loadingData, loadingBar, toast, toastIds, showToastWrapper } = this.props
    return (
      <BrowserRouter>
        {loadingBar && <Loading />}
        <Header />
        {loadingData ? (
          <h1>LOOOADING</h1>
        ) : (
          <StyledApp>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/post/id/:id" component={PostPage} />
              <Route path="/post/new" exact component={PostForm} />
              <Route path="/comment/edit/id/:id" component={CommentForm} />
              )}
              <Route render={() => <Error message="what? error" />} />
            </Switch>
            <StyledApp.ToastWrapper show={showToastWrapper}>
              {toastIds.map((key) => {
                return (
                  <StyledApp.Toast
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
