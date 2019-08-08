import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledCommentForm = styled.form`
  display: inline-block;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin: 0.5rem auto;
  box-shadow: ${({ author }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${author}`};
  background-color: snow;
  button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    font-size: 1rem;
    color: snow;
    background-color: ${colors.grey.one};
  }
  @media (min-width: 601px) {
    width: calc(100% - 2rem);
  }
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

StyledCommentForm.TextArea = TextArea

export default StyledCommentForm
