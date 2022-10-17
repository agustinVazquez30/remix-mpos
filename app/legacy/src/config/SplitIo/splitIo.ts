import {SplitFactory} from '@splitsoftware/splitio';

export class SplitIOSingleton {
  private static instance: SplitIOSingleton;

  initFactory(userID: string): SplitIO.ISDK {
    const apiKey = process.env.REACT_APP_SPLIT_IO;
    return SplitFactory({
      core: {
        authorizationKey: apiKey || '',
        key: userID,
      },
    });
  }

  static getInstance(): SplitIOSingleton {
    if (!SplitIOSingleton.instance) {
      SplitIOSingleton.instance = new SplitIOSingleton();
    }
    return this.instance;
  }
}
