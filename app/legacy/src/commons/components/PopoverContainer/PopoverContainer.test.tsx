import { PopoverContainer, popoverIconProps } from "./PopoverContainer";
import { InfoIcon } from "@30sas/web-ui-kit-icons";
import { fireEvent } from "@testing-library/react";
import { render } from "~/legacy/src/utils/tests";

const PROPS: popoverIconProps = {
  isOpen: true,
  positions: ["top"],
  onClickOutside: () => {},
  align: "center",
  arrowColor: "",
  popoverStyle: {},
  SetIsOpen: () => {},
  textColor: "white",
  popoverText: "",
  nodeEl: <InfoIcon role={"contentinfo"} />,
  nodeClassNameContainer: "",
};

describe("<PopoverContainer />", () => {
  test("should show infoIcon", () => {
    const { getByRole, getByTestId } = render(<PopoverContainer {...PROPS} />);

    const infoIcon = getByRole("contentinfo");

    fireEvent.click(infoIcon);

    const popoverInfo = getByTestId("info-popover");

    expect(infoIcon).toBeInTheDocument();
    expect(popoverInfo).toBeInTheDocument();
  });
});
