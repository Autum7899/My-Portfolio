// src/components/Skills.js
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { skills } from "/src/data/portfolioData.jsx";

const Skills = () => {
  const skillCategories = [
    { title: "Frontend Development", skills: skills.frontend, color: "from-blue-500 to-cyan-500" },
    { title: "Backend Development", skills: skills.backend, color: "from-green-500 to-emerald-500" },
    { title: "Database & Storage", skills: skills.database, color: "from-orange-500 to-red-500" },
    { title: "Cloud & DevOps", skills: skills.cloudDevOps, color: "from-purple-500 to-pink-500" },
    { title: "Tools", skills: skills.tools, color: "from-gray-500 to-slate-500" }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced": return "text-green-500";
      case "Intermediate": return "text-yellow-500";
      case "Learning": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case "Advanced": return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "Learning": return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      default: return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <AnimatedSection id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Technical Skills
        </h2>
        
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: categoryIndex * 0.05 
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-1 w-16 bg-gradient-to-r ${category.color} rounded-full`}></div>
                <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeOut",
                      delay: skillIndex * 0.02 
                    }}
                  >
                    <div className="relative">
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className={`w-12 h-12 object-contain transition-transform duration-200 group-hover:scale-105 ${
                          skill.invert ? "dark:invert" : ""
                        }`}
                      />
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getLevelColor(skill.level)}`}></div>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm mb-1">
                        {skill.name}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
export default Skills;
