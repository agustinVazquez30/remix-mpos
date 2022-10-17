import styled from 'styled-components';

export const FooterSection = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: flex-start;
  justify-items: center;
  justify-content: center;
  padding: 6rem;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 1em 1.5em;
    grid-template-columns: 1fr;
  }

  .links {
    margin: 0;
    padding: 0;
  }

  .socialNetworks {
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5em;
    }
  }

  .copyright {
    color: ${({theme}) => theme.colors.gray[700]};
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      display: none;
    }
  }
`;

export const FooterColumns = styled.div`
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Contact = styled.div`
  margin: 0.5em 1em;
  line-height: 1.5rem;
  cursor: pointer;
`;

export const HelpFloatButton = styled.div`
  display: flex;
  .floatHelpButton {
    justify-content: center;
    position: absolute;
    bottom: 8em;
    width: 20em;
    right: 4em;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      position: initial;
      justify-content: center;
    }
  }
`;

export const LinkFooter = styled.div`
  cursor: pointer;
`;
