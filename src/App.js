import React from 'react'
import './App.css'
import { getTest } from './utils/DataAPI'

class App extends React.Component {
  componentDidMount() {
    getTest()
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

export default App
