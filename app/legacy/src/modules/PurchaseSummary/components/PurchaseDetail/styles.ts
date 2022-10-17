import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  background: ${({theme}) => theme.colors.gray[100]};
  border: 0.5px solid ${({theme}) => theme.colors.gray[500]};
  border-radius: ${({theme}) => theme.corners.xl};
  margin: 16px 0;
  display: flex;
  flex-direction: column;

  & .row {
    display: flex;
    margin-bottom: 16px;

    & .label {
      flex: 0.7;
      display: flex;
      align-items: center;

      path {
        fill: ${({theme}) => theme.colors.gray[700]};
      }

      p {
        margin-left: 10px;
        color: ${({theme}) => theme.colors.gray[700]};
      }
    }

    & .value {
      flex: 0.5;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-left: 12px;

      p {
        color: ${({theme}) => theme.colors.secondary[700]};
      }

      .chip {
        width: 66px;

        p {
          color: ${({theme}) => theme.colors.neutrals[100]};
        }
      }
      .old-price {
        text-decoration: line-through;
        margin-right: 10px;
      }
    }
  }

  & .separator {
    border-top: 0.5px solid ${({theme}) => theme.colors.gray[500]};
    margin-bottom: 16px;
  }
`;
