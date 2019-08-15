import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StyledError from './styles'

class Error extends Component {
  render() {
    return (
      <StyledError>
        <span>{this.props.message}</span>
      </StyledError>
    )
  }
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error
