import styled, {css} from 'styled-components';
import {TreintaTheme} from '@30sas/web-ui-kit-theme';

export const Container = styled.div<{
  checked: boolean;
  disabled: boolean;
  endIcon: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: ${({endIcon}) => (endIcon ? '12px' : '0')};

  ${({theme, checked}) => `
    border: 1px solid ${
      checked ? theme.colors.success[400] : theme.colors.gray[500]
    };
    border-radius: ${theme.corners.md};
    padding: ${theme.utils.spacing(2, 3, 2, 3)};
    ${
      checked
        ? `
      & span {
        border: none;
      }
    `
        : ''
    }
  `}

  & label {
    margin-left: 0;
    margin-right: 0;
  }

  & p {
    margin: 0;
    padding: 0;
  }

  .icon-container {
    margin-top: 8.5px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin-top: 1.5px;
    }
  }

  .p-text {
    color: ${({theme}) => theme.colors.neutrals};
  }

  ${({theme}) => theme.breakpointsMinWidth.md} {
    height: 40px;
  }

  ${({disabled}) =>
    disabled &&
    css`
      pointer-events: none;
      background-color: ${({theme}) => theme.colors.gray[200]};
    `}
`;

export const popoverPragraphStyle = {
  width: ' 13em',
  backgroundColor: `${TreintaTheme.colors.secondary[700]}`,
  opacity: '1',
  padding: '1px',
  borderRadius: '7px',
};
