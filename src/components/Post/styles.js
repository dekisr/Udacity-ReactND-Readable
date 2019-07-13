import styled from 'styled-components'

const StyledPost = styled.article`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto 1fr;
  width: 50%;
  padding: 0.5rem;
  margin: 1rem auto;
  border: 1px solid #333;
  background: snow;
`
const Info = styled.ul`
  grid-row: 1 / span 2;
  align-self: stretch;
  list-style: none;
  background-color: aliceblue;
  font-size: 0.8rem;
`
const InfoItem = styled.li`
  padding: 0.3rem;
  span {
    font-weight: bold;
  }
`
const Category = styled(InfoItem)`
  font-size: 2rem;
  font-weight: bold;
`
const Author = styled(InfoItem)`
  ::before {
    content: 'by: '
  }
  font-size: 0.8rem;
  font-weight: normal;
`
const Date = styled(InfoItem)`
  padding: 0.1rem;
  font-size: 0.8rem;
`
const CommentCount = styled(InfoItem)`
  ::before {
    content: 'comments: '
  }
  font-weight: bold;
`
const VoteScore = styled(InfoItem)`
  display: grid;
  justify-items: center;
  font-size: 2rem;
  font-weight: bold;
  button {
    display: block;
  }
`
const Title = styled.div`
  background-color: palevioletred;
  font-size: 1.5rem;
  text-align: center;
  color: wheat;
`
const Body = styled.div`
  align-self: strech;
  background-color: crimson;
  color: aliceblue;
`

StyledPost.Title = Title
StyledPost.Info = Info
StyledPost.Info.Category = Category
StyledPost.Info.Author = Author
StyledPost.Info.Date = Date
StyledPost.Info.CommentCount = CommentCount
StyledPost.Info.VoteScore = VoteScore
StyledPost.Body = Body

export default StyledPost
