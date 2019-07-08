import styled from 'styled-components'

const StyledPost = styled.div`
  width: 50%;
  padding: 1rem;
  margin: 1rem auto;
  background: salmon;
`
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: wheat;
`

StyledPost.Title = Title

export default StyledPost
