import { Container, Input, MainContainer, SelectContainer } from "./styles";
import { FormEvent, useEffect, useState } from "react";
import {
  TreintaDropdownOptions,
  TreintaDropdownType,
  Typography,
} from "@30sas/web-ui-kit-core";

import { CustomDropDown } from "~/legacy/src/commons/styles/CustomDropdown";
import { InputSelectProps } from "./types";
import { useTheme } from "styled-components";

export const InputSelect = ({
  testId = "default-input-select",
  name = "",
  type = "text",
  placeholder = "",
  options,
  label = "",
  className = "",
  value: valueExternal,
  disabled = false,
  onChange,
  error,
  errorText,
}: InputSelectProps) => {
  const [value, setValue] = useState(
    valueExternal ?? {
      type: options[0]?.label ?? "",
      value: "",
    }
  );

  const theme = useTheme();
  const inputBorderColor = error
    ? theme.colors.danger[500]
    : theme.colors.gray[600];

  const handleInputChange = (e: FormEvent<HTMLInputElement>): void => {
    setValue({ ...value, value: e.currentTarget.value });
    onChange({ ...value, value: e.currentTarget.value });
  };

  const handleChangeSelect = (e: TreintaDropdownOptions) => {
    setValue({ ...value, type: e.label as string });
    onChange({ ...value, type: e.label as string });
  };

  useEffect(() => {
    if (valueExternal) setValue(valueExternal);
  }, [valueExternal]);

  return (
    <Container className={className}>
      <Typography
        className="label-document"
        variant="Smallbold"
        color="gray"
        colorType="800"
      >
        {label}
      </Typography>
      <MainContainer borderColor={inputBorderColor}>
        <SelectContainer borderColor={inputBorderColor}>
          <CustomDropDown
            className="select"
            dropdownOptions={options}
            onChange={handleChangeSelect}
            typeRenderItem={TreintaDropdownType.OnlyLetter}
            value={[value.type]}
            dataTestId={`${testId}-dropdown`}
            disabled={disabled}
          />
          <Input
            type={type}
            name={name}
            value={value.value || ""}
            data-testid={testId}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="input"
            disabled={disabled}
          />
        </SelectContainer>
      </MainContainer>
      {error && (
        <Typography className="errorParagraph" variant="Small">
          {errorText}
        </Typography>
      )}
    </Container>
  );
};
