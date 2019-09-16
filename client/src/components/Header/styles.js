import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { colors } from '../../utils/globalStyles'

const navOpacity = css`
  @keyframes navFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: 0.5s navFade linear;
`
const StyledHeader = styled.header`
  position: ${({ sticky }) => (sticky ? 'sticky' : 'relative')};
  top: 0;
  z-index: 125;
  width: 100%;
  margin: 0;
  border-bottom: 0.3rem solid snow;
  ${({ sticky }) => (sticky ? navOpacity : 'animation: none')};
  transition: all 2s linear;
  background-color: ${colors.brown.one};
`
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto auto 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 0.5rem;
`
const Alert = styled.button`
  position: relative;
  top: 0.125rem;
  display: block;
  margin: 0.25rem;
  padding: 0;
  border: none;
  color: snow;
  background: none;
  & i {
    position: relative;
    font-size: 2rem;
  }
  & span {
    position: absolute;
    top: -0.1rem;
    left: -0.1rem;
    display: ${({ isNew }) => (isNew ? 'block' : 'none')};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: red;
    pointer-events: none;
  }
  &:hover {
    cursor: pointer;
    color: ${({ user }) => user};
  }
`
const User = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.125rem;
  font-weight: 700;
  color: snow;
  @media (min-width: 601px) {
    font-size: 1.5rem;
  }
  &:hover {
    cursor: crosshair;
    color: ${({ user }) => user};
  }
`
const Menu = styled.nav`
  justify-self: right;
  display: none;
  grid-template-columns: auto auto auto auto;
  justify-content: right;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-gap: 0.25rem;
  & i {
    font-size: 1.25rem;
    @media (min-width: 601px) {
      font-size: 1.5rem;
    }
  }
  @media (min-width: 411px) {
    display: grid;
  }
  @media (min-width: 601px) {
    grid-gap: 0.5rem;
  }
`
const MenuItem = styled(NavLink)`
  display: grid;
  grid-template-columns: auto;
  align-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  color: snow;
  border: ${({ special }) => (special ? '0.125rem solid snow' : 'none')};
  &.routerActive {
    pointer-events: none;
    color: salmon;
    border-color: ${({ special }) => (special ? 'salmon' : 'none')};
  }
  &:hover,
  &:focus {
    color: salmon;
    border-color: ${({ special }) => (special ? 'salmon' : 'none')};
  }
  & span {
    display: none;
    margin-left: 0.2rem;
    @media (min-width: 761px) {
      display: block;
    }
  }
  @media (min-width: 761px) {
    grid-template-columns: auto auto;
  }
`
const MenuButton = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-content: center;
  align-items: center;
  padding: 0.5rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  color: snow;
  background: none;
  &:hover,
  &:focus {
    color: salmon;
    cursor: pointer;
  }
  & span {
    display: none;
    margin-left: 0.2rem;
    @media (min-width: 761px) {
      display: block;
    }
  }
  @media (min-width: 761px) {
    grid-template-columns: auto auto;
  }
`
const BurgerButton = styled.button`
  justify-self: right;
  display: block;
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  color: ${colors.brown.two};
  background-color: snow;
  &:hover,
  &:focus {
    color: salmon;
    cursor: pointer;
  }
  @media (min-width: 411px) {
    display: none;
  }
`
const Burger = styled.nav`
  position: absolute;
  top: 5.3rem;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? 'calc(100vh - 5.3rem)' : '0')};
  font-weight: 700;
  transition: height 0.4s ease;
  color: ${colors.brown.two};
  background-color: snow;
  & ul {
    display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
    grid-template-columns: 1fr;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 0.5rem;
    min-width: 70%;
    list-style: none;
  }
  & ul li {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 0.25rem;
    width: 100%;
    padding: 0.5rem;
    border: 0.0625rem solid ${colors.brown.two};
    transition: background 0.8s ease;
    :hover,
    :focus {
      color: snow;
      background-color: ${colors.brown.two};
      cursor: pointer;
    }
  }
  @media (min-width: 411px) {
    display: none;
  }
`
const Arrow = styled.div`
  position: absolute;
  top: 4rem;
  left: 1rem;
  display: ${({ open }) => (open ? 'block' : 'none')};
  width: 1rem;
  height: 1rem;
  transform: rotate(45deg);
  background-color: snow;
`
const Log = styled.div`
  position: absolute;
  top: 4.5rem;
  left: 0.5rem;
  display: ${({ open }) => (open ? 'block' : 'none')};
  grid-template-columns: 1fr;
  min-width: 250px;
  max-width: 320px;
  max-height: 40vh;
  margin: 0 auto;
  overflow-y: auto;
  box-shadow: 0.1rem 0.3rem 0.2rem hsla(0, 0%, 0%, 0.3);
  background-color: snow;
  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: snow;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.brown.five};
  }
  scrollbar-color: ${colors.brown.five} snow;
`
const Content = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 0.8rem;
  padding: 1rem;
  list-style: none;
  color: ${colors.brown.two};
  & li {
    font-size: 0.75rem;
  }
  & li span {
    font-weight: 700;
  }
`

StyledHeader.Wrapper = Wrapper
StyledHeader.Alert = Alert
StyledHeader.User = User
StyledHeader.Menu = Menu
StyledHeader.MenuItem = MenuItem
StyledHeader.MenuButton = MenuButton
StyledHeader.BurgerButton = BurgerButton
StyledHeader.Burger = Burger
StyledHeader.Log = Log
StyledHeader.Log.Arrow = Arrow
StyledHeader.Log.Content = Content

export default StyledHeader
