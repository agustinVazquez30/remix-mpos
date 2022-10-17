import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;

  & .footer {
    display: flex;
    margin-top: 32px;

    & :first-child {
      color: ${({theme}) => theme.colors.secondary[700]};
    }

    & :last-child {
      color: ${({theme}) => theme.colors.info[500]};
      cursor: pointer;
      font-weight: bold;
      margin-left: 8px;
      text-decoration: underline;
    }
  }

  & .google-login {
    margin: 24px 0 16px 0;
  }
`;
