import styled from 'styled-components';

export const Box = styled.div`
  width: 100%;
  padding-top: ${({theme}) => theme.spacing.lg};

  .row {
    display: flex;
    padding-bottom: ${({theme}) => theme.spacing.md};

    .label {
      flex: 0.5;
      margin: auto 0;

      .label-text {
        color: ${({theme}) => theme.colors.gray[800]};
        margin: 0;
      }
    }

    .value {
      flex: 0.7;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-left: ${({theme}) => theme.spacing.sm};

      .value-text {
        color: ${({theme}) => theme.colors.gray[900]};
        margin: 0;
      }

      .credit-card-icon {
        height: ${({theme}) => theme.spacing.lg};
        margin-right: ${({theme}) => theme.spacing.xs};
      }

      .signature {
        display: flex;
        justify-content: flex-end;
        height: 80px;
        width: 100%;

        img {
          max-width: 100%;
          max-height: 80px;
        }
      }
    }
  }
`;
