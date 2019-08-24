import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../../actions/shared'
import { isLoadingData } from '../../actions/loading'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import PostForm from '../PostForm'
import Error from '../Error'
import StyledApp from './styles'
import CommentForm from '../CommentForm'

class App extends Component {
  state = {
    toast: {
      isVisible: false,
      message: ''
    }
  }
  toastTest = (message) => {
    this.setState({
      toast: {
        isVisible: true,
        message: message
      }
    })
    setTimeout(() => {
      this.setState({
        toast: {
          isVisible: false,
          message: ''
        }
      })
    }, 3000)
    console.log(message)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData()).catch((err) => this.toastTest(err.message))
  }
  render() {
    const { loadingData } = this.props
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
              <Route
                path="/comment/edit/id/:id"
                render={(props) => (
                  <CommentForm {...props} toast={this.toastTest} />
                )}
              />
              <Route render={() => <Error message="what? error" />} />
            </Switch>
            <button onClick={() => this.toastTest('EITA')}>TESTEE</button>
            <StyledApp.Toast isVisible={this.state.toast.isVisible}>
              {this.state.toast.message}
            </StyledApp.Toast>
          </StyledApp>
        )}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ loading: { loadingData } }) => {
  return {
    loadingData
  }
}

export default connect(mapStateToProps)(App)
