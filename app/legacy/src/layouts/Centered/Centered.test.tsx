import { Centered } from "./Centered";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("< Centered />", () => {
  const ContentComponent = () => <p>This is the content</p>;

  test("should render the child components", () => {
    render(
      <Centered>
        <ContentComponent />
      </Centered>
    );

    expect(screen.getByText("This is the content")).toBeInTheDocument();
  });
});
