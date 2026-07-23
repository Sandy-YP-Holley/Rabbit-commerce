import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUser,
  authenticateUser,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "../data/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  function login(email, password) {
    const result = authenticateUser(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setUser(result.user);
    }
    return result;
  }

  function signup(name, email, password) {
    const result = registerUser({ name, email, password });
    if (result.success) {
      setCurrentUser(result.user);
      setUser(result.user);
    }
    return result;
  }

  function logout() {
    clearCurrentUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
