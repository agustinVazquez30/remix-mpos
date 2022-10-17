import styled from 'styled-components';

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;

  img {
    align-self: center;
    margin-bottom: 16px;
    width: 148px;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 32px;
  }

  & .login-button {
    margin-bottom: 8px;
  }

  & .continue-button {
    border: 1px solid;
    border-color: ${({theme}) => theme.colors.secondary[700]};
  }
`;
