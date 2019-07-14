import styled from 'styled-components'

const StyledPost = styled.article`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 150px 1fr;
  grid-template-rows: auto 1fr;
  width: 80%;
  padding: 0.5rem;
  margin: 2rem auto;
  /* border: 1px solid #333; */
  /* border-radius: 0.1rem; */
  background: snow;
  box-shadow:
    /* 0 0 0.5rem 0.5rem hsla(200, 100%, 60%, 0.3), */
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0.1rem 0 0.5rem hsla(190, 100%, 50%, 0.8);
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
  font-size: 1.5rem;
  font-weight: bold;
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
  font-size: 0.8rem;
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
  }
`
const Title = styled.div`
  /* background-color: honeydew; */
  font-size: 1.5rem;
  text-align: center;
  color: gray;
`
const Body = styled.div`
  align-self: strech;
  /* background-color: navajowhite; */
  color: grey;
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
