import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPostPage = styled.section`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-top: 0.5rem solid snow;
  @media (min-width: 601px) {
    width: 100%;
  }
`
const H2 = styled.h2`
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  padding: 1rem 0;
  line-height: 1;
  text-align: center;
  color: snow;
  span {
    text-decoration: underline;
    color: ${({ author }) => author};
  }
`

StyledPostPage.H2 = H2

export default StyledPostPage
