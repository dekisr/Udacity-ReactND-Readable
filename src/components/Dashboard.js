import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return(
      <div>
        <p>DASH and BOARD</p>
      </div>
    )
  }
}

export default connect()(Dashboard)
