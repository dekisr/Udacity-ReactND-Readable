import styled, { css } from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledLoading = styled.div`
  position: fixed;
  z-index: 128;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.brown.onea};
  & h1 {
    display: block;
    width: calc(100% - 1rem);
    max-width: calc(1120px - 1rem);
    margin: 1rem;
    font-size: 1.625rem;
    text-align: right;
    text-transform: lowercase;
    text-shadow: 0.0625rem 0.0625rem 0.0625rem hsla(0, 0%, 0%, 0.5);
    color: snow;
    @media (min-width: 601px) {
      font-size: 2rem;
    }
  }
`
const character = css`
  @keyframes rotateColor {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
  animation: rotateColor 0.2s linear infinite;
`
const Char = styled.img`
  display: block;
  width: 12rem;
  height: auto;
  margin: 2rem auto;
  ${character};
`
const loading = css`
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
  width: calc(100% - 1rem);
  max-width: calc(1120px - 1rem);
  height: 3rem;
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
  background: linear-gradient(
    90deg,
    ${colors.blue.three},
    ${colors.red.four},
    ${colors.yellow.four},
    ${colors.blue.three}
  );
  ${loading}
`
StyledLoading.Char = Char
StyledLoading.Bar = Bar

export default StyledLoading
