import "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  projectId: window.ENV?.REACT_APP_PROJECT_ID,
  apiKey: window.ENV?.REACT_APP_API_KEY_FIREBASE,
  authDomain: `${window.ENV?.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${window.ENV?.REACT_APP_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${window.ENV?.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: window.ENV?.REACT_APP_MESSAGING_SENDER_ID,
  appId: window.ENV?.REACT_APP_APP_ID,
  measurementId: window.ENV?.REACT_APP_MEASUREMENT_ID,
};

export const initializeFirebaseApp = () => {
  initializeApp(firebaseConfig);
};
