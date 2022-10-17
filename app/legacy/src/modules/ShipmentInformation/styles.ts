import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    margin-left: 0;
  }
  & .title-input {
    color: ${({theme}) => theme.colors.gray[800]};
    margin: 0 0 4px 0;
  }
  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 4px;
  }
  & .description {
    color: ${({theme}) => theme.colors.gray[700]};
    margin-top: 0;
  }
  & .custom-input {
    max-width: 336px;
    margin-bottom: 16px;
  }
  & .next-button {
    align-self: flex-end;
    width: 121px;
    height: 40px;
    & p {
      ${({theme}) => theme.fonts.nunito['medium']}
    }
    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      width: 100%;
      position: fixed;
      bottom: 0;
      width: 91%;
      &:disabled {
        background-color: ${({theme}) => theme.colors.gray[300]};
      }
    }
  }

  & .input-checkbox {
    margin-bottom: ${({theme}) => theme.spacing.md};
  }

  & path {
    fill: ${({theme}) => theme.colors.info[500]};
  }

  & .alert-text {
    color: ${({theme}) => theme.colors.info[700]};
    margin: 0 0 0 12px;
  }

  & .alert {
    margin-bottom: 16px;

    & span {
      font-size: 0.75rem;
      padding-left: 12px;
    }

    > * {
      &:first-child {
        padding: 12px;
      }
    }
  }
`;

export const AddressRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  margin-bottom: 16px;
  max-width: 336px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    align-items: start;
    max-width: 688px;
  }
`;

export const RowButton = styled.div`
  max-width: 668px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
