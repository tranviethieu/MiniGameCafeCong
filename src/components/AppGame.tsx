import { useContext } from "react";
import { IUserContext, UserContext } from "../context/UserProvider";
import { Col, Row, Card, message } from "antd";
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import GameOne from "./GameOne";
import { db, doc, updateDoc } from "../lib/firebaseConfig";
import GameTwo from "./GameTwo";
import GiftCode from "./GiftCode";
import GiftCode2 from "./GiftCode2";
import styles from "./AppGame.module.scss";
const AppGame = () => {
  const { user, setUser, setLoading } = useContext<IUserContext>(UserContext);

  // Xử lý khi click vào nhiệm vụ
  const handleMissionClick = async (id: number) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.phone);
      await updateDoc(userRef, {
        status: 2,
        level: id, // ✅ Cập nhật trạng thái hoàn thành nhiệm vụ 1
      });

      // ✅ Cập nhật state của user
      setUser({ ...user, status: 2, level: id });
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      message.error("Lỗi khi cập nhật dữ liệu!");
    }
    setLoading(false);
  };

  if (user?.level === 1 && user?.linkb1 === "" && user.status === 2) {
    return <GameOne />;
  }
  if (user?.level === 2 && user?.linkb1 && user.status === 3) {
    return <GiftCode />;
  }
  if (user?.level === 2 && user?.linkb2 === "" && user.status === 2) {
    return <GameTwo />;
  }
  if (user?.level === 3 && user?.linkb2 && user.status === 3) {
    return <GiftCode2 />;
  }
  return (
    <div
      className={styles.main}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <div className={styles.body}>
        <h2 style={{ color: "#ccc" }}>
          Welcome {user?.name} to My Game Cafe Cộng 🎮
        </h2>
        <h2 style={{ color: "#000" }}>Level {user?.level}</h2>
        <p style={{ color: "#fff" }}>Trạng thái: {status}</p>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                background:
                  user.linkb1 === "" && user.level === 1
                    ? "#4CAF50"
                    : "rgb(38 65 255)",
                color: "#fff",
                textAlign: "center",
                height: 140,
              }}
              onClick={() => {
                if (user.level > 1) {
                  return;
                }
                if (
                  user?.level === 1 &&
                  user?.linkb1 === "" &&
                  user.status === 1
                ) {
                  handleMissionClick(1);
                }
              }}
            >
              <p>Nhiệm vụ 1</p>
              {user.linkb1 === "" && user.level === 1 ? (
                <p>
                  Có thể làm <ClockCircleTwoTone twoToneColor="#FAAD14" />
                </p>
              ) : (
                <p>
                  Hoàn thành{" "}
                  <CheckCircleTwoTone twoToneColor="rgb(38 65 255)" />
                </p>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                background:
                  user.linkb2 === "" && user.level === 2
                    ? "#4CAF50"
                    : user.linkb2 && user.level === 3 && user.status === 1
                    ? "rgb(38 65 255)"
                    : "#ccc",
                color: "#fff",
                textAlign: "center",
                height: 140,
              }}
              onClick={() => {
                if (user.level < 2) {
                  message.warning(`Bạn phải hoàn thành nhiệm vụ 1`);
                  return;
                }
                if (
                  user.level === 2 &&
                  user.status === 1 &&
                  user?.linkb2 === ""
                ) {
                  handleMissionClick(2);
                }
              }}
            >
              <p>Nhiệm vụ 2</p>
              {user.linkb2 === "" && user.level === 2 ? (
                <p>
                  Có thể làm <ClockCircleTwoTone twoToneColor="#FAAD14" />
                </p>
              ) : user.linkb2 && user.level === 3 ? (
                <p>
                  Hoàn thành{" "}
                  <CheckCircleTwoTone twoToneColor="rgb(38 65 255)" />
                </p>
              ) : (
                <p>Chưa thể làm</p>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                background: "#ccc",
                color: "#fff",
                textAlign: "center",
                height: 140,
              }}
              onClick={() => {
                if (user.level < 4) {
                  message.warning(`Bạn phải hoàn thành nhiệm vụ 2`);
                }
              }}
            >
              <p>Nhiệm vụ 3</p>
              <p>Chưa thể làm</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                background: "#ccc",
                color: "#fff",
                textAlign: "center",
                height: 140,
              }}
              onClick={() => {
                if (user.level < 4) {
                  message.warning(`Bạn phải hoàn thành nhiệm vụ 3`);
                }
              }}
            >
              <p>Nhiệm vụ 4</p>
              <p>Chưa thể làm</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                background: "#ccc",
                color: "#fff",
                textAlign: "center",
                height: 140,
              }}
              onClick={() => {
                if (user.level < 4) {
                  message.warning(`Bạn phải hoàn thành nhiệm vụ 4`);
                }
              }}
            >
              <p>Nhiệm vụ 5</p>
              <p>Chưa thể làm</p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <div
              onClick={() => {
                if (user.level < 4) {
                  message.warning(`Bạn phải hoàn thành nhiệm vụ 5`);
                }
              }}
            >
              <h2 style={{ color: "rgb(209 0 0)" }}>
                ************************ Nhiệm vụ đặc biệt
                ************************
              </h2>
            </div>
          </Col>
        </Row>
        {user?.giftCode && (
          <div style={{ marginTop: 20, color: "green", fontSize: 18 }}>
            🎁 Mã giảm giá của bạn: <strong>{user.giftCode}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppGame;
