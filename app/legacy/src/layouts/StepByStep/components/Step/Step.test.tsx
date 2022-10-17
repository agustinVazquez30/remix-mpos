import { fireEvent, screen } from "@testing-library/react";
import { ROUTES } from "~/legacy/src/constants";
import { Step } from ".";
import { render } from "~/legacy/src/utils/tests";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("<Step />", () => {
  test("should render the component as inactive", () => {
    render(
      <Step
        index={2}
        activeIndex={1}
        title="I am inactive"
        isLast={false}
        path={ROUTES.PURCHASE_ORDER}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("I am inactive")).toBeInTheDocument();
  });

  test("should render the component as active", () => {
    render(
      <Step
        index={1}
        activeIndex={1}
        title="I am active"
        isLast={false}
        path={ROUTES.PURCHASE_ORDER}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I am active")).toBeInTheDocument();
  });

  test("should render the component as completed", () => {
    render(
      <Step
        index={2}
        activeIndex={3}
        title="I am completed"
        isLast={false}
        path={ROUTES.PURCHASE_ORDER}
      />
    );

    expect(screen.getByAltText("tick-circle")).toBeInTheDocument();
    expect(screen.getByText("I am completed")).toBeInTheDocument();
  });

  test("should navigate to completed step", () => {
    const { getByText } = render(
      <Step
        index={2}
        activeIndex={3}
        title="I am completed"
        isLast={false}
        path={ROUTES.PURCHASE_ORDER}
      />
    );

    const step = getByText("I am completed");
    fireEvent.click(step);

    expect(mockedUsedNavigate).toBeCalledWith(
      `/${ROUTES.PURCHASE_ORDER}`,
      expect.anything()
    );
  });
});
