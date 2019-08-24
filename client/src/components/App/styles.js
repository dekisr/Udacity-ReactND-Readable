import styled from 'styled-components'

const StyledApp = styled.main`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
`
const Toast = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 300px;
  height: 100px;
  background-color: snow;
`

StyledApp.Toast = Toast

export default StyledApp
