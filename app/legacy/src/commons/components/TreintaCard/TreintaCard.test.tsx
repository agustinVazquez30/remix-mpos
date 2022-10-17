import { TreintaCard } from "./TreintaCard";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("< TreintaCard />", () => {
  const ContentComponent = () => <p>This is the content</p>;
  const AlertComponent = () => <p>I am an alert</p>;

  test("should render the child components", () => {
    render(
      <TreintaCard title="I am title" alert={<AlertComponent />}>
        <ContentComponent />
      </TreintaCard>
    );

    expect(screen.getByText("This is the content")).toBeInTheDocument();
    expect(screen.getByText("I am title")).toBeInTheDocument();
    expect(screen.getByText("I am an alert")).toBeInTheDocument();
  });
});
