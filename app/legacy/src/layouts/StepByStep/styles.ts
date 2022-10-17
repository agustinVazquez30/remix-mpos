import styled, {css} from 'styled-components';

export const Container = styled.div<{
  maxWidth?: string;
}>`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.colors.neutrals[100]};

  & .stepper-container {
    margin-top: 40px;
    position: absolute;
    width: 100%;
    padding-right: 45px;
  }

  & .left-container {
    flex: 0.3;
    height: 100%;
    display: none;
    padding: 16px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: flex;
    }

    & .box {
      height: 100%;
      width: 100%;
      background-color: ${({theme}) => theme.colors.primary[100]};
      border-radius: ${({theme}) => theme.corners.xl};
      position: relative;
      padding: 40px;

      & .logo {
        width: 125px;
      }

      & .header-img {
        position: absolute;
        width: 100%;
        border-top-right-radius: ${({theme}) => theme.corners.xl};
        top: 0;
        right: 0;
      }

      & .footer-img {
        position: absolute;
        width: 100%;
        border-bottom-left-radius: ${({theme}) => theme.corners.xl};
        border-bottom-right-radius: ${({theme}) => theme.corners.xl};
        bottom: 0;
        right: 0;
      }
    }
  }

  & .right-container {
    position: relative;
    flex: 1;
    background-color: ${({theme}) => theme.colors.neutrals[100]};
    display: flex;
    justify-content: center;
    overflow-y: auto;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      flex: 0.7;
    }

    .content {
      width: 100%;
      height: fit-content;
      padding: 16px 16px 120px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      ${({theme}) => theme.breakpointsMinWidth.md} {
        padding: ${({theme}) => theme.spacing.xxxl} 16px 120px 16px;
      }

      ${({maxWidth}) =>
        !!maxWidth &&
        css`
          max-width: ${maxWidth};
        `}

      .mpos-logo {
        position: absolute;
        top: 0;
        right: 0;

        ${({theme}) => theme.breakpointsMinWidth.md} {
          display: none;
        }
      }
    }

    .float-button {
      position: fixed;
      bottom: 16px;
      right: 16px;
      height: min-content;

      ${({theme}) => theme.breakpointsMaxWidth.sm} {
        top: 24px;
        position: absolute;
      }

      button {
        span {
          margin: 0;
        }
        path {
          fill: ${({theme}) => theme.colors.success[500]};
        }
      }
    }
  }
`;
