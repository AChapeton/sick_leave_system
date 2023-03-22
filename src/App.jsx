import { HashRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { ConfirmDeleteApp } from "./pages/ConfirmDeleteApp";
import { ProtectedRoute } from "./hooks/useProtectedRoute";
import { useLogin } from "./hooks/store";
import "./styles/base.scss";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new_application"
            element={
              <ProtectedRoute>
                <NewApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm_delete_app"
            element={
              <ProtectedRoute>
                <ConfirmDeleteApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
