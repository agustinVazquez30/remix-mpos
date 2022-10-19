import React from "react";
import { TreintaDropdownOptions } from "@30sas/web-ui-kit-core";

export type InputSelectProps = {
  testId?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  dropdownName?: string;
  placeholder?: string;
  options: TreintaDropdownOptions[];
  label?: string;
  className?: string;
  value?: { type: string; value: string };
  disabled?: boolean;
  onChange: (value: { type: string; value: string }) => void;
  error?: boolean;
  errorText?: string;
};
