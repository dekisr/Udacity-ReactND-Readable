import React from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import StyledHeader from './styles'

const Header = ({ currentUser }) => {
  return (
    <StyledHeader>
      <StyledHeader.Logo>READABLE</StyledHeader.Logo>
      <StyledHeader.Menu>
        {/* <StyledHeader.MenuItem>{uuid.v1()}</StyledHeader.MenuItem> */}
        <StyledHeader.MenuItem>Home</StyledHeader.MenuItem>
        <StyledHeader.MenuItem>Change User</StyledHeader.MenuItem>
        <StyledHeader.MenuItem>New post</StyledHeader.MenuItem>
      </StyledHeader.Menu>
      <div>{currentUser}</div>
    </StyledHeader>
  )
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  }
}

export default connect(mapStateToProps)(Header)
