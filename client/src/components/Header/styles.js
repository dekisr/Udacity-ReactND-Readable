import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.header`
  width: 100%;
  margin: 0;
  border-bottom: 0.3rem solid snow;
  color: white;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 0.5rem;
`
const Logo = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 2rem;
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
  grid-gap: 1rem;
  color: palegreen;
`
const MenuItem = styled(NavLink)`
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: wheat;
  border: ${({ special }) => (special ? '2px solid snow' : 'none')};
  &.routerActive {
    color: indianred;
  }
  & span {
    position: relative;
    bottom: -1px;
    margin-left: 0.1rem;
  }
`
const MenuButton = styled.button`
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: wheat;
  background: none;
  &:hover {
    cursor: pointer;
  }
`

StyledHeader.Wrapper = Wrapper
StyledHeader.Logo = Logo
StyledHeader.Menu = Menu
StyledHeader.MenuItem = MenuItem
StyledHeader.MenuButton = MenuButton

export default StyledHeader
