import * as braze from '@braze/web-sdk';

const apiKey = process.env.REACT_APP_BRAZE_API_KEY;
const sdkEndpoint = process.env.REACT_APP_SDK_ENDPOINT_BRAZE;

if (apiKey && sdkEndpoint) {
  braze.initialize(apiKey, {
    baseUrl: sdkEndpoint,
  });
}
