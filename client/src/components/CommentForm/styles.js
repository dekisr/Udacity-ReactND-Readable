import styled from 'styled-components'
import { colors } from '../../utils/globalStyles'

const StyledCommentForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-gap: 0.5rem;
  width: calc(100% - 1rem);
  margin: 1rem auto;
  box-shadow: ${({ author }) => `
    0 0.1rem 0.3rem hsla(0, 0%, 0%, 0.5),
    0 0 0 0.5rem ${author}`};
  background-color: snow;
  & b {
    font-weight: 700;
  }
  & > span {
    display: block;
    width: calc(100% - 1rem);
    margin: 0 auto;
    font-size: 0.75rem;
    text-align: right;
    color: ${colors.brown.two};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
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
    background-color: ${colors.brown.two};
    @media (min-width: 601px) {
      font-size: 1rem;
    }
  }
  & button:disabled,
  button[disabled] {
    cursor: not-allowed;
    background-color: ${colors.brown.five};
  }
  & button:hover {
    outline: 0.0625rem solid snow;
    outline-offset: -0.125rem;
  }
  & button:active {
    outline-offset: -0.25rem;
    background-color: ${colors.brown.one};
  }
  @media (min-width: 601px) {
    width: calc(100% - 2rem);
  }
`
const TextArea = styled.textarea`
  display: block;
  width: calc(100% - 1rem);
  height: 5rem;
  margin: 0.5rem 0.5rem 0 0.5rem;
  padding: 0.5rem;
  appearance: none;
  border: 0.0625rem solid ${colors.brown.four};
  border-radius: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colors.brown.three};
  ::placeholder {
    text-align: center;
    text-transform: uppercase;
    color: ${colors.brown.four};
  }
  @media (min-width: 601px) {
    font-size: 1.125rem;
  }
`
const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto;
  align-content: start;
  align-items: start;
  grid-gap: 0.5rem;
  width: calc(100% - 1rem);
  margin: 0 auto;
  font-size: 0.75rem;
  color: ${colors.brown.two};
  & dl {
    padding-left: 0.1rem;
  }
  & dt,
  dd {
    font-size: 0.75rem;
    @media (min-width: 601px) {
      font-size: 0.875rem;
    }
  }
  & dt {
    display: block;
    @media (min-width: 601px) {
      display: inline;
    }
  }
  & dd {
    display: inline;
    padding: 0 0.3rem;
    @media (min-width: 601px) {
      padding: 0 0.5rem;
    }
  }
  & div {
    text-align: right;
  }
  & div span {
    color: ${({ invalidChars }) =>
      invalidChars ? colors.danger.firebrick : colors.brown.two};
  }
  @media (min-width: 601px) {
    font-size: 1rem;
  }
`

StyledCommentForm.TextArea = TextArea
StyledCommentForm.Options = Options

export default StyledCommentForm
