import React from 'react'
import StyledLoading from './styles'

const Loading = (props) => {
  return (
    <StyledLoading>
      {props.data && <h1>Loading...</h1>}
    </StyledLoading>
  )
}

export default Loading
