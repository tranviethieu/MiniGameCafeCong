import GameLayout from "./layouts/GameLayout";
import MainApp from "./components/MainApp";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <GameLayout>
        <MainApp />
      </GameLayout>
    </UserProvider>
  );
}

export default App;
