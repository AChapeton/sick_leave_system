import { HashRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./modules/LoginPage";
import { HomePage } from "./modules/HomePage";
import { NewApplicationPage } from "./modules/NewApplicationPage";

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
