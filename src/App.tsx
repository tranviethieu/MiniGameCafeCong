import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFountainPreset } from "tsparticles-preset-fountain";
import UserProvider, {
  IUserContext,
  UserContext,
} from "./context/UserProvider";
import Login from "./components/Login";
import { useContext } from "react";
import AppGame from "./components/AppGame";

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  const { user } = useContext<IUserContext>(UserContext);
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
    >
      <FountainBackground />
      {user?.phone ? (
        <AppGame />
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Căn giữa hoàn toàn ///
            textAlign: "center",
          }}
        >
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
function FountainBackground() {
  const particlesInit = async (engine: Engine) => {
    console.log("Particles Engine Loaded", engine);
    await loadFountainPreset(engine); // Chỉ load preset Fountain
  };

  return <Particles init={particlesInit} options={{ preset: "fountain" }} />;
}
