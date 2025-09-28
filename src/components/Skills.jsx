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
      case "Advanced": return "bg-green-500/20 text-green-500 border border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30";
      case "Learning": return "bg-blue-500/20 text-blue-500 border border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-500 border border-gray-500/30";
    }
  };

  const getLevelBackground = (level) => {
    switch (level) {
      case "Advanced": return "bg-green-500/10";
      case "Intermediate": return "bg-yellow-500/10";
      case "Learning": return "bg-blue-500/10";
      default: return "bg-gray-500/10";
    }
  };

  return (
    <AnimatedSection id="skills">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>
        
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
                <div className={`h-1 w-16 liquid-glass rounded-full`}></div>
                <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl liquid-glass-card liquid-glass-hover transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${getLevelBackground(skill.level)}`}
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
                    </div>
                    
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm mb-1">
                        {skill.name}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelBadge(skill.level)}`}>
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
