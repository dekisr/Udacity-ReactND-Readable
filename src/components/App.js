import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { initialTest } from '../actions/shared'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(initialTest())
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">READABLE</header>
        <Dashboard />
      </div>
    )
  }
}

export default connect()(App)
