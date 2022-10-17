import { Spinner } from ".";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<Spinner />", () => {
  test("should reder spinner", () => {
    render(<Spinner testId="spinner" />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
