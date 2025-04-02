import UserProvider, {
  IUserContext,
  UserContext,
} from "./context/UserProvider";

import { useContext } from "react";
import AppGame from "./components/AppGame";
import ExportToExcel from "./components/ExportFirestore";
import ParticlesBackground from "./components/ParticlesBackground";
import Header from "./layouts/Header";
import StartGame from "./components/StartGame";
import GameLayout from "./layouts/GameLayout";

function App() {
  return (
    <UserProvider>
      <GameLayout>
        <MainApp />
      </GameLayout>
    </UserProvider>
  );
}

function MainApp() {
  const { user } = useContext<IUserContext>(UserContext);
  return user?.phone === "0123456789" && user?.name === "admin" ? (
    <ExportToExcel />
  ) : user?.phone ? (
    <div
      style={{
        position: "relative",
        width: "100vw",
        //height: "100vh",
        background: "#000",
      }}
    >
      <Header />
      <ParticlesBackground />
      <AppGame />
    </div>
  ) : (
    <StartGame />
  );
}

export default App;
