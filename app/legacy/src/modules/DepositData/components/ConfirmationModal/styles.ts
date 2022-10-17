import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;
  overflow-y: auto;
  max-height: auto;

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    max-height: 90vh;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 16px 0;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
    }
  }

  & .alert-text {
    text-align: start;
  }

  & .row {
    display: flex;
    margin-top: ${({theme}) => theme.spacing.md};
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
