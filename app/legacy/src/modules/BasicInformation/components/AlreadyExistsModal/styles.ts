import styled from 'styled-components';

export const PopupContent = styled.div<{
  isNoLoginPOS: boolean;
}>`
  text-align: center;
  width: 100%;

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 16px 0;
    ${({isNoLoginPOS}) => isNoLoginPOS && 'padding: 0px 64px;'}

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
      padding: 0px;
    }
  }

  .subtitle {
    color: ${({theme}) => theme.colors.secondary[900]};
    margin: 16px 0;
    padding: 0px 64px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
      padding: 0px;
    }
  }

  .confirm-data-button {
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
    ${({isNoLoginPOS}) => isNoLoginPOS && 'display: none;'}

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: initial;
    }
  }
`;
