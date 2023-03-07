import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    border: none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Inter', sans-serif;
  }

  html, body {
    background-color: #0f0f0f;
  }
  
  img {
      max-width: 100%;
      display: block;
  }

  button {
    background: transparent;
    cursor: pointer;
  }
  
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .Overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(2px);
    background-color: rgba(20, 20, 20, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Modal {
    position: absolute;
  }
`;

export default GlobalStyle;