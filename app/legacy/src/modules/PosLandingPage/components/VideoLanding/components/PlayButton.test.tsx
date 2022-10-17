import { PlayButton } from "./PlayButton";
import { fireEvent } from "@testing-library/react";
import { render } from "~/legacy/src/utils/tests";

describe("<PlayButton />", () => {
  test("should hide if props `show` is provided", () => {
    const { container } = render(<PlayButton show onPlay={() => {}} />);
    expect(container.children[0]).toHaveStyle("opacity: 1");
  });
  test("should show if props `show` is provided", () => {
    const { container } = render(<PlayButton show={false} onPlay={() => {}} />);
    expect(container.children[0]).toHaveStyle("opacity: 0");
  });
  test("should call onPlay callback", () => {
    const _onPlay = jest.fn();
    const { container } = render(<PlayButton show={false} onPlay={_onPlay} />);
    fireEvent.click(container.children[0]);
    expect(_onPlay).toHaveBeenCalled();
  });
});
