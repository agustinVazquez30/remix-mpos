import styled from 'styled-components';

export const StepItemContainer = styled.div`
  height: min-content;
  padding: 0.5rem 1rem 1rem;
  margin: 1rem 0px;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.gray[200]};
  width: 100%;

  .step {
    &__index {
      display: inline-block;
      position: relative;
      font-size: 2rem;
      font-family: 'Nunito Sans';
      font-weight: bold;
      color: ${({theme}) => theme.colors.secondary[500]};
      z-index: 0;

      ::after {
        content: '';
        display: block;
        position: absolute;
        height: 0.8em;
        width: 0.8em;
        background-color: ${({theme}) => theme.colors.secondary[200]};
        opacity: 0.2;
        border-radius: 0.8em;
        top: 0.25em;
        left: 0.3rem;
        z-index: -10;
      }
    }

    &__title {
      font-family: 'Nunito Sans';
      font-weight: 700;
      line-height: 1.5rem;
      font-size: 1rem;
      color: ${({theme}) => theme.colors.gray[800]};
    }
  }
`;

export const StepItemIndex = styled.div``;
