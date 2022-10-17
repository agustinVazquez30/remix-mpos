import { Icon } from ".";
import { render } from "~/legacy/src/utils/tests";

describe("<Icon />", () => {
  test("should render the icon", () => {
    const { getByTestId } = render(
      <Icon name="BankIcon" testId="bank-icon-id" />
    );

    expect(getByTestId("bank-icon-id")).toBeInTheDocument();
  });
});
