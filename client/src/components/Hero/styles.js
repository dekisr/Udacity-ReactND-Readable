import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'
import mainBg from '../../assets/mainBg.svg'

const StyledHero = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: left;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem;
  background-image: url(${mainBg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  & img {
    width: 8rem;
    height: auto;
    margin-right: auto;
    transform: rotate(-20deg);
    filter: ${({ category }) =>
      category === 'blue'
        ? `drop-shadow(0.1rem 0rem 0rem ${colors.blue.threea})
      drop-shadow(-0.1rem 0rem 0rem ${colors.blue.threea})
      drop-shadow(0rem 0.1rem 0.3rem ${colors.blue.threea}) hue-rotate(360deg)`
        : category === 'red'
        ? `
      drop-shadow(0.1rem 0rem 0rem ${colors.red.threea})
      drop-shadow(-0.1rem 0rem 0rem ${colors.red.threea})
      drop-shadow(0rem 0.1rem 0.3rem ${colors.red.threea}) hue-rotate(720deg)
      `
        : category === 'yellow'
        ? `
      drop-shadow(0.1rem 0rem 0rem ${colors.yellow.threea})
      drop-shadow(-0.1rem 0rem 0rem ${colors.yellow.threea})
      drop-shadow(0rem 0.1rem 0.3rem ${colors.yellow.threea}) hue-rotate(1080deg)
      `
        : `drop-shadow(0.2rem 0rem 0rem ${colors.blue.threea})
      drop-shadow(-0.2rem 0rem 0rem ${colors.red.threea})
      drop-shadow(0rem 0.2rem 0.3rem ${colors.yellow.threea}) hue-rotate(0deg)`};
    transition: filter 1s ease;
    @media (min-width: 601px) {
      display: block;
      width: 12rem;
    }
  }
  @media (min-width: 401px) {
    grid-template-columns: 1fr auto;
  }
  /* @media (min-width: 601px) {
    width: calc(100% - 1rem);
    margin: 0.5rem;
  } */
`
const Options = styled.div`
  display: grid;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${colors.brown.two};
  background-repeat: repeat;
  background: ${({ category }) =>
    category === 'blue'
      ? colors.blue.three
      : category === 'red'
      ? colors.red.three
      : category === 'yellow'
      ? colors.yellow.three
      : `linear-gradient(
    90deg,
    ${colors.blue.three},
    ${colors.red.four},
    ${colors.yellow.four},
    ${colors.blue.three}
  )`};
  transition: background 200ms ease;
  & div {
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: 1fr auto;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5);
    background-color: snow;
  }
  & select {
    grid-column: 1 / span 3;
    display: block;
    width: 100%;
    margin: 0 0.5rem;
    padding: 0.5rem;
    appearance: none;
    border: 0.0625rem solid ${colors.brown.four};
    border-radius: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${colors.brown.three};
    @media (min-width: 601px) {
      font-size: 1.125rem;
    }
  }
  & span {
    justify-self: right;
  }
  & button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    font-size: 0.75rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 400ms ease;
    color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? 'snow' : colors.brown.two};
    background-color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? colors.brown.two : 'transparent'};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & button + button {
    color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? colors.brown.two : 'snow'};
    background-color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? 'transparent' : colors.brown.two};
  }
`

StyledHero.Options = Options

export default StyledHero
