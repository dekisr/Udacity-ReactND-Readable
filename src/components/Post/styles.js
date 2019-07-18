import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPost = styled.article`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto 1fr;
  width: 70%;
  padding: 1rem;
  margin: 2rem auto;
  background: snow;
  box-shadow: ${({category}) =>
    category === 'red' ?
    `
      0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
      0 0.1rem 0 0.5rem ${colors.red.three}
    ` :
    category === 'blue' ?
    `
      0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
      0 0.1rem 0 0.5rem ${colors.blue.three}
    ` :
    `
      0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
      0 0.1rem 0 0.5rem ${colors.yellow.three}
    `
  };
  /* box-shadow:
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0.1rem 0 0.5rem hsla(190, 100%, 50%, 0.8); */
`
const Info = styled.ul`
  grid-row: 1 / span 2;
  align-self: stretch;
  padding: 0.5rem;
  list-style: none;
  background-color: ${({category}) =>
    category === 'red' ?
    `${colors.red.fivea}` :
    category === 'blue' ?
    `${colors.blue.fivea}` :
    `${colors.yellow.fivea}`
  };
  font-size: 0.7rem;
`
const InfoItem = styled.li`
  span {
    font-weight: bold;
  }
`
const Category = styled(InfoItem)`
  font-size: 1rem;
  font-weight: bold;
`
const Avatar = styled(InfoItem)`
  width: 100%;
  height: 1rem;
  margin: auto;
  background-color: ${({author}) => author};
  border: 1px solid gray;
  border-radius: 0;
`
const Author = styled(InfoItem)`
  ::before {
    content: 'by: ';
  }
  font-size: 0.8rem;
  font-weight: normal;
`
const Date = styled(InfoItem)`
  padding: 0.1rem;
`
const CommentCount = styled(InfoItem)`
  ::before {
    content: 'comments: ';
  }
  font-weight: bold;
`
const VoteScore = styled(InfoItem)`
  display: grid;
  justify-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  button {
    display: block;
    background: none;
    border: none;
  }
`
const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: gray;
`
const Body = styled.div`
  align-self: strech;
  text-align: left;
  color: grey;
`

StyledPost.Title = Title
StyledPost.Info = Info
StyledPost.Avatar = Avatar
StyledPost.Info.Category = Category
StyledPost.Info.Author = Author
StyledPost.Info.Date = Date
StyledPost.Info.CommentCount = CommentCount
StyledPost.Info.VoteScore = VoteScore
StyledPost.Body = Body

export default StyledPost
