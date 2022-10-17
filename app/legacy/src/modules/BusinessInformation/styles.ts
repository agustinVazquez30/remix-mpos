import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'firstRow';
  width: 100%;
  & p {
    margin-left: 0;
  }

  & .title-input {
    color: ${({theme}) => theme.colors.gray[800]};
    margin-top: 0;
    margin-bottom: 4px;
  }

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin-bottom: 4px;
  }

  & .custom-input {
    max-width: 336px;
    margin-bottom: 16px;

    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      max-width: 100% !important;
    }
  }

  & .next-button {
    justify-self: flex-end;
    width: 121px;
    height: 40px;
    margin-top: ${({theme}) => theme.spacing.xl};
    ${({theme}) => theme.breakpointsMaxWidth.sm} {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2rem);
      &:disabled {
        background-color: ${({theme}) => theme.colors.gray[300]};
      }
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;

    & .business-name {
      padding-top: 24px;
    }
  }

  & .nit-document-alert {
    margin-top: 2px;
    width: max-content;
  }
`;

export const RowTypePerson = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  margin-bottom: 16px;
`;
