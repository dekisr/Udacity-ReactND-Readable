import styled, { css } from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledApp = styled.main`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
`
const toastOpacity = css`
  @keyframes fade {
    from {
      opacity: 0;
      right: -20rem;
    }
    10% {
      opacity: 0.95;
      right: 2rem;
    }
    90% {
      opacity: 0.95;
      right: 2rem;
    }
    to {
      opacity: 0;
      right: -20rem;
    }
  }
  animation: 3.2s fade linear;
`
const Toast = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 121;
  display: ${({ isVisible }) => (isVisible ? 'grid' : 'none')};
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 20rem;
  height: 7rem;
  opacity: 0.95;
  ${({ isVisible }) => (isVisible ? toastOpacity : 'animation: none')};
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
  color: snow;
  background-color: ${({ alertType }) =>
    alertType === 'success'
      ? 'palegreen'
      : alertType === 'error'
      ? 'lightsalmon'
      : 'indigo'};
  & p {
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px 1px ${colors.grey.two};
  }
`

StyledApp.Toast = Toast

export default StyledApp
