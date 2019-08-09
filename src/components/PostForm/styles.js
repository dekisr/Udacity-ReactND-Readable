import styled from 'styled-components'

const StyledPostForm = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  background-color: rebeccapurple;
`
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);
  grid-gap: 0.5rem;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin-top: 1rem;
  margin-right: auto;
  margin-bottom: 1rem;
  margin-left: auto;
  padding: 1rem;
  box-shadow: 0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5), 0 0 0 0.5rem palevioletred;
  background-color: snow;
  @media (min-width: 601px) {
    width: calc(100% - 2rem);
  }
  & input,
  select,
  option,
  textarea {
    display: block;
    appearance: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid gray;
    border-radius: 0;
  }
  & textarea {
    height: 200px;
  }
  & button {
    width: 100%;
    padding: 1rem;
    font-size: 1.5rem;
    border: none;
    background-color: greenyellow;
  }
`

StyledPostForm.Form = Form

export default StyledPostForm
