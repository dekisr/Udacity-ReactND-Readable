import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledFooter = styled.footer`
  width: 100%;
  margin: 1rem auto 0 auto;
  margin-bottom: 2.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1.3;
  border-top: 0.3rem solid ${colors.brown.five};
  color: ${colors.brown.five};
  background-color: none;
  & h2 {
    margin-bottom: 0.5rem;
  }
  & a {
    padding: 0.125rem;
    text-decoration: none;
    color: snow;
    background: none;
  }
  & a:hover {
    cursor: pointer;
    color: ${colors.brown.one};
    background-color: ${colors.brown.five};
  }
  & img {
    padding: 0.5rem;
    vertical-align: middle;
  }
  @media (min-width: 601px) {
    width: calc(100% - 1rem);
    max-width: calc(1120px - 1rem);
  }
`

export default StyledFooter
