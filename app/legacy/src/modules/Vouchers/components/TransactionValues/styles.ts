import styled from 'styled-components';

export const Box = styled.div`
  width: 100%;
  padding: ${({theme}) => theme.spacing.lg} 0 ${({theme}) => theme.spacing.md} 0;

  .row {
    display: flex;
    padding-bottom: ${({theme}) => theme.spacing.md};

    .label {
      flex: 0.6;
      margin: auto 0;

      p {
        display: block;
        color: ${({theme}) => theme.colors.gray[900]};
        margin: 0;

        ${({theme}) => theme.breakpointsMinWidth.sm} {
          display: inline;
        }
      }

      .description {
        margin-right: ${({theme}) => theme.spacing.xs};
      }
    }

    .value {
      flex: 0.6;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-left: ${({theme}) => theme.spacing.sm};

      p {
        color: ${({theme}) => theme.colors.gray[900]};
        margin: 0;
      }
    }
  }
`;
