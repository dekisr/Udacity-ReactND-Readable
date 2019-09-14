import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setNewStatus } from '../../actions/sessionLog'
import { setCurrentUser } from '../../actions/currentUser'
import { handleResetData } from '../../actions/shared'
import { handleToast } from '../../actions/toast'
import Confirm from '../Confirm'
import { getRandomUser } from '../../utils/helpers'
import StyledHeader from './styles'

class Header extends Component {
  state = {
    stickyBar: false,
    isLogOpen: false,
    isBurgerOpen: false,
    logIconRef: React.createRef(),
    logRef: React.createRef(),
    confirmReset: false
  }
  toggleLog = () => {
    const { dispatch } = this.props
    this.setState(
      {
        isBurgerOpen: false,
        isLogOpen: !this.state.isLogOpen
      },
      () => dispatch(setNewStatus(false))
    )
  }
  clickOutsideLog = (e) => {
    const { isLogOpen, logIconRef, logRef } = this.state
    isLogOpen &&
      logRef.current &&
      !logRef.current.contains(e.target) &&
      !logIconRef.current.contains(e.target) &&
      this.toggleLog()
  }
  toggleBurger = () => {
    this.setState({
      isBurgerOpen: !this.state.isBurgerOpen
    })
  }
  burgerLink = (path) => {
    this.props.history.push(path)
    this.setState({
      isBurgerOpen: false
    })
  }
  handleScroll = () => {
    const currentPosition = window.pageYOffset
    const stickyBar = currentPosition > 50
    this.setState({
      isBurgerOpen: false,
      stickyBar
    })
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
    this.setState({ confirmReset: false, isBurgerOpen: false })
    return dispatch(handleResetData()).catch((err) =>
      dispatch(handleToast(err.message, 'error'))
    )
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideLog)
    document.addEventListener('scroll', this.handleScroll, {
      capture: false,
      passive: true
    })
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideLog)
    document.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    const { currentUser } = this.props
    const {
      stickyBar,
      isLogOpen,
      logIconRef,
      logRef,
      isBurgerOpen,
      confirmReset
    } = this.state
    return (
      <Fragment>
        <StyledHeader sticky={stickyBar}>
          <StyledHeader.Wrapper>
            <StyledHeader.Alert>
              <i onClick={this.toggleLog} ref={logIconRef}>
                bug_report
              </i>
            </StyledHeader.Alert>
            <StyledHeader.User>{currentUser}</StyledHeader.User>
            <StyledHeader.Menu>
              <StyledHeader.MenuItem
                to="/"
                exact
                activeClassName="routerActive"
              >
                <i>home</i>
                <span>Home</span>
              </StyledHeader.MenuItem>
              <StyledHeader.MenuButton
                onClick={() => this.setState({ confirmReset: true })}
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
            <StyledHeader.Burger isOpen={isBurgerOpen}>
              <ul>
                <li
                  role="button"
                  aria-label="Home Button"
                  tabIndex="0"
                  onClick={() => this.burgerLink('/')}
                >
                  <i>home</i>
                  <span>Home</span>
                </li>
                <li
                  role="button"
                  aria-label="New Post Button"
                  tabIndex="0"
                  onClick={() => this.burgerLink('/post/new')}
                >
                  <i>post_add</i>
                  <span>New Post</span>
                </li>
                <li
                  role="button"
                  aria-label="Change User Button"
                  tabIndex="0"
                  onClick={this.handleUser}
                >
                  <i>refresh</i>
                  <span>Change User</span>
                </li>
                <li
                  role="button"
                  aria-label="Reset Data Button"
                  tabIndex="0"
                  onClick={() => this.setState({ confirmReset: true })}
                >
                  <i>whatshot</i>
                  <span>Reset Data</span>
                </li>
              </ul>
            </StyledHeader.Burger>
            <StyledHeader.Log open={isLogOpen}>
              <StyledHeader.Log.Content ref={logRef} open={isLogOpen}>
                s
              </StyledHeader.Log.Content>
            </StyledHeader.Log>
          </StyledHeader.Wrapper>
        </StyledHeader>
        <Confirm
          post
          active={confirmReset}
          resetData={true}
          message="Are you sure to reset all to the default data?"
          confirm={this.resetData}
          cancel={() => this.setState({ confirmReset: false })}
        />
      </Fragment>
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

export default withRouter(connect(mapStateToProps)(Header))
