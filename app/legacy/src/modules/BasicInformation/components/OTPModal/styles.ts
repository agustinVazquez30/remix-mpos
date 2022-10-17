import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 8px;
    width: 100%;
  }

  & .row {
    display: flex;
    margin-bottom: 8px;

    & .label {
      flex: 0.5;

      p {
        color: ${({theme}) => theme.colors.gray[800]};
        text-align: start;
      }
    }

    & .value {
      flex: 0.7;
      padding-left: 12px;

      p {
        color: ${({theme}) => theme.colors.secondary[700]};
        text-align: end;
      }
    }
  }

  .confirm-data-button {
    margin-top: 16px;
    margin-bottom: 8px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin-top: 24px;
    }
  }
`;

export const Container = styled.div<{isTimerActive: boolean}>`
  width: 100%;
  padding-top: 40px;

  & .logo {
    margin: 20px;
  }

  & .subtitle {
    color: ${({theme}) => theme.colors.gray[700]};
    margin-bottom: 24px;

    & .edit-link {
      color: ${({theme}) => theme.colors.info[500]};
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
    }
  }

  & .verification-code {
    justify-content: center;
    margin: 24px 0;
  }

  & .continue-button {
    margin-top: 4px;
  }

  & .footer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    & :last-child {
      margin-top: 16px;
    }

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      flex-direction: row;

      & :last-child {
        margin-top: 0;
      }
    }

    & .footer-action {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex: 1;
      justify-content: center;

      & :first-child {
        fill: ${({theme, isTimerActive}) =>
          !isTimerActive ? theme.colors.info[500] : theme.colors.gray[500]};
        margin-right: 8px;
      }

      & p {
        color: ${({theme, isTimerActive}) =>
          !isTimerActive ? theme.colors.info[500] : theme.colors.gray[500]};
        margin: 0;
        text-decoration: underline;
      }
    }
  }
`;
