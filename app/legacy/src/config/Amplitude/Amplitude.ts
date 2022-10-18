import amplitude from "amplitude-js";

const apiKey = window.ENV?.REACT_APP_AMPLITUDE_API_KEY;

if (apiKey) {
  amplitude.getInstance().init(apiKey, "", {
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true,
    includeFbclid: true,
    includeGclid: true,
    unsetParamsReferrerOnNewSession: true,
  });
}
