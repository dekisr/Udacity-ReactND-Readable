import React from 'react'
import StyledFooter from './styles'
import FooterMark from '../../assets/FooterMark.png'

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        <img src={FooterMark} alt="GitHub Mark" />
      </p>
      <h2>About</h2>
      <p>
        {`This project was made just for study purposes. I tried to put all my
        passion to build a bunch of functionalities from scratch. You can find
        more about and all the code at `}
        <a
          href="https://github.com/dekisr"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/dekisr
        </a>
        . I'll appreciate any feedback.
      </p>
    </StyledFooter>
  )
}

export default Footer
