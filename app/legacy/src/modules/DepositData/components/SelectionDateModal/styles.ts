import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;
  overflow-y: auto;
  max-height: auto;

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    max-height: 90vh;
  }

  & .calendar-icon {
    margin: ${({theme}) => theme.spacing.md} 0;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: ${({theme}) => `${theme.spacing.md} ${theme.spacing.xl}`};

  }
  & .padding {
    padding: 0 ${({theme}) => theme.spacing.xl} ${({theme}) => theme.spacing.md};
    & > *:not(:last-child) {
      margin-bottom: ${({theme}) => theme.spacing.xs};
    }
  }

  & .calendar {
    display: inline-flex;
    flex-direction: column;
    text-align: start;
    width: 100%;
    padding-bottom: ${({theme}) => theme.spacing.md};
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
`;
