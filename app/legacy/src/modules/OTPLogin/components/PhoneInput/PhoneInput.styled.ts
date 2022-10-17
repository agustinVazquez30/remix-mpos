import {InputBase, MenuItem} from '@mui/material';

import styled, {useTheme} from 'styled-components';
import {InputProps} from './types';
import {Theme} from '@30sas/web-ui-kit-theme';
import {Typography} from '@30sas/web-ui-kit-core';

export const MainContainer = styled.div<{
  error: boolean;
  open: boolean;
  focus: boolean;
  width: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${({width}) => width};
  border-radius: ${({theme}) => theme.spacing.xxs};
  ${({error, open, theme, focus}) => {
    if (error) {
      return `
        border: 1px solid ${theme.colors.danger[500]};
      `;
    }
    if (open || focus) {
      return `
        border: 1.5px solid ${theme.colors.secondary[700]};
        margin-bottom: 20px;
      `;
    }
    return `
      border: 1px solid ${theme.colors.gray[600]};
      margin-bottom: 20px;
      margin-top: 1px;
    `;
  }}
`;

export const SelectContainer = styled.div`
  height: 40px;
  display: flex;
  font-size: ${({theme}) => theme.spacing.md};
  background: transparent;
`;

export const ErrorMessage = styled(Typography)(({theme}: {theme: Theme}) => ({
  color: theme.colors.danger[500],
  margin: theme.utils.spacing(1, 0, 2, 0),
  width: '100%',
}));

export const SelectInput = styled(InputBase)<{
  disabled: boolean;
  error: boolean;
  open: boolean;
  theme: Theme;
}>`
  div:nth-child(1) {
    padding: 8px 8px;
  }
  ${({theme}) => theme.fonts.nunito.medium};
  ${({error, disabled, open, theme}) => {
    if (error) {
      return `border-right: 0.5px solid ${theme.colors.danger[500]};`;
    }
    if (disabled) {
      return `background-color: ${theme.colors.gray[200]};`;
    }
    if (open) {
      return `border-right: 1.5px solid ${theme.colors.secondary[700]};`;
    }
    return `border-right: 1px solid ${theme.colors.gray[700]};`;
  }}
`;

export const SelectItemContainer = styled(MenuItem)<{width: string}>`
  justify-content: start;
  font-family: Nunito Sans;
  width: ${({width}) => width};
`;
export const SelectItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CodeWrapper = styled.p`
  font-size: 1rem;
  margin: 0px ${({theme}) => theme.spacing.xxs} 0px 0px;
  font-family: ${({theme}) => theme.fonts.nunito.medium};
`;

export const Input = styled.input<InputProps>`
  flex: 1;
  width: 100%;
  box-sizing: 'border-box';
  border: none;
  outline: none;
  :focus-visible {
    outline: -webkit-focus-ring-color auto 0px;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  ${({rounded, theme}) => ({
    'border-radius': rounded ? theme.corners[rounded] : theme.corners.md,
    padding: theme.spacing.xs + ' ' + theme.spacing.md,
    ...theme.fonts.nunito.medium,
  })}
`;

export const MenuPhoneProps = () => {
  const theme = useTheme() as Theme;
  return {
    PaperProps: {
      style: {
        maxHeight: 190,
        autoWidth: true,
        border: '1px solid ' + theme.colors.secondary[700],
        borderRadius: 3,
        boxShadow: 'none',
        marginTop: theme.spacing.xxxs,
      },
    },
  };
};
