import React, { createContext, useContext, useState } from "react";
import db from "../db";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login: check email and password in local DB
  async function login(email, password) {
    const foundUser = await db.users.where({ email, password }).first();
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  }

  // Signup: add user to local DB
  async function registerUser(email, password, firstName, lastName) {
    const existing = await db.users.where('email').equals(email).first();
    if (existing) throw new Error("Email already registered.");
    const id = await db.users.add({ email, password, firstName, lastName });
    setUser({ id, email, firstName, lastName });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
