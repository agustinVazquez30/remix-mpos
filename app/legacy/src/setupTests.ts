/* eslint-disable @typescript-eslint/no-empty-function */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

HTMLCanvasElement.prototype.getContext = () => ({} as any);

window.zE = () => {};
window.recaptchaVerifier = {
  verify: () => {},
  clear: () => {},
};
global.URL.createObjectURL = jest.fn();

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

jest.mock("@braze/web-sdk", () => ({
  initialize: jest.fn(),
  logCustomEvent: jest.fn(),
}));

jest.mock("@datadog/browser-logs", () => ({
  datadogLogs: {
    init: jest.fn(),
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  },
}));

jest.mock("@braze/web-sdk", () => ({
  initialize: jest.fn(),
  logCustomEvent: jest.fn(),
  changeUser: jest.fn(),
  getUser: () => ({
    setEmail: jest.fn(),
    setFirstName: jest.fn(),
    setPhoneNumber: jest.fn(),
    setLastName: jest.fn(),
  }),
}));

jest.mock("~/legacy/src/config/Amplitude", () => ({
  newAmplitudeEvent: jest.fn(),
  updateUserIfNeeded: jest.fn(),
}));
