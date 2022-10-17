import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 24px 0;
  padding: 16px;
  background-color: ${({theme}) => theme.colors.gray[100]};
  border: 0.5px solid ${({theme}) => theme.colors.gray[400]};
  border-radius: ${({theme}) => theme.corners.xl};
  box-shadow: none;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }

  & .row {
    display: flex;
    flex-direction: row;
  }

  & .label {
    flex: 0.7;
    display: flex;
    flex-direction: row;
    align-items: center;

    path {
      fill: ${({theme}) => theme.colors.gray[700]};
    }

    & p {
      margin-left: 10px;
      color: ${({theme}) => theme.colors.gray[700]};
    }
  }

  & .value {
    flex: 0.3;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .chip {
      width: 66px;

      p {
        color: ${({theme}) => theme.colors.neutrals[100]};
      }
    }
  }

  & .separator {
    border-top: 0.5px solid ${({theme}) => theme.colors.gray[400]};
  }
`;
