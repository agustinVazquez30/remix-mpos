import { Container, popoverPragraphStyle } from "./styles";
import { FC, ReactNode, useState } from "react";
import { PopoverContainer } from "~/legacy/src/commons/components/PopoverContainer";
import { RadioButton } from "@30sas/web-ui-kit-core";
import { Theme } from "@30sas/web-ui-kit-theme";
import { useTheme } from "styled-components";

export type CustomRadioButtonProps = {
  name: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  icon?: ReactNode;
  popoverText?: string;
};
export const CustomRadioButton: FC<CustomRadioButtonProps> = ({
  checked,
  onChange,
  disabled = false,
  icon,
  popoverText,
  ...props
}) => {
  const theme = useTheme() as Theme;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.checked);

  return (
    <Container endIcon={!!icon} checked={checked} disabled={disabled}>
      <RadioButton
        className="radio"
        {...props}
        onChange={handleChange}
        checked={checked}
      />
      {!!icon && (
        <PopoverContainer
          isOpen={isOpen}
          positions={["top"]}
          onClickOutside={() => setIsOpen(false)}
          align="center"
          arrowColor={theme.colors.secondary[700] as string}
          popoverStyle={popoverPragraphStyle}
          SetIsOpen={() => setIsOpen(!isOpen)}
          textColor="white"
          popoverText={popoverText}
          nodeEl={icon}
          nodeClassNameContainer="icon-container"
        />
      )}
    </Container>
  );
};
