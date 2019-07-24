import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../../actions/shared'
import Header from '../Header'
import Dashboard from '../Dashboard'
import PostPage from '../PostPage'
import NewPost from '../NewPost'
import Error from '../Error'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/post/id/:id" component={PostPage} />
          <Route path="/post/new" exact component={NewPost} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect()(App)
