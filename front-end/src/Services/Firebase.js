import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();

export const userSignUp = async (userName, email, password) => {
  let result = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        updateProfile(userCredential.user, { displayName: userName });
      }
    );
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userSignIn = async (email, password) => {
  let result = null;
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {}
    );
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userGoogleSignIn = async () => {
  let result = null;
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider).then((userCredential) => {
      result = userCredential.user;
    });
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userSignOut = async () => {
  let result = null;
  try {
    await signOut(auth).then(() => {});
  } catch (e) {
    result = e.code;
    console.warn(e.message);
  }
  return result;
};
