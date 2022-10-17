import {Field, Input, MainContainer} from './styles';
import {KeyboardEvent, useState} from 'react';
import {getInputRef, moveCursorToEnd} from './utils';
import {CSSProperties} from 'styled-components';
import {Typography} from '@30sas/web-ui-kit-core';

type VerificationCodeType = {
  id?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  helperText?: string;
  isValid?: boolean;
  name: string;
  onChange?: (value: {verificationCode: string; completed: boolean}) => void;
  onEnter?: () => void;
  onFocus?: () => void;
  style?: CSSProperties;
};

export const VerificationCode = ({
  id,
  name,
  disabled = false,
  helperText,
  hasError,
  isValid,
  className,
  style,
  onChange,
  onEnter,
  onFocus,
}: VerificationCodeType) => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Enter' && codes.length === 6) {
      onEnter && onEnter();
    }
    if (e.key === 'Backspace' && !codes[index]) {
      getInputRef(index - 1).current?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      getInputRef(index + 1).current?.focus();
    }
    if (e.key === 'ArrowLeft' && index >= 0) {
      moveCursorToEnd(getInputRef(index > 0 ? index - 1 : index));
    }
  };

  const onHandleChange = (value: string, index: number) => {
    const newValue = value.charAt(1) || value;
    const newCodes = [...codes];
    newCodes[index] = newValue;

    setCodes(newCodes);

    const verificationCode = newCodes.join('');
    const validField = verificationCode.length === 6;
    const isErasing = !!codes[index] && !newValue;

    if (validField) {
      onChange &&
        onChange({
          verificationCode,
          completed: true,
        });
    } else {
      onChange &&
        onChange({
          verificationCode,
          completed: false,
        });

      if (!isErasing) {
        getInputRef(index + 1).current?.focus();
      }
    }
  };

  const onClickField = (indexField: number, currentValue: string) => {
    if (hasError) {
      setCodes(Array(6).fill(''));
      onFocus && onFocus();
    }

    const inputRef = getInputRef(hasError ? 0 : indexField);

    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
      inputRef.current.value = currentValue;
    }
  };

  return (
    <MainContainer
      className={className}
      hasError={!!hasError}
      style={style}
      data-testid={'verification-code'}>
      <div className="container">
        {codes.map((code, index) => (
          <Field
            key={`${id}-${index}`}
            onClick={() => onClickField(index, code)}>
            <Input
              data-testid={`input-${index}`}
              hasValue={!!code}
              hasError={!!hasError}
              isValid={!!isValid}
              name={`${name}-${index}`}
              value={code || ''}
              type="number"
              ref={getInputRef(index)}
              onKeyDown={e => onKeyDown(e, index)}
              onChange={e => onHandleChange(e.target.value, index)}
              disabled={disabled}
            />
          </Field>
        ))}
      </div>
      {hasError && helperText && (
        <Typography className="helper-text" variant="Small" margin="0">
          {helperText}
        </Typography>
      )}
    </MainContainer>
  );
};
