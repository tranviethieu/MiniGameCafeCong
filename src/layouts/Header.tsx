import { Img } from "react-image";
import styles from "./Header.module.scss";
import icons from "../constants/images/icons";
const Header = () => {
  return (
    <header className={styles.header}>
      <Img
        className={styles.img}
        src={icons.logoCong}
        alt="Example Image"
        loader={<p>Loading...</p>}
        unloader={<p>Failed to load</p>}
        width={80}
        height={36}
      />
    </header>
  );
};
export default Header;
