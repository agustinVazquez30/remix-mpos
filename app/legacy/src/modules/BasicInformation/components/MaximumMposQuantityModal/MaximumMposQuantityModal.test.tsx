import { render, t } from "~/legacy/src/utils/tests";

import { MaximumMposQuantityModal } from ".";
import { screen } from "@testing-library/react";

describe("<MaximumMposQuantityModal />", () => {
  test("should render correctly", () => {
    render(<MaximumMposQuantityModal show={true} onClose={() => {}} />);

    expect(
      screen.getByText(t("basicInformation.mposAvailability.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("basicInformation.mposAvailability.message"))
    ).toBeInTheDocument();
  });
});
