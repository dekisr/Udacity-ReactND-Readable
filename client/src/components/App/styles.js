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
      right: 0rem;
    }
    90% {
      opacity: 0.95;
      right: 0rem;
    }
    to {
      opacity: 0;
      right: -20rem;
    }
  }
  animation: 3.5s fade linear;
`
const ToastWrapper = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 121;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 100%;
  max-width: 320px;
  height: 100%;
  padding: 0 1rem;
  pointer-events: none;
  background: none;
`
const Toast = styled.div`
  position: relative;
  right: -40rem;
  display: ${({ isVisible }) => (isVisible ? 'grid' : 'none')};
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 7rem;
  margin-top: 1rem;
  ${({ isVisible }) => (isVisible ? toastOpacity : 'animation: none')};
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
  color: snow;
  background-color: ${({ alertType }) =>
    alertType === 'success'
      ? 'palegreen'
      : alertType === 'error'
      ? 'lightsalmon'
      : 'lightslategrey'};
  & p {
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 1px 1px 1px ${colors.grey.two};
  }
`

StyledApp.ToastWrapper = ToastWrapper
StyledApp.Toast = Toast

export default StyledApp
