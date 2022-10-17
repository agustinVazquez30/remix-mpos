import { render, t } from "~/legacy/src/utils/tests";
import { Discarded } from ".";
import { screen } from "@testing-library/react";

describe("<Discarded />", () => {
  test("Should render elements", () => {
    render(<Discarded />);

    expect(screen.queryByTestId("backgroundCloseIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("closeIcon")).toBeInTheDocument();
    expect(screen.getByText(t("discarded.title"))).toBeInTheDocument();
    expect(screen.getByText(t("discarded.message.first"))).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: t("commons.writeToSupport") })
    ).toBeInTheDocument();
  });
});
