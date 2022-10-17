import { Information } from ".";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<Information />", () => {
  test("Should render elements", () => {
    render(<Information />);

    expect(screen.getByAltText("figures")).toBeInTheDocument();
    expect(screen.getByAltText("treinta")).toBeInTheDocument();
    expect(screen.getByAltText("mpos")).toBeInTheDocument();
  });
});
