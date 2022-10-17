import { FullScreen } from ".";
import { render } from "~/legacy/src/utils/tests";

describe("<FullScreen />", () => {
  test("should render the child components", () => {
    const { getByText } = render(
      <FullScreen>
        <p>Child component</p>
      </FullScreen>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });
});
