import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  background-color: ${({theme}) => theme.colors.primary[200]};
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;
