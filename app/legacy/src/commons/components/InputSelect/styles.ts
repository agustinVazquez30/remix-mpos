import {FormEvent, InputHTMLAttributes} from 'react';

import {FontVariant} from '@30sas/web-ui-kit-theme';
import styled from 'styled-components';

export interface InputProps {
  label?: string;
  helpText?: string;
  value: string;
  error?: boolean;
  maxLength?: number;
  minLength?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  withoutBorder?: boolean;
  onChange?: (value: FormEvent<HTMLInputElement>) => void;
  textVariant?: FontVariant;
  errorText?: string;
  disabled?: boolean;
  baseProps?: InputHTMLAttributes<HTMLInputElement>;
  rounded?: 'xl' | 'lg' | 'md' | 'sm';
  type?: string;
  onKeyUp?: (e: string) => void;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  & .label-document {
    margin-top: 0px;
    margin-bottom: 4px;
  }
  & .errorParagraph {
    color: ${({theme}) => theme.colors.danger[500]};
    font-size: 12.7px;
    margin: 0;
    margin-top: 2px;
  }
`;

export const MainContainer = styled.div<{
  borderColor: string | undefined;
}>`
  display: flex;
  flex-direction: column;
  border-radius: ${({theme}) => theme.spacing.xxs};
  border: 0.5px solid ${({borderColor}) => borderColor};
`;

export const SelectContainer = styled.div<{
  disabled?: boolean;
  borderColor: string | undefined;
}>`
  height: 40px;
  display: flex;
  font-size: ${({theme}) => theme.spacing.md};
  background: transparent;

  & .SelectInput {
    border: 0px;
  }

  & .input {
    border-left: 0.5px solid ${({borderColor}) => borderColor};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    min-width: 100px;
  }
`;

export const Input = styled.input<InputProps>`
  flex: 1;
  box-sizing: 'border-box';
  border: none;
  :focus-visible {
    outline: -webkit-focus-ring-color auto 0px;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${({rounded, theme}) => ({
    'border-radius': rounded ? theme.corners[rounded] : theme.corners.md,
    padding: theme.spacing.xs + ' ' + theme.spacing.md,
    ...theme.fonts.nunito.medium,
  })}
`;
