import React, { createContext, useContext, useState, useEffect } from "react";

// Default data - will be used as initial state if no data in localStorage
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
  education: [
    {
      id: 1,
      institution: "University of Economics - Technology for Industries",
      degree: "Engineering degree in Information Technology",
      major: "Information Systems",
      date: "Expected Graduation: 2026",
      description:
        "Focusing on database management, system analysis, and full-stack web development. Consistently maintaining a high GPA through challenging coursework and practical projects.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "University Web Project",
      description:
        "A comprehensive university project focused on database management and web interfaces, built with React and SQL.",
      image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+1",
      tags: ["React", "SQL Server", "Express"],
      demo: "#",
      repo: "#",
    },
    {
      id: 2,
      title: "Personal .NET App",
      description:
        "An personal learning project to explore backend development using C# and the .NET framework.",
      image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+2",
      tags: ["C#", ".NET", "MySQL"],
      demo: "#",
      repo: "#",
    },
    {
      id: 3,
      title: "Next.js Portfolio",
      description:
        "A personal portfolio website (like this one) built to showcase skills and projects, using Next.js for performance.",
      image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+3",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      demo: "#",
      repo: "#",
    },
  ],
  skills: {
    frontend: [
      {
        id: 1,
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: "Advanced",
      },
      {
        id: 2,
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: "Advanced",
      },
      {
        id: 3,
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: "Advanced",
      },
      {
        id: 4,
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: "Intermediate",
      },
      {
        id: 5,
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: "Advanced",
      },
      {
        id: 6,
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invert: true,
        level: "Intermediate",
      },
      {
        id: 7,
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        level: "Learning",
      },
      {
        id: 8,
        name: "Tailwind CSS",
        logo: "/Tailwind CSS.svg",
        level: "Advanced",
      },
      {
        id: 9,
        name: "SASS/SCSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
        level: "Intermediate",
      },
      {
        id: 10,
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        level: "Intermediate",
      },
    ],
    backend: [
      {
        id: 1,
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: "Advanced",
      },
      {
        id: 2,
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        invert: true,
        level: "Advanced",
      },
      {
        id: 3,
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        level: "Intermediate",
      },
      {
        id: 4,
        name: "Spring Boot",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        level: "Learning",
      },
      {
        id: 5,
        name: "C#",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        level: "Intermediate",
      },
      {
        id: 6,
        name: ".NET",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
        level: "Intermediate",
      },
      {
        id: 7,
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        level: "Learning",
      },
      {
        id: 8,
        name: "Django",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        level: "Learning",
      },
      {
        id: 9,
        name: "FastAPI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        level: "Learning",
      },
      {
        id: 10,
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        level: "Learning",
      },
      {
        id: 11,
        name: "Laravel",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        level: "Learning",
      },
    ],
    database: [
      {
        id: 1,
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        level: "Advanced",
      },
      {
        id: 2,
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        level: "Intermediate",
      },
      {
        id: 3,
        name: "SQL Server",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
        level: "Intermediate",
      },
      {
        id: 4,
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: "Learning",
      },
      {
        id: 5,
        name: "Redis",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        level: "Learning",
      },
      {
        id: 6,
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        level: "Learning",
      },
    ],
    cloudDevOps: [
      {
        id: 1,
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: "Intermediate",
      },
      {
        id: 2,
        name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        level: "Learning",
      },
      {
        id: 3,
        name: "Azure",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        level: "Learning",
      },
      {
        id: 4,
        name: "Google Cloud",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        level: "Learning",
      },
      {
        id: 5,
        name: "Kubernetes",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
        level: "Learning",
      },
      {
        id: 6,
        name: "GitHub Actions",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        level: "Learning",
      },
      {
        id: 7,
        name: "Jenkins",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        level: "Learning",
      },
    ],
    tools: [
      {
        id: 1,
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: "Advanced",
      },
      {
        id: 2,
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        level: "Advanced",
      },
      {
        id: 3,
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        level: "Intermediate",
      },
      {
        id: 4,
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        level: "Intermediate",
      },
      {
        id: 5,
        name: "Jira",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
        level: "Learning",
      },
      {
        id: 6,
        name: "Slack",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
        level: "Learning",
      },
    ],
  },
};

const STORAGE_KEY = "portfolio_data";

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Try to load from localStorage on initial render
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    return defaultData;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [data]);

  // Update user data
  const updateUser = (newUserData) => {
    setData((prev) => ({
      ...prev,
      user: { ...prev.user, ...newUserData },
    }));
  };

  // Update education
  const updateEducation = (newEducation) => {
    setData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const addEducation = (education) => {
    const newId = Math.max(...data.education.map((e) => e.id || 0), 0) + 1;
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id: newId }],
    }));
  };

  const deleteEducation = (id) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  // Update projects
  const updateProjects = (newProjects) => {
    setData((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  const addProject = (project) => {
    const newId = Math.max(...data.projects.map((p) => p.id || 0), 0) + 1;
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: newId }],
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Update skills
  const updateSkills = (category, newSkills) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: newSkills,
      },
    }));
  };

  const addSkill = (category, skill) => {
    const categorySkills = data.skills[category] || [];
    const newId = Math.max(...categorySkills.map((s) => s.id || 0), 0) + 1;
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), { ...skill, id: newId }],
      },
    }));
  };

  const deleteSkill = (category, id) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s.id !== id),
      },
    }));
  };

  // Authentication
  const login = (password) => {
    // Simple password check - in production, use proper authentication
    const ADMIN_PASSWORD = "admin123"; // Change this!
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  // Reset to default data
  const resetToDefault = () => {
    setData(defaultData);
  };

  // Export data
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

  // Import data
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

  const value = {
    // Data
    user: data.user,
    education: data.education,
    projects: data.projects,
    skills: data.skills,

    // User actions
    updateUser,

    // Education actions
    updateEducation,
    addEducation,
    deleteEducation,

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
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
