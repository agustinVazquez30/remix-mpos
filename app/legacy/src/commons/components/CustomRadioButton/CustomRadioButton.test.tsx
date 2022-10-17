import { CustomRadioButton } from "./CustomRadioButton";

import { InfoIcon } from "@30sas/web-ui-kit-icons";
import { fireEvent } from "@testing-library/react";
import { render } from "~/legacy/src/utils/tests";

const PROPS = {
  name: "test",
  label: "label_test",
  checked: false,
  onChange: jest.fn(),
};

describe("<CustomRadioButton />", () => {
  test("should render correctly", () => {
    const { getByText } = render(<CustomRadioButton {...PROPS} />);

    const label = getByText(PROPS.label);

    expect(label).toBeInTheDocument();
  });

  test("should onclick works correctly", () => {
    const { getByText } = render(<CustomRadioButton {...PROPS} />);

    const label = getByText(PROPS.label);

    fireEvent.click(label);

    expect(PROPS.onChange).toBeCalledWith(true);
  });

  test("should show icon when icon is available", () => {
    const { getByRole, getByTestId } = render(
      <CustomRadioButton {...PROPS} icon={<InfoIcon role={"contentinfo"} />} />
    );

    const infoIcon = getByRole("contentinfo");

    fireEvent.click(infoIcon);

    const popoverInfo = getByTestId("info-popover");

    expect(infoIcon).toBeInTheDocument();
    expect(popoverInfo).toBeInTheDocument();
  });
});
