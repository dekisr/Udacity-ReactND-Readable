import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setCurrentUser } from '../../actions/currentUser'
import { handleResetData } from '../../actions/shared'
import { handleToast } from '../../actions/toast'
import { updateSessionLog, setNewStatus } from '../../actions/sessionLog'
import Confirm from '../Confirm'
import { getRandomUser, formatToTime, socketEmit } from '../../utils/helpers'
import StyledHeader from './styles'

class Header extends Component {
  state = {
    stickyBar: false,
    isLogOpen: false,
    isBurgerOpen: false,
    confirmReset: false,
    logIconRef: React.createRef(),
    logRef: React.createRef(),
    confirmRef: React.createRef()
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
  clickOutside = (e) => {
    const {
      isLogOpen,
      logIconRef,
      logRef,
      confirmRef,
      confirmReset
    } = this.state
    isLogOpen &&
      logRef.current &&
      !logRef.current.contains(e.target) &&
      !logIconRef.current.contains(e.target) &&
      this.toggleLog()

    confirmReset &&
      !confirmRef.current.contains(e.target) &&
      this.setState({ confirmReset: false })
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
  handleKeyDown = (e, cb) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault()
      return cb()
    } else return
  }
  handleEsc = (e) => {
    e.keyCode === 27 &&
      this.setState({
        isBurgerOpen: false,
        isLogOpen: false,
        confirmReset: false
      })
  }
  handleReset = () => {
    this.setState({ confirmReset: true })
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
    const { dispatch, currentUser } = this.props
    this.setState({ confirmReset: false, isBurgerOpen: false })
    return dispatch(handleResetData())
      .then(() => {
        socketEmit('reset data', {
          user: currentUser
        })
        dispatch(
          updateSessionLog(
            'You have reset all data to their default values, ',
            currentUser
          )
        )
        dispatch(setNewStatus(true))
      })
      .catch((err) => dispatch(handleToast(err.message, 'error')))
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutside)
    document.addEventListener('keydown', this.handleEsc)
    document.addEventListener('scroll', this.handleScroll, {
      capture: false,
      passive: true
    })
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside)
    document.removeEventListener('keydown', this.handleEsc)
    document.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    const { currentUser, sessionLog } = this.props
    const {
      stickyBar,
      isLogOpen,
      logIconRef,
      logRef,
      confirmRef,
      isBurgerOpen,
      confirmReset
    } = this.state
    return (
      <Fragment>
        <StyledHeader sticky={stickyBar}>
          <StyledHeader.Wrapper>
            <StyledHeader.Alert
              isNew={sessionLog.new}
              user={currentUser}
              onClick={this.toggleLog}
            >
              <i ref={logIconRef}>bug_report</i>
              <span aria-label="Alert Signal" />
            </StyledHeader.Alert>
            <StyledHeader.User user={currentUser}>
              {currentUser}
            </StyledHeader.User>
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
                onClick={this.handleReset}
                onKeyDown={(e) => this.handleKeyDown(e, this.handleReset)}
                role="button"
                tabIndex="0"
                aria-label="Reset Data Button"
              >
                <i>whatshot</i>
                <span>Reset Data</span>
              </StyledHeader.MenuButton>
              <StyledHeader.MenuButton
                onClick={this.handleUser}
                onKeyDown={(e) => this.handleKeyDown(e, this.handleUser)}
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
                  onClick={this.handleReset}
                >
                  <i>whatshot</i>
                  <span>Reset Data</span>
                </li>
              </ul>
            </StyledHeader.Burger>
            <StyledHeader.Log.Arrow aria-label="arrow" open={isLogOpen} />
            <StyledHeader.Log open={isLogOpen}>
              <StyledHeader.Log.Content ref={logRef} open={isLogOpen}>
                <li>
                  <span>Welcome!</span>
                </li>
                {sessionLog.messages.map((item) => {
                  return (
                    <li>
                      {formatToTime(item.timestamp)} - {item.message}
                      <span>{item.user}</span>.
                    </li>
                  )
                })}
              </StyledHeader.Log.Content>
            </StyledHeader.Log>
          </StyledHeader.Wrapper>
        </StyledHeader>
        <Confirm
          confirmRef={confirmRef}
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
