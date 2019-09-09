import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledError from './styles'

const Error = ({ message, hideButton, history }) => {
  return (
    <StyledError>
      <div>
        <h1>{message}</h1>
        {hideButton ? (
          '😿'
        ) : (
          <button onClick={() => history.push('/')}>Back to Home</button>
        )}
      </div>
    </StyledError>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  hideButton: PropTypes.bool
}

export default withRouter(Error)
