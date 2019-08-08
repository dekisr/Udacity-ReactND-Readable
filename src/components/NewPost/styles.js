import styled from 'styled-components'

const StyledNewPost = styled.section`
  background-color: rebeccapurple;
  display: grid;
  justify-items: center;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  margin: 1rem;
  background-color: snow;
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5), 0 0 0 0.5rem palevioletred;
  & input,
  select,
  option,
  textarea {
    display: block;
    appearance: none;
    width: calc(100% - 1rem);
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0;
    font-size: 1rem;
  }
  & button {
    font-size: 1.5rem;
    background-color: greenyellow;
    width: 100%;
    margin-top: 0.5rem;
    padding: 1rem;
    border: none;
  }
`

const TextArea = styled.textarea`
  height: 100px;
`

StyledNewPost.Form = Form
StyledNewPost.TextArea = TextArea

export default StyledNewPost
