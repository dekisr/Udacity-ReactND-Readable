import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { colors } from '../../utils/globalStyles'

const StyledHeader = styled.header`
  width: 100%;
  margin: 0;
  border-bottom: 0.3rem solid snow;
  color: white;
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
const Alert = styled.div`
  display: block;
  & i {
    position: relative;
    top: 0.0625rem;
    font-size: 2rem;
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
  color: palegreen;
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
    color: lightsalmon;
  }
  &:hover,
  &:focus {
    color: salmon;
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
  z-index: 9999;
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
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  z-index: 9000;
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  transition: all 0.4s ease;
  background-color: ${colors.yellow.four};
  & ul {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`
const Log = styled.div`
  position: absolute;
  top: 4rem;
  display: ${({ open }) => (open ? 'block' : 'none')};
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  background-color: hsla(5, 100%, 50%, 0.5);
`
const Content = styled.div`
  z-index: 1900;
  position: relative;
  display: grid;
  width: 100%;
  min-width: 300px;
  height: 50vh;
  background-color: yellow;
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
StyledHeader.Log.Content = Content

export default StyledHeader
