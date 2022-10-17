import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;

  ${({theme}) => theme.breakpointsMinWidth.md} {
    margin-bottom: 24px;
  }

  .logo {
    height: 40px;
    width: 124px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: none;
    }
  }

  .circle {
    display: none;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
      width: 56px;
      border-radius: 50%;
      background-color: ${({theme}) => theme.colors.primary[100]};
      margin-bottom: 16px;
    }
  }

  .step-description {
    margin-top: 8px;
    margin-bottom: 4px;
    color: ${({theme}) => theme.colors.gray[600]};

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: none;
    }
  }

  & .title {
    color: ${({theme}) => theme.colors.gray[800]};
  }

  & .helpText {
    color: ${({theme}) => theme.colors.gray[700]};
    margin-top: 4px;
  }
`;

export const BackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  cursor: pointer;

  ${({theme}) => theme.breakpointsMinWidth.md} {
    display: none;
  }
`;
