import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNewStatus } from '../../actions/sessionLog'
import { setCurrentUser } from '../../actions/currentUser'
import { handleResetData } from '../../actions/shared'
import { handleToast } from '../../actions/toast'
import { getRandomUser } from '../../utils/helpers'
import StyledHeader from './styles'

class Header extends Component {
  state = {
    isLogOpen: false,
    logIconRef: React.createRef(),
    logRef: React.createRef(),
    isBurgerOpen: false
  }
  toggleLog = () => {
    const { dispatch } = this.props
    dispatch(setNewStatus(false))
    this.setState({
      isLogOpen: !this.state.isLogOpen
    })
  }
  clickOutsideLog = (e) => {
    const { isLogOpen, logIconRef, logRef } = this.state
    if (
      isLogOpen &&
      logRef.current &&
      !logRef.current.contains(e.target) &&
      !logIconRef.current.contains(e.target)
    ) {
      return this.toggleLog()
    }
  }
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
  toggleBurger = () => {
    this.setState({
      isBurgerOpen: !this.state.isBurgerOpen
    })
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideLog)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideLog)
  }
  render() {
    const { currentUser } = this.props
    const { isLogOpen, logIconRef, logRef, isBurgerOpen } = this.state
    return (
      <StyledHeader>
        <StyledHeader.Wrapper>
          <StyledHeader.Alert>
            <i onClick={this.toggleLog} ref={logIconRef}>
              bug_report
            </i>
          </StyledHeader.Alert>
          <StyledHeader.User>{currentUser}</StyledHeader.User>
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
          <StyledHeader.BurgerButton onClick={this.toggleBurger}>
            <i>{isBurgerOpen ? 'close' : 'menu'}</i>
          </StyledHeader.BurgerButton>
          <StyledHeader.Burger isOpen={this.state.isBurgerOpen}>
            <ul>TESTE</ul>
            <ul>TESTE</ul>
            <ul>TESTE</ul>
            <ul>TESTE</ul>
          </StyledHeader.Burger>
          <StyledHeader.Log open={isLogOpen}>
            <StyledHeader.Log.Content ref={logRef}>s</StyledHeader.Log.Content>
          </StyledHeader.Log>
        </StyledHeader.Wrapper>
      </StyledHeader>
    )
  }
}

Header.propTypes = {
  currentUser: PropTypes.string
}

const mapStateToProps = ({ currentUser, sessionLog }) => {
  return {
    currentUser,
    sessionLog
  }
}

export default connect(mapStateToProps)(Header)
