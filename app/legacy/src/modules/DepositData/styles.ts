import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: start;

  & .link {
    display: flex;
    cursor: pointer;
    margin-top: 12px;
    margin-bottom: 16px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin-top: 16px;
      margin-bottom: 24px;
    }

    & .text-link {
      margin: 0 5px;
      color: ${({theme}) => theme.colors.info[500]};
      text-decoration: underline;
      ${({theme}) => theme.fonts.nunito.xsmallbold}
    }
  }

  & .row {
    display: flex;
    flex-direction: column;
    gap: ${({theme}) => theme.spacing.sm};

    ${({theme}) => theme.breakpointsMinWidth.md} {
      flex-direction: row;
    }

    & .field {
      flex: 1;
    }
  }

  & .account-type-label {
    color: ${({theme}) => theme.colors.gray[800]};
    margin-top: ${({theme}) => theme.spacing.sm};
    margin-bottom: ${({theme}) => theme.spacing.xs};
  }

  & .payment-type-label {
    color: ${({theme}) => theme.colors.gray[800]};
    margin-top: ${({theme}) => theme.spacing.xl};
    margin-bottom: ${({theme}) => theme.spacing.xs};
  }

  & .special-row {
    display: flex;
    gap: ${({theme}) => theme.spacing.sm};
    & .field {
      flex: 1;
    }
  }
  & .paymentContent {
    display: flex;
    flex-wrap: wrap;
    gap: ${({theme}) => theme.spacing.sm};
    & .field {
      flex: 1 0 40%;
    }
    & .second-column {
      flex-grow: inherit;
      flex-basis: 49%;
    }
    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      display: grid;
    }
  }

  & .container-button {
    display: flex;
    justify-content: flex-end;
    margin-top: ${({theme}) => theme.spacing.xl};

    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      width: 100%;
      .action-button {
        position: fixed;
        bottom: 0;
        width: 91%;
        &:disabled {
          background-color: ${({theme}) => theme.colors.gray[300]};
        }
      }
    }
  }

  & .info-icon {
    font-size: 20px;
  }
`;
