import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCurrentUser } from '../../actions/currentUser'
import { handleResetData } from '../../actions/shared'
import { handleToast } from '../../actions/toast'
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
    const { dispatch } = this.props
    dispatch(handleResetData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <StyledHeader>
        <StyledHeader.Wrapper>
          <StyledHeader.Logo color={currentUser}>
            {currentUser}
          </StyledHeader.Logo>
          <StyledHeader.Menu>
            <StyledHeader.MenuItem to="/" exact activeClassName="routerActive">
              <i>home</i>
              <span>Home</span>
            </StyledHeader.MenuItem>
            <StyledHeader.MenuButton
              onClick={this.resetData}
              role="button"
              tabIndex="0"
              aria-label="Reset Data Button"
            >
              <i>whatshot</i>
              <span>Reset Data</span>
            </StyledHeader.MenuButton>
            <StyledHeader.MenuButton
              onClick={this.handleUser}
              role="button"
              tabIndex="0"
              aria-label="Change User Button"
            >
              <i>refresh</i>
              <span>Change User</span>
            </StyledHeader.MenuButton>
            <StyledHeader.MenuItem
              to="/post/new"
              special="true"
              activeClassName="routerActive"
            >
              <i>post_add</i>
              <span>New post</span>
            </StyledHeader.MenuItem>
          </StyledHeader.Menu>
        </StyledHeader.Wrapper>
        <StyledHeader.Log>
          <StyledHeader.Log.Content>s</StyledHeader.Log.Content>
        </StyledHeader.Log>
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
