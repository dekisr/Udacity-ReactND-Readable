import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.header`
  width: 100%;
  height: 5rem;
  margin: 0;
  border-bottom: 0.3rem solid snow;
  color: white;
`
const Log = styled.div`
  display: none;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  background-color: hsla(5, 100%, 50%, 0.5);
`
const Content = styled.div`
  z-index: 1900;
  position: relative;
  display: grid;
  width: 500px;
  height: 300px;
  background-color: yellow;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.5rem;
`
const Logo = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: snow;
  /* color: ${({ color }) => color}; */
  /* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%); */
`
const Menu = styled.nav`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: right;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-gap: 0.5rem;
  color: palegreen;
  @media (min-width: 769px) {
    grid-gap: 0.25rem;
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
    @media (min-width: 769px) {
      display: block;
    }
  }
  @media (min-width: 769px) {
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
    @media (min-width: 769px) {
      display: block;
    }
  }
  @media (min-width: 769px) {
    grid-template-columns: auto auto;
  }
`

StyledHeader.Log = Log
StyledHeader.Log.Content = Content
StyledHeader.Wrapper = Wrapper
StyledHeader.Logo = Logo
StyledHeader.Menu = Menu
StyledHeader.MenuItem = MenuItem
StyledHeader.MenuButton = MenuButton

export default StyledHeader
