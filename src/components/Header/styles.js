import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  justify-content: stretch;
  min-height: 10vh;
  background-color: ${colors.red.three};
  color: white;
`
const Logo = styled.div`
  align-self: center;
  color: wheat;
  font-size: 2rem;
  font-weight: bold;
`
const Menu = styled.nav`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: auto;
  align-content: center;
  color: palegreen;
`
const MenuItem = styled.div`
  color: royalblue;
`

StyledHeader.Logo = Logo
StyledHeader.Menu = Menu
StyledHeader.MenuItem = MenuItem

export default StyledHeader
