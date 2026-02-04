import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import UserEditor from "./admin/UserEditor.jsx";
import CareerEditor from "./admin/CareerEditor.jsx";
import ProjectsEditor from "./admin/ProjectsEditor.jsx";
import SkillsEditor from "./admin/SkillsEditor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Portfolio */}
          <Route path="/" element={<App />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="user" element={<UserEditor />} />
            <Route path="career" element={<CareerEditor />} />
            <Route path="projects" element={<ProjectsEditor />} />
            <Route path="skills" element={<SkillsEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  </StrictMode>,
);
