import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../../actions/shared'
import Header from '../Header'
import Dashboard from '../Dashboard'
import NewPost from '../NewPost'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Fragment>
        <Header />
        <NewPost />
        <Dashboard />
      </Fragment>
    )
  }
}

export default connect()(App)
