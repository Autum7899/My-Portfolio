import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { User, GraduationCap, Briefcase, Code } from "lucide-react";

const AdminDashboard = () => {
  const { user, education, projects, skills } = usePortfolio();

  const totalSkills = Object.values(skills).reduce(
    (acc, category) => acc + category.length,
    0,
  );

  const stats = [
    {
      label: "Education Entries",
      value: education.length,
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      label: "Projects",
      value: projects.length,
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      label: "Total Skills",
      value: totalSkills,
      icon: Code,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back, {user.name}! Manage your portfolio from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4"
          >
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {stat.value}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <User className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Profile Overview
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {user.name}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400">{user.title}</p>
            <p className="text-gray-500 dark:text-gray-400">{user.location}</p>
            <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/user"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <User className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Edit Profile
            </span>
          </a>
          <a
            href="/admin/education"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Edit Education
            </span>
          </a>
          <a
            href="/admin/projects"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          >
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Edit Projects
            </span>
          </a>
          <a
            href="/admin/skills"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          >
            <Code className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Edit Skills
            </span>
          </a>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Recent Projects
        </h2>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
