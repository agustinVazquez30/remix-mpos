import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & .subtitle {
    color: ${({theme}) => theme.colors.gray[700]};
    margin-bottom: 24px;
  }

  & .continue-button {
    margin-top: 4px;
  }
`;
