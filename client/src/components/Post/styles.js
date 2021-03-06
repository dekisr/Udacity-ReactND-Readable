import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPost = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto auto;
  grid-gap: 1rem;
  width: calc(100% - 1rem);
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: ${({ category }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${
      category === 'blue'
        ? colors.blue.three
        : category === 'red'
        ? colors.red.three
        : colors.yellow.three
    }`};
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
  grid-row: 1 / span 4;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 2rem;
  padding: 0 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: ${colors.brown.two};
  button {
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
const Title = styled.h2`
  text-align: left;
  word-break: break-all;
  color: ${colors.brown.two};
`
const Content = styled.div`
  position: relative;
`
const Body = styled.p`
  position: relative;
  ${({ dashboard }) =>
    dashboard
      ? 'height: 8rem; overflow-y: hidden;'
      : 'height: auto; overflow-y: scroll;'}
  max-height: 35rem;
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
const Join = styled.button`
  /* https://css-tricks.com/overriding-default-button-styles/ */
  position: absolute;
  right: -1rem;
  bottom: 0;
  z-index: 123;
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 400ms ease, transform 150ms ease;
  color: ${colors.brown.two};
  background-color: ${({ category }) =>
    category === 'blue'
      ? colors.blue.five
      : category === 'red'
      ? colors.red.five
      : colors.yellow.five};
  &:hover,
  &:focus {
    color: snow;
    outline: 0.0625rem solid snow;
    outline-offset: -0.125rem;
  }
  &:focus {
    outline: 0.0625rem solid snow;
    outline-offset: -0.25rem;
  }
  &:active {
    outline-offset: -0.25rem;
    transform: scale(0.99);
    background-color: ${({ category }) =>
      category === 'blue'
        ? colors.blue.three
        : category === 'red'
        ? colors.red.three
        : colors.yellow.three};
  }
`
const Info = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  align-content: center;
  align-items: center;
  padding: 1rem;
  list-style: none;
  font-size: 0.75rem;
  background-color: ${({ category }) =>
    category === 'blue'
      ? colors.blue.fivea
      : category === 'red'
      ? colors.red.fivea
      : colors.yellow.fivea};
  @media (min-width: 601px) {
    grid-template-columns: auto 1fr auto;
    grid-gap: 1rem;
    font-size: 0.875rem;
  }
`
const InfoItem = styled.li`
  color: ${colors.brown.two};
  span {
    font-weight: 700;
  }
`
const Author = styled(InfoItem)`
  ::before {
    content: 'by: ';
  }
  line-height: 1.8;
  text-align: left;
`
const Avatar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: ${({ author }) => author};
  border: 0.0625rem solid ${colors.brown.four};
  border-radius: 0;
`
const Date = styled(InfoItem)`
  justify-self: end;
  p {
    text-align: left;
  }
`
const CommentCount = styled(InfoItem)`
  ::before {
    content: 'comments: ';
  }
  justify-self: end;
  font-weight: 700;
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

StyledPost.VoteScore = VoteScore
StyledPost.Title = Title
StyledPost.Content = Content
StyledPost.Body = Body
StyledPost.Join = Join
StyledPost.Info = Info
StyledPost.Info.Author = Author
StyledPost.Info.Author.Avatar = Avatar
StyledPost.Info.Date = Date
StyledPost.Info.CommentCount = CommentCount
StyledPost.Edit = Edit

export default StyledPost
