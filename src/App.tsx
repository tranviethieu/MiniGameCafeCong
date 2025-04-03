import GameLayout from "./layouts/GameLayout";
import MainApp from "./components/MainApp";
import UserProvider from "./context/UserProvider";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(17 24 39 / var(--tw-bg-opacity, 1))",
          },
        },
      }}
    >
      <UserProvider>
        <GameLayout>
          <MainApp />
        </GameLayout>
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
