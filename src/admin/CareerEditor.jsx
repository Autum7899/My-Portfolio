import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Save, Plus, Trash2, Briefcase, Edit2, X } from "lucide-react";

const CareerEditor = () => {
  const { career, updateCareer, addCareer, deleteCareer } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    major: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setShowAddForm(false);
  };

  const handleSave = () => {
    const updatedCareer = career.map((item) =>
      item.id === editingId ? { ...formData, id: editingId } : item,
    );
    updateCareer(updatedCareer);
    setEditingId(null);
    setFormData({
      institution: "",
      degree: "",
      major: "",
      date: "",
      description: "",
    });
  };

  const handleAdd = () => {
    addCareer(formData);
    setShowAddForm(false);
    setFormData({
      institution: "",
      degree: "",
      major: "",
      date: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this career entry?")) {
      deleteCareer(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      institution: "",
      degree: "",
      major: "",
      date: "",
      description: "",
    });
  };

  const renderForm = (isAdding = false) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Institution / Company
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="University or Company Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Degree / Position
          </label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="Bachelor's, Developer, etc."
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Major / Department
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="Computer Science, Engineering, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            placeholder="2020 - 2024 or Expected 2026"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Describe your role, achievements, etc."
        />
      </div>
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
          {isAdding ? "Add Career" : "Save Changes"}
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
            Career
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your career history
          </p>
        </div>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Career
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add New Career Entry
          </h2>
          {renderForm(true)}
        </div>
      )}

      {/* Career List */}
      <div className="space-y-4">
        {career.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            {editingId === item.id ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Edit Career
                </h2>
                {renderForm(false)}
              </>
            ) : (
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.institution}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">
                    {item.degree}
                  </p>
                  {item.major && (
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.major}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {career.length === 0 && !showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            No Career Entries Added
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add your career history to showcase your background.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus size={18} />
            Add Career
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerEditor;
