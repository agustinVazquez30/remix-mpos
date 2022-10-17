import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.neutrals[100]};
  border: 0.5px solid ${({theme}) => theme.colors.gray[500]};
  border-radius: ${({theme}) => theme.corners.xl};
  box-shadow: ${({theme}) => theme.shadows.medium};
`;
