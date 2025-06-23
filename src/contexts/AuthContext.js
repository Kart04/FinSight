import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Listen for auth state changes and fetch user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
    });
    return unsubscribe;
  }, []);

  // Sign up with email, password, and user data
  async function registerUser(email, password, firstName, lastName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
    });
    // Update userProfile immediately after signup
    setUserProfile({ firstName, lastName, email });
  }

  // Log in with email and password
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // Log out
  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, registerUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
