import {v4 as uuidv4, v5 as uuidv5} from 'uuid';

export const getUUID = (): string => {
  /*
   * NAMESPACE generated in https://www.uuidgenerator.net/ with Version 1 UUID Generator.
   * A Version 1 UUID is a universally unique identifier that is generated using a timestamp
   * and the MAC address of the computer on which it was generated.
   */
  const NAMESPACE = 'e073e954-4d78-11ec-81d3-0242ac130003';

  return uuidv5(uuidv4(), NAMESPACE);
};
