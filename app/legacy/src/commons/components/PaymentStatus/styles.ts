import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 448px;
  justify-content: center;
  align-items: center;

  & .header {
    text-align: center;

    p:not(:first-child) {
      margin-top: 8px;
    }
  }
  & .newAccountConfirmation {
    text-align: center;
    margin-bottom: 24px;
    padding: 0 23px;
  }
  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    display: contents;
    .button-finish {
      position: fixed;
      bottom: 0;
      width: 90%;
    }
  }
`;
export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  .pos-image {
    width: 8rem;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: 10rem;
      left: 0;
    }
  }
`;

export const ContainerPaymentCash = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 0em - 120px);
  max-width: 448px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: -40px;
  & .header {
    text-align: center;

    p:not(:first-child) {
      margin-bottom: 15px;
    }
  }
  & .spacing {
    margin-top: 24px;
  }
  & .Alert {
    margin-left: 17px;
  }
  & .ButtonHunter {
    width: 100%;
    margin-bottom: 24px;
  }
  & .InfoSend {
    text-align: center;
    margin-bottom: 24px;
  }
  & .newAccountConfirmation {
    margin-top: 20px;
    padding: 0 23px;
  }

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    display: contents;
    .button-finish {
      position: fixed;
      bottom: 0;
      width: 90%;
    }
  }
`;

export const Circle = styled.div<{variant: 'pending' | 'success'}>`
  display: flex;
  height: 96px;
  width: 96px;
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 100%;
  background-color: ${({theme, variant}) =>
    variant === 'success'
      ? theme.colors.success[100]
      : theme.colors.warning[100]};
  justify-content: center;
  align-items: center;

  img {
    height: 58px;
    width: 58px;
  }
`;
