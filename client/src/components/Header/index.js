import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCurrentUser } from '../../actions/currentUser'
import { handleResetData } from '../../actions/shared';
import { handleToast } from '../../actions/toast';
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

  resetData = () => {
    const { dispatch} = this.props
    dispatch(handleResetData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <StyledHeader>
        <StyledHeader.Logo>READABLE</StyledHeader.Logo>
        <StyledHeader.Menu>
          {/* <StyledHeader.MenuItem>{uuid.v1()}</StyledHeader.MenuItem> */}
          <StyledHeader.MenuItem to="/">Home</StyledHeader.MenuItem>
          <StyledHeader.MenuButton onClick={this.resetData}>
            Reset Data
          </StyledHeader.MenuButton>
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

Header.propTypes = {
  currentUser: PropTypes.string
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  }
}

export default connect(mapStateToProps)(Header)
