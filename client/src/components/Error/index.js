import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import StyledError from './styles'

const Error = (props) => {
  return (
    <StyledError>
      <div>
        <h1>{props.message}</h1>
        <button onClick={() => props.history.push('/')}>Back to Home</button>
      </div>
    </StyledError>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default withRouter(Error)
