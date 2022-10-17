import styled from 'styled-components';

export const ContentButtonWhatsapp = styled.div<{fullWidth: boolean}>`
  width: ${({fullWidth}) => (fullWidth ? '100%' : 'initial')};
  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    .button {
      background-color: #ebf9f1;
      border-radius: ${({fullWidth}) => (fullWidth ? '0px' : '50px')};
    }
  }
`;
