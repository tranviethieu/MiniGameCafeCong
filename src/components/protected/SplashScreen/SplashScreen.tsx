import { Fragment, useEffect } from "react";
import { getItemStorage, setItemStorage } from "~/common/localStorage";
import { useAuth } from "~/context/AuthProvider";
import styles from "./SplashScreen.module.scss";
import clsx from "clsx";
import LoadingScreen from "~/components/LoadingScreen";
const SplashScreen: React.FC = () => {
  const { setLoading, login, loading, user, logout } = useAuth();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const state = await getItemStorage("KEY_STORE_1");
      if (state?.user) {
        login(state?.user);
      } else {
        logout();
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
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        <LoadingScreen />
      </div>
    </Fragment>
  );
};
export default SplashScreen;
