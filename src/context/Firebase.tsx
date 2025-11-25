import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import type { User } from "firebase/auth"; 

import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";

import { useNavigate } from "react-router-dom";



interface FirebaseContextType {
  signupUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signinUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signinWithGoogle: () => Promise<any>;
  getData: () => Promise<any>;
  user: User | null;
  isloggedIn: boolean;
  logoutUser: () => Promise<void>;

  firestore: ReturnType<typeof getFirestore>;
  storage: ReturnType<typeof getStorage>;
}



// Create context
const FirebaseContext = createContext<FirebaseContextType | null>(null);

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase services
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

 const firestore = getFirestore(firebaseApp);

 const storage = getStorage(firebaseApp);

export const FirebaseProvider = ({ children }:{children: ReactNode}) => {

  const [user, setUser] = useState<User | null>(null);
const [isAuthLoading, setIsAuthLoading] = useState(true); // ⭐ ADD THIS


  const navigate = useNavigate()

  // ✅ Function names should be camelCase
  function signupUserWithEmailAndPassword(email:string, password:string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signinUserWithEmailAndPassword(email:string, password:string) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signinWithGoogle() {
    return signInWithPopup(firebaseAuth, googleProvider);
  }

  function logoutUser() {
    navigate("/signin")
  return signOut(firebaseAuth);
}

  // ✅ Get all data
  async function getData() {
    return getDocs(collection(firestore, "courses"));
  }




useEffect(() => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
    setUser(currentUser);
    setIsAuthLoading(false);   // ⭐ VERY IMPORTANT
  });

  return () => unsubscribe();
}, []);



   useEffect(() => {
  if (!isAuthLoading && !user) {
    navigate("/signin");
  }
}, [isAuthLoading, user]);  // ⭐ observe both


  const isloggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        user,
        isloggedIn,
        logoutUser,
        firestore,
        storage,
        getData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};


export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
