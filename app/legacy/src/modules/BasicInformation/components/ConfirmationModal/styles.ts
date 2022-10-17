import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 16px 0;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
    }
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
