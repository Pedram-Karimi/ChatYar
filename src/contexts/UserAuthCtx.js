import { createContext, useContext, useState, useEffect } from "react"; // react-hooks

// firebase ---
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";

const UserAuthCtx = createContext();

export const UserAuthProvider = ({ children }) => {
  // variables

  const [userDataState, setUserDataState] = useState({});

  // signIn function --

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // logout function --

  function logOut() {
    signOut(auth);
  }

  // updating user auth status --

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // getting user data from db --
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userData = getDoc(userRef).then((data) => {
          setUserDataState({ ...data.data(), user: user });
        });
      } else if (user === null) {
        setUserDataState(user);
      }
    });
  }, []);
  // console.log("jojo");
  return (
    <UserAuthCtx.Provider value={{ userDataState, signIn, logOut }}>
      {children}
    </UserAuthCtx.Provider>
  );
};

export function useUserAuth() {
  return useContext(UserAuthCtx);
}
