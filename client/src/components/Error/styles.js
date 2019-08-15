import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledError = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin-right: auto;
  margin-left: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: 1.5rem;
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5), 0 0 0 0.5rem red;
  color: ${colors.grey.two};
  background: snow;
  @media (min-width: 601px) {
    width: calc(100% - 2rem);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

export default StyledError
