import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledComment = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin-right: auto;
  margin-bottom: 1rem;
  margin-left: auto;
  padding: 1rem;
  box-shadow: ${({ author }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${author}`};
  background: snow;
  &:first-of-type {
    margin-top: 0.5rem;
  }
  &:last-of-type {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 601px) {
    width: calc(100% - 2rem);
    margin-bottom: 1.5rem;
    &:first-of-type {
      margin-top: 1rem;
    }
    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
`
const VoteScore = styled.div`
  grid-row: 1 / span 2;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 1.375rem;
  font-weight: bold;
  color: ${colors.grey.two};
  button {
    display: block;
    border: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: ${colors.grey.two};
    background: none;
  }
`
const Body = styled.p`
  position: relative;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
  color: ${colors.grey.three};
  @media (min-width: 601px) {
    font-size: 1.125rem;
  }
`

StyledComment.VoteScore = VoteScore
StyledComment.Body = Body

export default StyledComment
