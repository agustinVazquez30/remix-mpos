import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: start;

  & .row {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    margin: 24px 0;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      flex-direction: row;
      gap: 24px;
    }

    & .field {
      flex: 1;
    }
  }

  & .disabled {
    pointer-events: none;

    & input {
      background-color: ${({theme}) => theme.colors.gray[200]};
    }
  }

  & .label-phone-input {
    margin-bottom: 4px;
    color: ${({theme}) => theme.colors.gray[800]};
  }

  & .input-checkbox {
    margin-bottom: ${({theme}) => theme.spacing.md};

    .link {
      color: ${({theme}) => theme.colors.gray[800]};
      font-weight: bold;
      text-decoration: underline;
    }
  }

  & .button-container {
    max-width: 122px;
    margin: ${({theme}) => theme.spacing.xxxl} 0
      ${({theme}) => theme.spacing.xxxl} auto;
    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      max-width: 100%;
      .button-styled {
        position: fixed;
        bottom: 0;
        width: 90%;
        &:disabled {
          background-color: ${({theme}) => theme.colors.gray[300]};
        }
      }
    }
  }
`;
