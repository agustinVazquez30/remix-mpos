import * as braze from "@braze/web-sdk";

const apiKey = window.ENV?.REACT_APP_BRAZE_API_KEY;
const sdkEndpoint = window.ENV?.REACT_APP_SDK_ENDPOINT_BRAZE;

if (apiKey && sdkEndpoint) {
  braze.initialize(apiKey, {
    baseUrl: sdkEndpoint,
  });
}
