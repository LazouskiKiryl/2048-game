import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background: #faf8ef;
    color: #776e65;
    font-size: 18px;
    font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  }
`;

export { GlobalStyle };
