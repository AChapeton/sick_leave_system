import { HashRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NewApplicationPage } from "./pages/NewApplicationPage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new_application" element={<NewApplicationPage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
