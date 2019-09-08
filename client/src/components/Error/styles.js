import styled, { css } from 'styled-components'
import { colors } from '../../utils/globalStyles'

const fakeBorder = css`
  @keyframes glide {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 300vw 0%;
    }
  }
  animation: glide 10s linear infinite alternate;
`
const StyledError = styled.div`
  width: 100%;
  min-width: 320px;
  margin-right: auto;
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.brown.two};
  background-repeat: repeat;
  background: linear-gradient(
    90deg,
    ${colors.blue.three},
    ${colors.red.four},
    ${colors.yellow.four},
    ${colors.blue.three}
  );
  ${fakeBorder}
  & div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 1rem;
    width: 100%;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
    background-color: snow;
  }
  & div button {
    padding: 0.5rem;
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 400ms ease, transform 150ms ease;
    color: snow;
    background-color: ${colors.brown.two};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & div button:hover {
    outline: 1px solid snow;
    outline-offset: -2px;
  }
  & div button:active {
    outline-offset: -4px;
    transform: scale(0.95);
    background-color: ${colors.brown.one};
  }
  @media (min-width: 601px) {
    width: calc(100% - 1rem);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
`

export default StyledError
