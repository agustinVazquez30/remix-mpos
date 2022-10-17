import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 560px;
  margin-top: ${({theme}) => theme.spacing.lg};

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 24px 0;
  }

  & .spacing {
    margin: 24px 0;
  }

  & .list {
    margin-left: 40px;
    color: ${({theme}) => theme.colors.info[700]};
    ${({theme}) => theme.fonts.nunito.small};
  }

  & .product-selector {
    display: flex;
    align-items: center;

    & .detail {
      display: flex;
      align-items: center;
      flex: 1;
      margin-right: 12px;

      & p {
        margin-left: 20px;
      }
    }

    & .quantity-input {
      & div {
        width: 88px;
        height: 32px;
      }
    }
  }
`;
