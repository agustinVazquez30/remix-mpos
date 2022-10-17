import {DatadogLogsType} from './models';
import {datadogLogs} from '@datadog/browser-logs';

export const newDatadogLog = (name: DatadogLogsType, args?: any): void => {
  if (args) {
    datadogLogs.logger.info(name, args);
  } else {
    datadogLogs.logger.info(name, args);
  }
};
