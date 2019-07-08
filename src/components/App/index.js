import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../../actions/shared'
import Dashboard from '../Dashboard'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">READABLE</header>
        <Dashboard />
      </div>
    )
  }
}

export default connect()(App)
