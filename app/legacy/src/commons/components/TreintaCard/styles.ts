import styled from 'styled-components';

export const Card = styled.div`
  align-items: center;
  background-color: ${({theme}) => theme.colors.neutrals[100]};
  border-radius: ${({theme}) => theme.corners.xl};
  box-shadow: ${({theme}) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  text-align: center;
  width: 92%;

  ${({theme}) => theme.breakpointsMinWidth.md} {
    width: 512px;
  }

  & .alert {
    margin-bottom: 32px;
    width: 100%;
  }

  & .logo {
    margin-bottom: 32px;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 8px;
    width: 100%;
  }
`;
