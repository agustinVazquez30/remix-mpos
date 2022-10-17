import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;

  background-color: #fff7d7; // not founded at Theme

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    padding: 0 0.5rem;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 480px;
  height: fit-content;

  border-radius: 1rem;

  background-color: white;
  box-shadow: ${({theme}) => theme.shadows.soft};

  & .card {
    &__header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 3rem 0 0 0;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;

      background-color: ${({theme}) => theme.colors.gray[100]};
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2.5rem 1.5rem;
      border: none;
    }
  }

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    min-width: 95%;
  }
`;

export const FloatContainer = styled.div`
  height: fit-content;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    top: 1rem;
    right: 1rem;
  }
`;
