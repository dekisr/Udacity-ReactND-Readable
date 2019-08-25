import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../../actions/shared'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import PostForm from '../PostForm'
import Error from '../Error'
import StyledApp from './styles'
import CommentForm from '../CommentForm'
import { handleToast } from '../../actions/toast'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }
  render() {
    const { loadingData, toast } = this.props
    return (
      <BrowserRouter>
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
            <StyledApp.Toast
              isVisible={toast.isVisible}
              alertType={toast.alertType}
            >
              {this.props.toast.message}
            </StyledApp.Toast>
          </StyledApp>
        )}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ loading: { loadingData }, toast }) => {
  return {
    loadingData,
    toast
  }
}

export default connect(mapStateToProps)(App)
