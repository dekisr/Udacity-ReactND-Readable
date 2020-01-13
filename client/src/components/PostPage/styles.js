import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPostPage = styled.section`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-top: 0.5rem solid snow;
  @media (min-width: 601px) {
    width: 100%;
  }
`
const H2 = styled.h2`
  margin-top: 0rem;
  padding: 1rem;
  line-height: 1;
  text-align: center;
  color: snow;
  span {
    text-decoration: underline;
    color: ${({ author }) => author};
  }
  @media (min-width: 601px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`
const Sort = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  justify-content: center;
  align-content: center;
  justify-items: end;
  align-items: center;
  width: calc(100% - 1rem);
  grid-gap: 0.5rem;
  margin: 0 auto;
  & span {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${colors.brown.five};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: ${({ sortBy }) =>
      sortBy === 'timestamp' ? `0.25rem solid ${colors.brown.five}` : 'none'};
    font-size: 0.75rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 400ms ease;
    color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? colors.brown.five : colors.brown.four};
    background: none;
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & button + button {
    border-bottom: ${({ sortBy }) =>
      sortBy === 'timestamp' ? 'none' : `0.25rem solid ${colors.brown.five}`};
    color: ${({ sortBy }) =>
      sortBy === 'timestamp' ? colors.brown.four : colors.brown.five};
  }
`

StyledPostPage.H2 = H2
StyledPostPage.Sort = Sort

export default StyledPostPage
