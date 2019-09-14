import styled, { css } from 'styled-components'
import {colors} from '../../utils/globalStyles'

const StyledLoading = styled.div`
  position: fixed;
  z-index: 127;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 90%, 90%, 0.8);
`
const fakeBorder = css`
  @keyframes glide {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 40rem 0%;
    }
  }
  animation: glide 10s linear infinite alternate;
`
const Bar = styled.div`
  display: block;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
  background: linear-gradient(
    90deg,
    ${colors.blue.three},
    ${colors.red.four},
    ${colors.yellow.four},
    ${colors.blue.three}
  );
  ${fakeBorder}
`

StyledLoading.Bar = Bar

export default StyledLoading
