import styled from 'styled-components'

const StyledFooter = styled.footer`
  width: 100%;
  margin: 1rem auto 0 auto;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-top: 0.3rem solid snow;
  color: snow;
  background-color: salmon;
  @media (min-width: 601px) {
    width: calc(100% - 1rem);
    max-width: calc(1120px - 1rem);
    margin-bottom: 0.5rem;
  }
`

export default StyledFooter
