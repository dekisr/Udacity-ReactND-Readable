import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledCommentForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: calc(100% - 1rem);
  min-width: calc(320px - 1rem);
  margin: 1rem auto;
  box-shadow: ${({ author }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${author}`};
  background-color: snow;
  & b {
    font-weight: 700;
  }
  & span {
    display: block;
    width: calc(100% - 1rem);
    margin: 0 auto 0.5rem auto;
    padding: 0;
    text-align: right;
    color: ${colors.grey.two};
  }
  & button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    font-size: 0.75rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 400ms ease;
    color: snow;
    background-color: ${colors.grey.two};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & button:disabled,
  button[disabled] {
    cursor: not-allowed;
    background-color: ${colors.grey.five};
  }
  & button:hover {
    outline: 1px solid snow;
    outline-offset: -2px;
  }
  & button:active {
    outline-offset: -4px;
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
  padding: 0.5rem;
  appearance: none;
  border: 1px solid ${colors.grey.four};
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colors.grey.three};
  ::placeholder {
    text-align: center;
    text-transform: uppercase;
    line-height: 4rem;
    color: ${colors.grey.four};
  }
  @media (min-width: 601px) {
    font-size: 1.125rem;
  }
`
const Options = styled.div`
  display: block;
  width: calc(100% - 1rem);
  margin: 0 auto;
  padding: 1rem;
  background-color: snow;
  & dt, dd {
    display: inline;
  }
`

StyledCommentForm.TextArea = TextArea
StyledCommentForm.Options = Options

export default StyledCommentForm
