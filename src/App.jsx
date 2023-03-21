import { HashRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { ConfirmDeleteApp } from "./pages/ConfirmDeleteApp";
import { ProtectedRoute } from "./hooks/useProtectedRoute";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new_application" element={<NewApplicationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/confirm_delete_app" element={<ConfirmDeleteApp />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
