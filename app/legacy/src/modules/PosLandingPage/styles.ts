import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Landing = styled.div`
  max-width: 100rem;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    width: 100%;
    max-width: 100%;
  }
`;
