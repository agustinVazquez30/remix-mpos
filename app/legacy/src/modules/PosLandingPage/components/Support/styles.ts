import styled from 'styled-components';

export const SupportSection = styled.div`
  display: flex;
  align-items: center;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 2em 1.5em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    margin-bottom: 3rem;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      text-align: left;
      font-size: 22px;
      margin-bottom: 0;
    }
  }

  .help-button {
    width: 13rem;
    margin: 2rem 0 0 0;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: 100%;
      margin: 1rem 0 0 0;
    }
  }
`;

export const LeftSupportSection = styled.div`
  position: relative;
  width: 50%;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    width: 100%;
  }
`;

export const GreenSection = styled.div`
  background-color: ${({theme}) => theme.colors.success[500]};
  height: 35rem;
  width: 25rem;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    display: none;
  }
`;

export const SupportImgContainer = styled.div`
  top: 8rem;
  left: 10rem;
  position: absolute;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    position: relative;
    display: flex;
    top: 0;
    left: 0;
  }
`;

export const SupportImg = styled.img`
  width: 30rem;
  height: auto;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    width: 22rem;
  }
`;

export const RightSupportSection = styled.div`
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 0;
  }

  .title {
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 22px;
      margin: 0;
      margin-top: 1rem;
    }
  }

  ul {
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      margin: 0 1.5rem;
    }
  }
`;
