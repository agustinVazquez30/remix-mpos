import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.colors.neutrals[100]};
  position: relative;
  align-content: center;
  padding-top: 30px;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    padding-top: 90px;
  }

  #figuresImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 332px;
    visibility: hidden;
    z-index: 1;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      visibility: visible;
    }
  }

  #treintaImage {
    width: 124px;
    height: 40px;
    margin-bottom: 20px;

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      width: 173px;
      height: 56px;
      margin-bottom: 10px;
    }
  }

  .contentContainer {
    z-index: 2;
  }

  #mposImage {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 584px;
    height: 440px;
    visibility: hidden;
    z-index: 1;

    ${({theme}) => theme.breakpointsMinWidth.lg} {
      visibility: visible;
    }
  }
`;
