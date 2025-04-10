// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/user";
import { getItemStorage, setItemStorage } from "../common/localStorage";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";

interface AuthContextType {
  user: IUser | null;
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
  useEffect(() => {
    (async () => {
      setLoading(true);
      const state = await getItemStorage("KEY_STORE_1");
      if (state?.user) {
        setUser(state?.user);
      } else {
        setUser(null);
      }
      //setItemStorage("KEY_STORE", { user: state });
      setTimeout(() => setLoading(false), 3000);
    })();
  }, []);
  useEffect(() => {
    if (!loading) {
      setItemStorage("KEY_STORE_1", {
        user: user,
      });
    }
  }, [loading, user]);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <AnimatePresence mode="wait">
        {loading ? <LoadingScreen /> : children}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
