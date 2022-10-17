import styled from 'styled-components';

export const ActivationSectionContainer = styled.section`
  max-width: 450px;
  flex-basis: 50%;
  > * {
    font-family: 'Nunito Sans';
  }
  .activation {
    &__title,
    &__subtitle {
      font-weight: bold;
      line-height: 2.5rem;
      color: ${({theme}) => theme.colors.secondary[700]};
    }
    &__title {
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }
    &__button {
      width: 100%;
      font-weight: bold;
      font-size: 1rem;
      line-height: 2.5rem;
      outline: none;
      border: none;
      border-radius: 4px;
      background-color: ${({theme}) => theme.colors.primary[500]};
      cursor: pointer;
    }
  }

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    max-width: inherit;
    width: 100%;
    padding: 0 2rem;
  }
  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    padding: 0 1rem;
  }
`;
