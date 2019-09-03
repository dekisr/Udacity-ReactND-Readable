import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledError from './styles'

const Error = ({ message, history }) => {
  return (
    <StyledError>
      <div>
        <h1>{message}</h1>
        <button onClick={() => history.push('/')}>Back to Home</button>
      </div>
    </StyledError>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default withRouter(Error)
