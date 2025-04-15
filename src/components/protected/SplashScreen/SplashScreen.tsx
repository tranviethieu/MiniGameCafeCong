import { Fragment, useEffect } from "react";
import { getItemStorage, setItemStorage } from "~/common/localStorage";
import { useAuth } from "~/context/AuthProvider";
import styles from "./SplashScreen.module.scss";
import clsx from "clsx";
import LoadingScreen from "~/components/LoadingScreen";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
const SplashScreen: React.FC = () => {
  const { setLoading, login, loading, user, logout } = useAuth();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const state = await getItemStorage("KEY_STORE_1");
        const uid = state?.user?.id;

        if (uid) {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            login(state.user);
          } else {
            logout();
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error("Lỗi khi xử lý đăng nhập:", error);
        logout(); // fallback
      } finally {
        // ✅ Đảm bảo luôn tắt loading
        setTimeout(() => setLoading(false), 2000);
      }
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
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        <LoadingScreen />
      </div>
    </Fragment>
  );
};
export default SplashScreen;
