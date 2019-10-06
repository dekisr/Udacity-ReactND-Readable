import styled from 'styled-components'

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
  & button {
    width: 100%;
    border: none;
    font-size: 0.75rem;
    text-align: center;
    text-decoration: none;
    text-transform: lowercase;
    cursor: pointer;
    transition: background 400ms ease;
    color: snow;
    background: none;
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
`

StyledPostPage.H2 = H2
StyledPostPage.Sort = Sort

export default StyledPostPage
