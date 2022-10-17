import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .wrapper {
    display: inherit;
    flex-direction: column;
    align-items: inherit;
    justify-content: space-between;
    min-height: 25rem;
    padding: 2.5rem;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      padding: 1rem;
    }
  }

  .treinta-logo {
    position: absolute;
    top: 4rem;
  }

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    background-color: white; // hide overlay of parent
    min-height: 100vh;
  }
`;
