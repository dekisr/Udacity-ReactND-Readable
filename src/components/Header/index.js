import React from 'react'
import uuid from 'uuid'
import StyledHeader from './styles';

const Header = (props) => {
  return (
    <StyledHeader>READABLE / {uuid.v1()}</StyledHeader>
  )
}

export default Header
