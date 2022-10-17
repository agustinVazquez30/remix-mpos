import {CountriesIds, Country} from '@30sas/web-ui-kit-utils';
import {FormEvent, InputHTMLAttributes, ReactNode} from 'react';
import {FontVariant} from '@30sas/web-ui-kit-theme';

export interface PhoneInputProps {
  width: string;
  phone: string;
  defaultCountryId: CountriesIds;
  disabled?: boolean;
  placeholder?: string;
  hasError?: boolean;
  msgError?: string | ReactNode;
  dataTestId?: string;
  testIdSelectInput?: string;
  testIdSelectItemWrapper?: string;
  testIdIconFlag?: string;
  testIdLabelCountryCode?: string;
  testIdInputCellPhone?: string;
  testIdErrorMessage?: string;
  onBlur?: () => void;
  onChangePhone: (value: string, valid: boolean) => void;
  onChangeCountry: (value: Country, valid: boolean) => void;
}

export interface textFieldType {
  error?: boolean;
}

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
  dataTestId?: string;
}
