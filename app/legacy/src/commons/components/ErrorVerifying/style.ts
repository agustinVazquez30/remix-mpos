import styled from 'styled-components';

export const Container = styled.div<{
  containerMaxWidth: string;
  titleMaxWidth: string;
  messageMaxWidth: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: ${({containerMaxWidth}) => containerMaxWidth};
  padding-left: ${({theme}) => theme.spacing.lg};
  padding-right: ${({theme}) => theme.spacing.lg};
  cursor: default;

  .backgroundInfoIcon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 88px;
    height: 88px;
    background-color: ${({theme}) => theme.colors.warning[100]};
    border-radius: 50px;
    margin-top: 14px;

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      width: 96px;
      height: 96px;
      margin-top: 100px;
    }
  }

  .infoIcon {
    fill: ${({theme}) => theme.colors.warning[500]};
    width: 58.67px;
    height: 58.67px;
  }

  .title {
    max-width: ${({titleMaxWidth}) => titleMaxWidth};
    margin-bottom: 0;
    color: ${({theme}) => theme.colors.secondary[700]};
  }

  .message {
    max-width: ${({messageMaxWidth}) => messageMaxWidth};
    margin-top: 8px;
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: ${({theme}) => theme.spacing.lg};
  }

  button {
    span {
      margin: 0 9px;
    }
    path {
      fill: ${({theme}) => theme.colors.success[500]};
    }
  }
`;
