import styled from 'styled-components'

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 122;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: black;
  & h1 {
    color: snow;
  }
`

export default StyledLoading
