import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPost = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 7rem auto;
  grid-gap: 1rem;
  width: 60%;
  min-width: 400px;
  margin: 1.5rem auto;
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
`
const VoteScore = styled.div`
  grid-row: 1 / span 3;
  display: grid;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  padding: 0 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  button {
    display: block;
    border: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: red;
    background: none;
  }
`
const Title = styled.h2`
  color: gray;
`
const Body = styled.p`
  position: relative;
  text-align: left;
  color: grey;
`
const Info = styled.ul`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1rem;
  align-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.7rem;
  list-style: none;
  background-color: ${({ category }) =>
    category === 'blue'
      ? colors.blue.fivea
      : category === 'red'
      ? colors.red.fivea
      : colors.yellow.fivea};
`
const InfoItem = styled.li`
  span {
    font-weight: bold;
  }
  /* &:last-of-type {
    margin-bottom: 0;
  } */
`
const Author = styled(InfoItem)`
  ::before {
    content: 'by: ';
  }
  font-size: 0.8rem;
  font-weight: normal;
  text-align: left;
`
const Avatar = styled.div`
  width: 100%;
  height: 1rem;
  margin: 0.3rem 0;
  background-color: ${({ author }) => author};
  border: 1px solid gray;
  border-radius: 0;
`
const Date = styled(InfoItem)`
  justify-self: end;
`
const CommentCount = styled(InfoItem)`
  ::before {
    content: 'comments: ';
  }
  justify-self: end;
  font-weight: bold;
`
const Join = styled.button`
  /* https://css-tricks.com/overriding-default-button-styles/ */
  position: absolute;
  right: -1rem;
  bottom: 0;
  z-index: 123;
  margin: 0;
  padding: 0.5rem;
  border: none;
  font-family: sans-serif;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 250ms ease-in-out, transform 150ms ease;
  color: #ffffff;
  background-color: ${({ category }) =>
    category === 'blue'
      ? colors.blue.four
      : category === 'red'
      ? colors.red.four
      : colors.yellow.four};
  &:hover,
  &:focus {
    background-color: ${({ category }) =>
      category === 'blue'
        ? colors.blue.two
        : category === 'red'
        ? colors.red.two
        : colors.yellow.two};
  }
  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }
  &:active {
    transform: scale(0.99);
  }
`

StyledPost.VoteScore = VoteScore
StyledPost.Title = Title
StyledPost.Body = Body
StyledPost.Info = Info
StyledPost.Info.Author = Author
StyledPost.Info.Author.Avatar = Avatar
StyledPost.Info.Date = Date
StyledPost.Info.CommentCount = CommentCount
StyledPost.Join = Join

export default StyledPost
