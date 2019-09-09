import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledHero = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  & img {
    width: 12rem;
    height: auto;
    margin: 0 auto;
    filter: drop-shadow(0.5rem 0rem 0.1rem ${colors.blue.threea})
      drop-shadow(-0.5rem 0rem 0.1rem ${colors.red.threea})
      drop-shadow(0rem 0.5rem 0.1rem ${colors.yellow.threea});
  }
`
const Options = styled.div`
justify-self: right;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 1rem;
  width: 50%;
  margin-right: 1rem;
  padding: 1rem;
  transition: box-shadow 1s ease;
  box-shadow: ${({ category }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${
      category === 'blue'
        ? colors.blue.three
        : category === 'red'
        ? colors.red.three
        : category === 'yellow'
        ? colors.yellow.three
        : 'snow'
    }`};
  background-color: snow;
  & div {
    justify-self: right;
    padding-right: 0.5rem;
  }
  & select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    appearance: none;
    border: 1px solid ${colors.brown.four};
    border-radius: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${colors.brown.three};
    @media (min-width: 601px) {
      font-size: 1.125rem;
    }
  }
`

StyledHero.Options = Options

export default StyledHero
