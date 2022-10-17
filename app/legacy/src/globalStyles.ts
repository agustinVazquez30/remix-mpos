import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  scroll-behavior: smooth;

  .ButtonHunter {
    width: 100%;
    margin-bottom: 24px;
   }

  .document-alert {
    margin-bottom: 1rem;
    &__text {
      margin-left: 1rem;
    }
  }

  .smooth {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
  }
`;
