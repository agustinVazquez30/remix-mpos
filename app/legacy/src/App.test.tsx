import { screen, waitFor } from "@testing-library/react";
import { App } from "./App";
import React from "react";
import { render } from "~/legacy/src/utils/tests";

jest.mock("@firebase/remote-config", () => ({
  getRemoteConfig: jest.fn(),
  fetchAndActivate: jest.fn(),
}));

const SuspenseMock: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  Suspense: SuspenseMock,
}));

describe("<App />", () => {
  test("renders Home", async () => {
    await waitFor(() => render(<App />));

    await waitFor(() =>
      expect(screen.getByTestId("titleBanner")).toBeInTheDocument()
    );
  });

  test("should render spinner", () => {
    render(<App />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
