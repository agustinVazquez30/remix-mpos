import { formatterCurrency } from "@30sas/web-ui-kit-utils";
import { getValueCountry } from "~/legacy/src/utils/remoteConfig";

export const formatToCurrency = (value: number) => {
  try {
    return formatterCurrency(getValueCountry(), value);
  } catch (error) {
    return value;
  }
};

export const removeEmojis = (string: string): string => {
  const ranges = [
    "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
    "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
    "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
  ];

  return string?.replace(new RegExp(ranges.join("|"), "g"), "");
};
