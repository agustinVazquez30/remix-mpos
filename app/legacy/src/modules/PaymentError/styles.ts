import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 580px;
  padding-left: ${({theme}) => theme.spacing.lg};
  padding-right: ${({theme}) => theme.spacing.lg};
  padding-top: 30px;
  cursor: default;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    padding-top: 0px;
  }

  .backgroundCloseIcon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 88px;
    height: 88px;
    background-color: ${({theme}) => theme.colors.danger[100]};
    border-radius: 50px;
    margin-top: 14px;

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      width: 96px;
      height: 96px;
      margin-top: 100px;
    }
  }

  .closeIcon {
    fill: ${({theme}) => theme.colors.danger[500]};
    width: 58.67px;
    height: 58.67px;
  }

  .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    max-width: 400px;
    margin-bottom: 8px;
  }

  .message {
    font-family: 'Nunito Sans';
    font-size: '1rem';
    line-height: '1.5rem';
    font-weight: 400;
    font-style: 'normal';
    color: ${({theme}) => theme.colors.secondary[700]};
    display: inline;
    margin: 0;
    max-width: 450px;

    p {
      margin: 0;
      display: inline;
    }
  }

  .emailText {
    display: inline;
    font-size: '1rem';
    line-height: '1.5rem';
    font-weight: 700;
    font-style: 'normal';
    color: ${({theme}) => theme.colors.info[500]};
  }

  button {
    margin-top: ${({theme}) => theme.spacing.lg};
    span {
      margin: 0 9px;
    }
    path {
      fill: ${({theme}) => theme.colors.success[500]};
    }
  }
`;
