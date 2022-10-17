import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  & .logo {
    margin: 32px 0;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 8px;
  }

  & .subtitle {
    color: ${({theme}) => theme.colors.gray[700]};
    margin-bottom: 24px;
  }

  & .edit-phone {
    margin: 8px 0 0 0;
  }
`;
