import React, { createContext, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Engine } from "tsparticles-engine";
import { getItemStorage, setItemStorage } from "../common/localStorage";
import { db, doc, getDoc } from "../lib/firebaseConfig";
export interface IUser {
  phone: string;
  name: string;
  level: number;
  status: number | string | null;
  linkb1: string;
  linkb2: string;
  linkb3: string;
  linkb4: string;
  linkb5: string;
  giftCode: string;
}
// eslint-disable-next-line react-refresh/only-export-components
export interface IUserContext {
  loading: boolean;
  setLoading: (data: boolean) => void;
  user: IUser;
  setUser: (data: IUser) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext>({
  loading: false,
  setLoading: () => true,
  user: {
    phone: "",
    name: "",
    level: 1,
    status: 1,
    linkb1: "",
    linkb2: "",
    linkb3: "",
    linkb4: "",
    linkb5: "",
    giftCode: "",
  },
  setUser: () => null,
});
function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({
    phone: "",
    name: "",
    level: 1,
    status: 1,
    linkb1: "",
    linkb2: "",
    linkb3: "",
    linkb4: "",
    linkb5: "",
    giftCode: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const state = await getItemStorage("KEY_STORE");

      if (state?.user?.phone) {
        const userRef = doc(db, "users", state.user.phone);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data() as IUser;
          console.log(userData);

          setUser(userData);
          setItemStorage("KEY_STORE", { user: userData });
        } else if (
          state?.user?.phone === "0123456789" &&
          state?.user?.name === "admin"
        ) {
          setUser(state?.user);
        }
      }
      //setItemStorage("KEY_STORE", { user: state });
      setTimeout(() => setLoading(false), 2000);
    })();
  }, []);
  useEffect(() => {
    if (!loading) {
      setItemStorage("KEY_STORE", {
        user: user,
      });
    }
  }, [loading, user]);
  const particlesInit = async (engine: Engine) => {
    console.log("Particles Engine Loaded", engine);
    await engine.addPreset("firefly", {}); // Nếu bạn muốn thêm preset tùy chỉnh
  };
  return (
    <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
      {loading ? <LoadingScreen particlesInit={particlesInit} /> : children}
    </UserContext.Provider>
  );
}
export default UserProvider;
