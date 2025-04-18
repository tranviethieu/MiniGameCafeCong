import { Fragment, useEffect } from "react";
import { getItemStorage, setItemStorage } from "~/common/localStorage";
import { useAuth } from "~/context/AuthProvider";
import styles from "./SplashScreen.module.scss";
import clsx from "clsx";
import LoadingScreen from "~/components/LoadingScreen";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebaseConfig";
import { IUser } from "~/types/user";
const SplashScreen: React.FC = () => {
  const { setLoading, login, loading, user, logout } = useAuth();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const state = await getItemStorage("KEY_STORE_1");
        const uid = state?.user?.id;

        if (!uid) {
          logout();
          return;
        }

        // Lấy thời gian lần cuối kiểm tra từ localStorage
        const lastCheck = localStorage.getItem("lastUserCheck");
        const now = Date.now();

        // 24 giờ = 12 * 60 * 60 * 1000 = 43_200_000 ms
        const twelveHours = 24 * 60 * 60 * 1000;

        if (!lastCheck || now - Number(lastCheck) > twelveHours) {
          // Đã quá 24h hoặc chưa từng kiểm tra
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = (docSnap.data() as IUser) || null;
            login(userData);
          } else {
            logout();
          }

          // Cập nhật lại thời gian kiểm tra
          localStorage.setItem("lastUserCheck", now.toString());
        } else {
          // Không gọi Firebase, dùng local data
          login(state?.user);
        }
      } catch (error) {
        console.error("Lỗi khi xử lý đăng nhập:", error);
        logout(); // fallback
      } finally {
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
