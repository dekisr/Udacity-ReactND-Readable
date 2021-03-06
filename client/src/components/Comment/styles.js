import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledComment = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto auto;
  grid-gap: 1rem;
  width: calc(100% - 1rem);
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
  grid-row: 1 / span 3;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 2rem;
  color: ${colors.brown.two};
  & div {
    font-size: 1.375rem;
    font-weight: 700;
  }
  & button {
    display: block;
    border: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: ${({ voted }) => (voted ? colors.brown.five : colors.brown.two)};
    background: none;
  }
  & i {
    font-size: 2rem;
    font-weight: 700;
  }
`
const Body = styled.p`
  height: auto;
  max-height: 20rem;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
  color: ${colors.brown.three};
  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: snow;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.brown.five};
  }
  scrollbar-color: ${colors.brown.five} snow;
  @media (min-width: 601px) {
    font-size: 1.125rem;
  }
`
const Info = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  justify-content: center;
  align-content: center;
  justify-items: end;
  align-items: center;
  grid-gap: 0.5rem;
  list-style: none;
  font-size: 0.75rem;
  @media (min-width: 601px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
    font-size: 0.875rem;
  }
`
const InfoItem = styled.li`
  color: ${colors.brown.two};
`
const Date = styled(InfoItem)`
  justify-self: end;
  & p {
    text-align: right;
  }
`
const Avatar = styled.div`
  width: 1rem;
  height: 1rem;
  border: 0.0625rem solid ${colors.brown.two};
  background-color: ${({ author }) => author};
`
const Author = styled(InfoItem)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  align-content: center;
  align-items: center;
  grid-gap: 0.2rem;
  color: ${({ author }) => author};
  & span {
    display: block;
  }
`
const Edit = styled.div`
  display: grid;
  justify-content: end;
  align-content: center;
  justify-items: end;
  align-items: center;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0.5rem;
  color: ${colors.brown.three};
  & span {
    display: block;
    text-align: right;
    font-size: 0.625rem;
    @media (min-width: 601px) {
      font-size: 0.75rem;
    }
  }
  & button {
    display: block;
    padding: 0.125rem 0 0 0.125rem;
    border: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: ${colors.brown.three};
    background: none;
  }
  & i {
    font-size: 1.125rem;
    font-weight: 400;
  }
`

StyledComment.VoteScore = VoteScore
StyledComment.Body = Body
StyledComment.Edit = Edit
StyledComment.Info = Info
StyledComment.Info.Avatar = Avatar
StyledComment.Info.Author = Author
StyledComment.Info.Date = Date

export default StyledComment
