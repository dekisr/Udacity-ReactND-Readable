import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledPostPage = styled.section`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  border-top: 0.5rem solid snow;
  /* background-color: red; */
  @media (min-width: 601px) {
    width: 90%;
  }
`
const H2 = styled.h2`
  margin: 0.5rem 0;
  padding: 1rem 0;
  line-height: 1;
  color: snow;
  span {
    text-decoration: underline;
    color: ${({ author }) => author};
  }
`
const Form = styled.form`
  display: inline-block;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin: 0.5rem auto;
  box-shadow: ${({ author }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${author}`};
  button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    font-size: 1rem;
    color: snow;
    background-color: ${colors.grey.one};
  }
  background-color: snow;
`
const TextArea = styled.textarea`
  display: block;
  width: calc(100% - 1rem);
  height: 5rem;
  margin: 0.5rem;
  border: 1px solid gray;
  border-radius: 0;
  appearance: none;
  font-size: 1rem;
`

StyledPostPage.H2 = H2
StyledPostPage.Form = Form
StyledPostPage.TextArea = TextArea

export default StyledPostPage
