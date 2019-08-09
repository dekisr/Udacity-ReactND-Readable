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

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <StyledApp>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/post/id/:id" component={PostPage} />
            <Route path="/post/new" exact component={PostForm} />
            <Route render={() => <Error message="what?" />} />
          </Switch>
        </StyledApp>
      </BrowserRouter>
    )
  }
}

export default connect()(App)
