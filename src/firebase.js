import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Web config values are public identifiers, not secrets. Security comes from firestore.rules.
const firebaseConfig = {
  apiKey: "AIzaSyAXHGiqayHk5il_EnxbOtrZxlVatEh-0I0",
  authDomain: "competitors-brigade-website.firebaseapp.com",
  projectId: "competitors-brigade-website",
  storageBucket: "competitors-brigade-website.firebasestorage.app",
  messagingSenderId: "1032066282494",
  appId: "1:1032066282494:web:0319dabb4cc83a1e5406af",
  measurementId: "G-8RLD6DTRQP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Analytics only runs in supported browsers, so dev and builds never break.
if (typeof window !== 'undefined') isSupported().then((ok) => ok && getAnalytics(app)).catch(() => {});
