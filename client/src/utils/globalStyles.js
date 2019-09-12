import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-wrap: break-word;
    font-family: 'Barlow', 'Roboto', 'Oxygen', 'Cantarell', 'Fira Sans',
      'Helvetica', 'Arial', sans-serif;
  }
  html {
    background: linear-gradient(
      180deg,
      hsl(10, 10%, 15%) 60%,
      hsl(10, 10%, 30%) 100%
    );
    background-attachment: fixed;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    & i {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.5rem;
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      /* Support for all WebKit browsers. */
      -webkit-font-smoothing: antialiased;
      /* Support for Safari and Chrome. */
      text-rendering: optimizeLegibility;
      /* Support for Firefox. */
      -moz-osx-font-smoothing: grayscale;
      /* Support for IE. */
      font-feature-settings: 'liga';
    }
  }
  h1 {
    font-size: 1.625rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.375rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1.125rem;
  }
`
export const colors = {
  blue: {
    one: 'hsl(200, 65%, 20%)',
    two: 'hsl(200, 65%, 35%)',
    three: 'hsl(200, 65%, 50%)',
    threea: 'hsla(200, 65%, 50%, 0.5)',
    four: 'hsl(200, 65%, 65%)',
    five: 'hsl(200, 65%, 80%)',
    fivea: 'hsla(200, 65%, 80%, 0.3)'
  },
  red: {
    one: 'hsl(5, 60%, 20%)',
    two: 'hsl(5, 60%, 35%)',
    three: 'hsl(5, 60%, 50%)',
    threea: 'hsla(5, 60%, 50%, 0.5)',
    four: 'hsl(5, 60%, 65%)',
    five: 'hsl(5, 60%, 80%)',
    fivea: 'hsla(5, 60%, 80%, 0.3)'
  },
  yellow: {
    one: 'hsl(50, 85%, 20%)',
    two: 'hsl(50, 85%, 35%)',
    three: 'hsl(50, 85%, 50%)',
    threea: 'hsla(50, 85%, 50%, 0.5)',
    four: 'hsl(50, 85%, 65%)',
    five: 'hsl(50, 85%, 80%)',
    fivea: 'hsla(50, 85%, 80%, 0.3)'
  },
  brown: {
    one: 'hsl(10, 10%, 15%)',
    two: 'hsl(10, 10%, 30%)',
    three: 'hsl(10, 10%, 45%)',
    four: 'hsl(10, 10%, 60%)',
    five: 'hsl(10, 10%, 75%)'
  },
  toast: {
    error: 'hsl(10, 50%, 50%)',
    alert: 'hsl(55, 70%, 50%)',
    success: 'hsl(150, 50%, 50%)'
  },
  danger: {
    firebrick: 'hsl(0, 70%, 45%)',
    crimson: 'hsl(350, 85%, 45%)',
    tomato: 'hsl(10, 100%, 65%)',
    tomatoa: 'hsla(10, 100%, 65%, 0.5)',
    lightcoral: 'hsl(0, 80%, 70%)',
    burlywood: 'hsl(35, 60%, 70%)'
  }
}

export default GlobalStyle
