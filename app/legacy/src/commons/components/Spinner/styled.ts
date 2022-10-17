import styled from 'styled-components';

export const Background = styled.div<{
  fullScreen: boolean;
}>`
  position: ${({fullScreen}) => (fullScreen ? 'fixed' : 'absolute')};
  top: 0;
  left: 0;
  height: ${({fullScreen}) => (fullScreen ? '100vh' : '100%')};
  width: 100%;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({theme}) => theme.zIndex.loader};
`;

export const SmallSpinner = styled.div`
  border: 4px solid ${({theme}) => theme.colors.primary[500]};
  border-radius: 50%;
  border-top: 4px solid ${({theme}) => theme.colors.gray[100]};
  width: 24px;
  height: 24px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 0.75s linear infinite;
`;
