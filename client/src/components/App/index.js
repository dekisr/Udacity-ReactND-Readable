import React, { Component, Fragment } from 'react'
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

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
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
              <Route path="/comment/edit/id/:id" component={CommentForm} />
              )}
              <Route render={() => <Error message="what? error" />} />
            </Switch>
            <StyledApp.Toast isVisible={this.props.toast.isVisible}>
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
