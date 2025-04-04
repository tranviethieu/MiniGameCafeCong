// import GameLayout from "./layouts/GameLayout";
// import MainApp from "./components/MainApp";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import StartGame from "./pages/auth/StartGame/StartGame";
import ExportToExcel from "./components/ExportFirestore";
import MainGame from "./pages/home/MainGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <StartGame />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ExportToExcel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainGame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <ProtectedRoute>
              <ThankYouPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
