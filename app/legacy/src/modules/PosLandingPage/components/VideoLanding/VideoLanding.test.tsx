import * as React from "react";
import { VideoLanding } from "./VideoLanding";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("<VideoLanding />", () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });
  test("should video element with status of paused", () => {
    render(<VideoLanding />);
    const videoElement: HTMLVideoElement = screen.getByLabelText(
      `Video presentación POS`
    );
    expect(videoElement.paused).toBe(true);
    expect(videoElement.controls).toBe(false);
  });
  test("should show overlay and play button by default", () => {
    render(<VideoLanding />);
    expect(screen.getByLabelText("video-landing-overlay")).toBeVisible();
    expect(screen.getByLabelText("video-landing-play-button")).toBeVisible();
  });
});
