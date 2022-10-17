declare global {
  interface Window {
    recaptchaVerifier?: {
      clear: () => void;
      verify: () => void;
    };
    ReactNativeWebView?: {
      postMessage: (event: string) => void;
    };
  }
}

export {};
