import {
  CodeWrapper,
  ErrorMessage,
  Input,
  MainContainer,
  MenuPhoneProps,
  SelectContainer,
  SelectInput,
  SelectItemContainer,
  SelectItemWrapper,
} from './PhoneInput.styled';
import {Country, getCountry, getCountryList} from '@30sas/web-ui-kit-utils';
import {FC, FormEvent, useEffect, useState} from 'react';
import {ENABLED_COUNTRIES} from '../../../../commons/constants/constants';
import {PhoneInputProps} from './types';
import {Select} from '@mui/material';
import {Theme} from '@30sas/web-ui-kit-theme';
import {useTheme} from 'styled-components';

export const PhoneInput: FC<PhoneInputProps> = ({
  phone,
  msgError,
  placeholder,
  defaultCountryId,
  onBlur,
  onChangePhone,
  onChangeCountry,
  width = '100%',
  hasError = false,
  testIdSelectInput = 'phoneInput_selectInput',
  testIdSelectItemWrapper = 'phoneInput_selectItemWrapper',
  testIdIconFlag = 'phoneInput_iconFlag_',
  testIdLabelCountryCode = 'phoneInput_label_countryCode_',
  testIdInputCellPhone = 'phoneInput_input_cellPhone',
  testIdErrorMessage = 'phoneInput_errorMessage_numberInvalid',
}) => {
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [numberPhone, setNumberPhone] = useState<string>(phone);
  const [countrySelected, setCountrySelected] = useState<Country>(
    getCountry(defaultCountryId),
  );
  const [phoneDigits, setPhoneDigits] = useState<number>(defaultCountryId);
  const theme = useTheme() as Theme;

  const countryCodes = getCountryList()
    .filter(({enable}) => enable)
    .map((country: Country) => ({
      id: country.id,
      name: country.name,
      flag: country.flag,
      countryCode: country.code,
      digits: country.digits,
      acronym: country.acronym,
    }))
    .filter(country => ENABLED_COUNTRIES.includes(country.id));

  const handleChangeCountry = ({target: {value}}: any) => {
    const country = getCountry(value);
    setPhoneDigits(value);
    setCountrySelected(country);
    const isValid = isValidPhone(numberPhone, country);
    onChangeCountry(country, isValid);
  };

  const handleOpen = (): void => {
    setSelectIsOpen(true);
  };
  const handleClose = (): void => {
    setSelectIsOpen(false);
  };
  const handleFocus = (): void => {
    setIsFocus(true);
  };
  const handleFocusOut = (): void => {
    setIsFocus(false);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
    const phone = String(e.currentTarget.value).replace(/\D/g, '');
    setNumberPhone(phone);
    const isValid = isValidPhone(phone);
    onChangePhone(phone, isValid);
  };

  const isValidPhone = (numericValue: string, country?: Country): boolean => {
    const currentCountry = country ? country : countrySelected;
    const validPhone = !currentCountry.digits.includes(numericValue.length);
    if (validPhone) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    setNumberPhone(phone);
  }, [phone]);

  useEffect(() => {
    setCountrySelected(getCountry(defaultCountryId));
    setPhoneDigits(defaultCountryId);
  }, [defaultCountryId]);

  return (
    <>
      <MainContainer
        error={hasError}
        open={selectIsOpen}
        focus={isFocus}
        width={width}>
        <SelectContainer>
          <Select
            value={phoneDigits}
            onChange={handleChangeCountry}
            onOpen={handleOpen}
            onClose={handleClose}
            open={selectIsOpen}
            input={
              <SelectInput
                data-testid={testIdSelectInput}
                disabled={true}
                error={hasError}
                open={selectIsOpen}
              />
            }
            MenuProps={MenuPhoneProps()}>
            {countryCodes.map(option => {
              const Icon: any = option.flag;
              return (
                <SelectItemContainer
                  key={option.id}
                  value={option.id}
                  width={width}>
                  <SelectItemWrapper data-testid={testIdSelectItemWrapper}>
                    <Icon
                      id={`${testIdIconFlag}${option.name}`}
                      data-testid={`${testIdIconFlag}${option.name}`}
                      style={{marginRight: theme.spacing.xxs}}
                    />
                    <CodeWrapper
                      id={`${testIdLabelCountryCode}${option.countryCode}`}
                      data-testid={`${testIdLabelCountryCode}${option.countryCode}`}>
                      {option.countryCode}
                    </CodeWrapper>
                  </SelectItemWrapper>
                </SelectItemContainer>
              );
            })}
          </Select>
          <Input
            onBlur={onBlur}
            id={testIdInputCellPhone}
            data-testid={testIdInputCellPhone}
            error={hasError}
            value={numberPhone || ''}
            onFocus={handleFocus}
            onBlurCapture={handleFocusOut}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
        </SelectContainer>
      </MainContainer>
      {hasError && (
        <ErrorMessage data-testid={testIdErrorMessage} variant="XSmall">
          {msgError}
        </ErrorMessage>
      )}
    </>
  );
};
