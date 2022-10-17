import { StepItem } from "./StepItem";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<StepItem />", () => {
  test("should render titles", () => {
    render(<StepItem index={0} title="title" />);
    expect(screen.getByText(0)).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
  });
});
