import { BrazeEventType, brazeEvents } from "./models";
import { GetEventProperties } from "~/legacy/src/utils/getEventProperties";

export const newBrazeEvent = (name: BrazeEventType, args?: any): void => {
  console.warn("evento");
  // const eventName = brazeEvents[name];
  // if (args) {
  //   braze.logCustomEvent(eventName, args);
  // } else {
  //   braze.logCustomEvent(eventName);
  // }
};

export const newBrazeRevenueEvent = (
  price: number,
  currencyCode: string,
  quantity: number,
  args: { [key: string]: string }
): void => {
  console.warn("evento");
};

export const updateUserBasicInformation = ({
  userId,
  email,
  firstName,
  phoneNumber,
  lastName,
}: GetEventProperties) => {
  console.warn("random");
};
