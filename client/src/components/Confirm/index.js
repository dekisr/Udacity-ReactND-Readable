import React from 'react'
import PropTypes from 'prop-types'
import StyledConfirm from './styles'

const Confirm = ({ active, message, confirm, cancel }) => {
  return (
    <StyledConfirm show={active}>
      <StyledConfirm.Content>
        <div>
          <h1>{message}</h1>
          <StyledConfirm.Content.Button onClick={confirm}>
            Yes, I am sure!
          </StyledConfirm.Content.Button>
          <StyledConfirm.Content.Button cancel onClick={cancel}>
            Cancel
          </StyledConfirm.Content.Button>
        </div>
      </StyledConfirm.Content>
    </StyledConfirm>
  )
}

Confirm.propTypes = {
  active: PropTypes.bool.isRequired,
  message: PropTypes.string,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default Confirm
