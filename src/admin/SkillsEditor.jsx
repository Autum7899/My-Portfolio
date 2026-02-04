import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Save, Plus, Trash2, Code, Edit2, X } from "lucide-react";

const SKILL_CATEGORIES = [
  { key: "frontend", label: "Frontend", color: "bg-blue-500" },
  { key: "backend", label: "Backend", color: "bg-green-500" },
  { key: "database", label: "Database", color: "bg-yellow-500" },
  { key: "cloudDevOps", label: "Cloud & DevOps", color: "bg-purple-500" },
  { key: "tools", label: "Tools", color: "bg-orange-500" },
];

const SKILL_LEVELS = ["Learning", "Intermediate", "Advanced", "Expert"];

const SkillsEditor = () => {
  const { skills, updateSkills, addSkill, deleteSkill } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    level: "Intermediate",
    invert: false,
  });

  const currentSkills = skills[activeCategory] || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData(skill);
    setShowAddForm(false);
  };

  const handleSave = () => {
    const updatedSkills = currentSkills.map((skill) =>
      skill.id === editingId ? { ...formData, id: editingId } : skill,
    );
    updateSkills(activeCategory, updatedSkills);
    setEditingId(null);
    resetForm();
  };

  const handleAdd = () => {
    addSkill(activeCategory, formData);
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(activeCategory, id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      level: "Intermediate",
      invert: false,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Advanced":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Learning":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const renderForm = (isAdding = false) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="React, Node.js, etc."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
          >
            {SKILL_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Logo URL
        </label>
        <input
          type="url"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
          placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Tip: Use devicons from https://devicon.dev/ for consistent icons
        </p>
      </div>

      {formData.logo && (
        <div className="flex items-center gap-4">
          <img
            src={formData.logo}
            alt="Preview"
            className={`w-12 h-12 object-contain ${formData.invert ? "dark:invert" : ""}`}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="invert"
              checked={formData.invert || false}
              onChange={handleChange}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            Invert in dark mode
          </label>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <X size={18} />
          Cancel
        </button>
        <button
          type="button"
          onClick={isAdding ? handleAdd : handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          {isAdding ? "Add Skill" : "Save Changes"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Skills
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your technical skills
          </p>
        </div>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Skill
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              handleCancel();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === cat.key
                ? `${cat.color} text-white`
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {cat.label}
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-sm">
              {(skills[cat.key] || []).length}
            </span>
          </button>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add New Skill to{" "}
            {SKILL_CATEGORIES.find((c) => c.key === activeCategory)?.label}
          </h2>
          {renderForm(true)}
        </div>
      )}

      {/* Skills Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        {editingId && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Edit Skill
            </h2>
            {renderForm(false)}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentSkills.map((skill) => (
            <div
              key={skill.id}
              className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${
                editingId === skill.id ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {skill.logo && (
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className={`w-10 h-10 object-contain ${skill.invert ? "dark:invert" : ""}`}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 dark:text-white truncate">
                    {skill.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${getLevelColor(skill.level)}`}
                  >
                    {skill.level}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentSkills.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Code className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No Skills in This Category
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Add skills to showcase your expertise.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsEditor;
