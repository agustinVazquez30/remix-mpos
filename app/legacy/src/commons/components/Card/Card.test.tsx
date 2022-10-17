import { Card } from ".";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<Card />", () => {
  test("should render the child components", () => {
    render(
      <Card>
        <p>Child component</p>
      </Card>
    );

    expect(screen.getByText("Child component")).toBeInTheDocument();
  });
});
