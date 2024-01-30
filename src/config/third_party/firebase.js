
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:  process.env.REACT_APP_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId:  process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);