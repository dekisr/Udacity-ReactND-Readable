import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledHeader = styled.header`
  background-color: ${colors.red.three};
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export default StyledHeader
