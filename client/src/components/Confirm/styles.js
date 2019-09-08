import styled, { css } from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledConfirm = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 124;
  display: ${({ show }) => (show ? 'grid' : 'none')};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.danger.tomatoa};
`
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
const Content = styled.div`
  position: relative;
  display: block;
  width: 100%;
  /* height: ${({ post }) => (post ? 'auto' : '100%')}; */
  max-width: calc(980px - 1rem);
  margin-right: auto;
  margin-left: auto;
  padding: 0.5rem;
  font-weight: 700;
  color: ${colors.brown.two};
  background-repeat: repeat;
  background: linear-gradient(
    90deg,
    ${colors.danger.tomato},
    ${colors.danger.burlywood},
    ${colors.danger.tomato}
  );
  ${fakeBorder}
  & div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 0.5rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
    background-color: seashell;
  }
  & div h1 {
    grid-column: 1 / span 2;
    font-size: ${({ post }) => (post ? '1.625rem' : '1.125rem')};
  }
  @media (min-width: 601px) {
    width: calc(100% - 1rem);
  }
`
const Button = styled.button`
  justify-self: ${({ cancel }) => (cancel ? 'left' : 'right')};
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
  background-color: ${({ cancel }) =>
    cancel ? colors.danger.tomato : colors.brown.two};
  @media (min-width: 601px) {
    font-size: 1rem;
  }
  &:hover {
    outline: 1px solid snow;
    outline-offset: -2px;
  }
  &:active {
    outline-offset: -4px;
    transform: scale(0.95);
    background-color: ${({ cancel }) =>
    cancel ? colors.danger.crimson : colors.brown.one};
  }
`

StyledConfirm.Content = Content
StyledConfirm.Content.Button = Button

export default StyledConfirm
