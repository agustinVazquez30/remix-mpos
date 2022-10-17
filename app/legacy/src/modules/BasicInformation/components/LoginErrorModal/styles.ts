import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 16px 0;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
      padding: 0px;
    }
  }

  .message {
    color: ${({theme}) => theme.colors.secondary[900]};
    margin: 16px 0;
    padding: 0px 64px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 20px 0;
      padding: 0px 43px;
    }
  }

  .error-modal-button {
    margin-top: 16px;
    margin-bottom: 8px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin-top: 24px;
    }
  }

  & .logo {
    width: 148px;
    height: 48px;
    margin-top: 24px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: initial;
    }
  }
`;
