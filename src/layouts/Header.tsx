import { Img } from "react-image";
import styles from "./Header.module.scss";
import icons from "../constants/images/icons";
import { Flex } from "antd";
const Header = () => {
  return (
    <header className={styles.header}>
      <Flex gap={10} className={styles.img}>
        <Img
          src={icons.logoCong}
          alt="Example Image"
          loader={<p>Loading...</p>}
          unloader={<p>Failed to load</p>}
          width={100}
          height={36}
        />
        <div style={{ fontSize: 30 }}>🎮</div>
      </Flex>
    </header>
  );
};
export default Header;
