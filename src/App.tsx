import UserProvider, {
  IUserContext,
  UserContext,
} from "./context/UserProvider";
import Login from "./components/Login";
import { useContext } from "react";
import AppGame from "./components/AppGame";
import ExportToExcel from "./components/ExportFirestore";
import ParticlesBackground from "./components/ParticlesBackground";
import Header from "./layouts/Header";

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
        //height: "100vh",
        background: "#000",
      }}
    >
      <Header />
      <ParticlesBackground />
      {user?.phone === "0123456789" && user?.name === "admin" ? (
        <ExportToExcel />
      ) : user?.phone ? (
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
