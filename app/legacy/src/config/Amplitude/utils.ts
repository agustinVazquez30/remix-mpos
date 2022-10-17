import {AmplitudeEventType, amplitudeEvents} from './models';
import amplitude from 'amplitude-js';

export const updateUserIfNeeded = (userId: string) => {
  const actualUserId = amplitude.getInstance().getUserId();

  if (actualUserId !== userId) {
    amplitude.getInstance().setUserId(userId);
  }
};

export const newAmplitudeEvent = (
  name: AmplitudeEventType,
  args?: any,
): void => {
  const eventName = amplitudeEvents[name];

  if (args) {
    amplitude.getInstance().logEvent(eventName, args);
  } else {
    amplitude.getInstance().logEvent(eventName);
  }
};
