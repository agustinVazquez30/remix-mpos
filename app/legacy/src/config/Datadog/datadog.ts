import { datadogLogs } from "@datadog/browser-logs";

const apiKey = window.ENV?.REACT_APP_DATADOG_API_KEY;
const SITE = window.ENV?.REACT_APP_DATADOG_CLIENT;

datadogLogs.init({
  clientToken: apiKey!,
  site: SITE,
  forwardErrorsToLogs: true,
  sampleRate: 100,
});
