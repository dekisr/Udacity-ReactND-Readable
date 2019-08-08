import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import { getRandomUser } from '../../utils/helpers'
import StyledHeader from './styles'

class Header extends Component {
  handleUser = () => {
    const { dispatch, currentUser } = this.props
    let userName = getRandomUser()
    while (currentUser === userName) {
      userName = getRandomUser()
    }
    return dispatch(setCurrentUser(userName))
  }

  render() {
    const { currentUser } = this.props
    return (
      <StyledHeader>
        <StyledHeader.Logo>READABLE</StyledHeader.Logo>
        <StyledHeader.Menu>
          {/* <StyledHeader.MenuItem>{uuid.v1()}</StyledHeader.MenuItem> */}
          <StyledHeader.MenuItem to="/">Home</StyledHeader.MenuItem>
          <StyledHeader.MenuButton onClick={this.handleUser}>
            Change User
          </StyledHeader.MenuButton>
          <StyledHeader.MenuItem to="/post/new">New post</StyledHeader.MenuItem>
        </StyledHeader.Menu>
        <div>{currentUser}</div>
      </StyledHeader>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  }
}

export default connect(mapStateToProps)(Header)
