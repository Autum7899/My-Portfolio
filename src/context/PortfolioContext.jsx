import React, { createContext, useContext, useState, useEffect } from "react";

// Default data - will be used as fallback if API fails
const defaultData = {
  user: {
    name: "Minh Sơn",
    title: "Information Systems Student & Aspiring Developer",
    location: "Hanoi, Vietnam",
    bio: "A third-year Computer Science student specializing in Information Systems. Passionate about building robust applications and solving complex problems with code.",
    profileImage: "https://placehold.co/150x150/1e293b/a5b4fc?text=LMS",
    socials: {
      github: "https://github.com/Autum7899",
      linkedin: "https://www.linkedin.com/in/sơn-minh-3837a8370/",
      twitter: "#",
    },
    email: "minhson789999@gmail.com",
  },
  career: [
    {
      id: 1,
      institution: "University of Economics - Technology for Industries",
      degree: "Engineering degree in Information Technology",
      major: "Information Systems",
      date: "Expected Graduation: 2026",
      description:
        "Focusing on database management, system analysis, and full-stack web development.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "University Web Project",
      description:
        "A comprehensive university project focused on database management and web interfaces.",
      image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+1",
      tags: ["React", "SQL Server", "Express"],
      demo: "#",
      repo: "#",
    },
  ],
  skills: {
    frontend: [
      {
        id: 1,
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: "Advanced",
      },
    ],
    backend: [],
    database: [],
    cloudDevOps: [],
    tools: [],
  },
};

const API_BASE = "/.netlify/functions";

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

// Helper to transform DB user to frontend format
const transformUser = (dbUser) => {
  if (!dbUser) return defaultData.user;
  return {
    name: dbUser.name,
    title: dbUser.title,
    location: dbUser.location,
    bio: dbUser.bio,
    profileImage: dbUser.profile_image || dbUser.profileImage,
    email: dbUser.email,
    socials: {
      github: dbUser.github || dbUser.socials?.github || "#",
      linkedin: dbUser.linkedin || dbUser.socials?.linkedin || "#",
      twitter: dbUser.twitter || dbUser.socials?.twitter || "#",
    },
  };
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });

  const [authToken, setAuthToken] = useState(() => {
    return sessionStorage.getItem("admin_token") || null;
  });

  // Fetch data from API on mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // Save to localStorage as backup
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("portfolio_data", JSON.stringify(data));
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    }
  }, [data, loading]);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/get-portfolio`);

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }

      const apiData = await response.json();

      setData({
        user: transformUser(apiData.user),
        career: apiData.career || apiData.education || [],
        projects: apiData.projects || [],
        skills: apiData.skills || defaultData.skills,
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching portfolio data:", err);
      setError(err.message);
      // Fall back to localStorage if API fails
      try {
        const saved = localStorage.getItem("portfolio_data");
        if (saved) {
          setData(JSON.parse(saved));
        } else {
          // Use default data if nothing in localStorage
          setData(defaultData);
        }
      } catch (e) {
        console.error("Error loading from localStorage:", e);
        // Use default data as final fallback
        setData(defaultData);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper for authenticated API calls
  const apiCall = async (endpoint, method, body) => {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API call failed");
    }

    return response.json();
  };

  // Update user data
  const updateUser = async (newUserData) => {
    try {
      await apiCall("admin-user", "PUT", newUserData);
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, ...newUserData },
      }));
      return true;
    } catch (err) {
      console.error("Error updating user:", err);
      // Still update locally
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, ...newUserData },
      }));
      return false;
    }
  };

  // Career CRUD
  const addCareer = async (career) => {
    try {
      const result = await apiCall("admin-career", "POST", career);
      setData((prev) => ({
        ...prev,
        career: [...prev.career, { ...career, id: result.id }],
      }));
      return true;
    } catch (err) {
      console.error("Error adding career:", err);
      // Add locally with temp id
      const tempId = Date.now();
      setData((prev) => ({
        ...prev,
        career: [...prev.career, { ...career, id: tempId }],
      }));
      return false;
    }
  };

  const updateCareer = async (updatedCareer) => {
    try {
      if (Array.isArray(updatedCareer)) {
        setData((prev) => ({
          ...prev,
          career: updatedCareer,
        }));
        return true;
      }

      await apiCall("admin-career", "PUT", updatedCareer);
      setData((prev) => ({
        ...prev,
        career: prev.career.map((e) =>
          e.id === updatedCareer.id ? updatedCareer : e,
        ),
      }));
      return true;
    } catch (err) {
      console.error("Error updating career:", err);
      if (!Array.isArray(updatedCareer)) {
        setData((prev) => ({
          ...prev,
          career: prev.career.map((e) =>
            e.id === updatedCareer.id ? updatedCareer : e,
          ),
        }));
      }
      return false;
    }
  };

  const deleteCareer = async (id) => {
    try {
      await apiCall("admin-career", "DELETE", { id });
      setData((prev) => ({
        ...prev,
        career: prev.career.filter((e) => e.id !== id),
      }));
      return true;
    } catch (err) {
      console.error("Error deleting career:", err);
      setData((prev) => ({
        ...prev,
        career: prev.career.filter((e) => e.id !== id),
      }));
      return false;
    }
  };

  // Projects CRUD
  const addProject = async (project) => {
    try {
      const result = await apiCall("admin-projects", "POST", project);
      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...project, id: result.id }],
      }));
      return true;
    } catch (err) {
      console.error("Error adding project:", err);
      const tempId = Date.now();
      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...project, id: tempId }],
      }));
      return false;
    }
  };

  const updateProjects = async (updatedProjects) => {
    if (Array.isArray(updatedProjects)) {
      setData((prev) => ({
        ...prev,
        projects: updatedProjects,
      }));
      return true;
    }

    try {
      await apiCall("admin-projects", "PUT", updatedProjects);
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === updatedProjects.id ? updatedProjects : p,
        ),
      }));
      return true;
    } catch (err) {
      console.error("Error updating project:", err);
      return false;
    }
  };

  const deleteProject = async (id) => {
    try {
      await apiCall("admin-projects", "DELETE", { id });
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
      return true;
    } catch (err) {
      console.error("Error deleting project:", err);
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
      return false;
    }
  };

  // Skills CRUD
  const addSkill = async (category, skill) => {
    try {
      const result = await apiCall("admin-skills", "POST", {
        ...skill,
        category,
      });
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [
            ...(prev.skills[category] || []),
            { ...skill, id: result.id },
          ],
        },
      }));
      return true;
    } catch (err) {
      console.error("Error adding skill:", err);
      const tempId = Date.now();
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [
            ...(prev.skills[category] || []),
            { ...skill, id: tempId },
          ],
        },
      }));
      return false;
    }
  };

  const updateSkills = async (category, updatedSkills) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: updatedSkills,
      },
    }));
    return true;
  };

  const deleteSkill = async (category, id) => {
    try {
      await apiCall("admin-skills", "DELETE", { id });
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: prev.skills[category].filter((s) => s.id !== id),
        },
      }));
      return true;
    } catch (err) {
      console.error("Error deleting skill:", err);
      setData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: prev.skills[category].filter((s) => s.id !== id),
        },
      }));
      return false;
    }
  };

  // Authentication
  const login = async (password) => {
    try {
      const response = await fetch(`${API_BASE}/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAuthenticated(true);
        setAuthToken(result.token);
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_token", result.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      // Fallback to local auth for development
      const ADMIN_PASSWORD = "admin123";
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setAuthToken("dev-token");
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_token", "dev-token");
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_token");
  };

  // Data management
  const resetToDefault = () => {
    setData(defaultData);
    fetchPortfolioData();
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      setData(parsed);
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  };

  const refreshData = () => {
    fetchPortfolioData();
  };

  const value = {
    // Data
    user: data.user,
    career: data.career,
    projects: data.projects,
    skills: data.skills,
    loading,
    error,

    // User actions
    updateUser,

    // Career actions
    updateCareer,
    addCareer,
    deleteCareer,

    // Project actions
    updateProjects,
    addProject,
    deleteProject,

    // Skill actions
    updateSkills,
    addSkill,
    deleteSkill,

    // Auth
    isAuthenticated,
    login,
    logout,

    // Data management
    resetToDefault,
    exportData,
    importData,
    refreshData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
