import 'firebase/auth';

import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  projectId: process.env.REACT_APP_PROJECT_ID,
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const initializeFirebaseApp = () => {
  initializeApp(firebaseConfig);
};
