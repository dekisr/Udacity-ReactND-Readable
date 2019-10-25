import React from 'react'
import StyledFooter from './styles'

const Footer = () => {
  return (
    <StyledFooter>
      <h2>About</h2>
      <p>
        This project was made just for study purposes. I tried to put all my
        passion to build a bunch of functionalities from scratch. You can find
        more about and all the code at my{' '}
        <a
          href="https://github.com/dekisr"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        . I'll appreciate any feedback.
      </p>
    </StyledFooter>
  )
}

export default Footer
