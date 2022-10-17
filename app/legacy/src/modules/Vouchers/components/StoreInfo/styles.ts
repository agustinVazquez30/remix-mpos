import styled from 'styled-components';

export const Box = styled.div`
  text-align: center;
  width: 100%;
  margin-top: ${({theme}) => theme.spacing.sm};
  padding-bottom: ${({theme}) => theme.spacing.lg};
  border-bottom: 0.53px solid ${({theme}) => theme.colors.gray[500]};

  .title {
    margin: ${({theme}) => `0 0 ${theme.spacing.md} 0`};
    color: ${({theme}) => theme.colors.gray[900]};
  }

  .sub-title {
    color: ${({theme}) => theme.colors.gray[800]};
    margin: 0;
  }

  .label-with-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${({theme}) => theme.spacing.sm};

    img {
      margin-right: ${({theme}) => theme.spacing.xs};
    }

    .map-icon {
      height: 16px;
      width: auto;
    }

    .email-icon {
      height: 14px;
      width: auto;
    }
  }
`;
