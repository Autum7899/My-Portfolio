import React, { useState } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  LogOut,
  Menu,
  X,
  Home,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";

const AdminLayout = () => {
  const { isAuthenticated, logout, exportData, importData, resetToDefault } =
    usePortfolio();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard", exact: true },
    { path: "/admin/user", icon: User, label: "User Profile" },
    { path: "/admin/education", icon: GraduationCap, label: "Education" },
    { path: "/admin/projects", icon: Briefcase, label: "Projects" },
    { path: "/admin/skills", icon: Code, label: "Skills" },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const success = importData(event.target.result);
          if (success) {
            alert("Data imported successfully!");
          } else {
            alert("Failed to import data. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data to default? This action cannot be undone.",
      )
    ) {
      resetToDefault();
      alert("Data has been reset to default.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path, item.exact)
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          <button
            onClick={exportData}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={20} />
            {sidebarOpen && <span>Export Data</span>}
          </button>
          <button
            onClick={handleImport}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Upload size={20} />
            {sidebarOpen && <span>Import Data</span>}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
          >
            <RotateCcw size={20} />
            {sidebarOpen && <span>Reset Data</span>}
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Home size={20} />
            {sidebarOpen && <span>View Site</span>}
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
