// AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { IUser } from "../types/user";
import { AnimatePresence } from "framer-motion";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  setLoading: (data: boolean) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: IUser) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
