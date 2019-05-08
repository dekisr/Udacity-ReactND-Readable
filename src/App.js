import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { initialTest } from './actions/shared'
import { getTest } from './utils/DataAPI'

class App extends React.Component {
  componentDidMount() {
    // getTest()
    this.props.dispatch(initialTest())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>READABLE PROJECT!</p>
        </header>
      </div>
    )
  }
}

export default connect()(App)
