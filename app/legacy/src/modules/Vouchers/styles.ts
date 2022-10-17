import styled from 'styled-components';

export const Header = styled.div`
  height: 7rem;
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary[500]};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${({theme}) => theme.spacing.md};

  ${({theme}) => theme.breakpointsMinWidth.md} {
    height: 5rem;
    align-items: center;
  }

  button {
    path {
      fill: ${({theme}) => theme.colors.neutrals[100]};
    }
  }
`;

export const BoxLogo = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  border: 0.53px solid ${({theme}) => theme.colors.gray[400]};
  margin-top: -36px;
  margin-bottom: ${({theme}) => theme.spacing.sm};

  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({theme}) => theme.spacing.md};
  width: 100%;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    width: 560px;
  }
`;

export const BottomSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.gray[200]};
`;

export const Footer = styled.div`
  width: 100%;
  padding: ${({theme}) => theme.spacing.md};
  display: flex;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.gray[200]};

  .created-by {
    display: flex;
    align-items: center;

    .created-text {
      color: ${({theme}) => theme.colors.gray[700]};
      margin: 0;
    }

    img {
      height: ${({theme}) => theme.spacing.lg};
      width: ${({theme}) => theme.spacing.lg};
      margin: 0 ${({theme}) => theme.spacing.xs};
    }
  }
`;
