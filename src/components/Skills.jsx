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
        {/* Enhanced Title with Liquid Glass */}
        <motion.div 
          className="relative mb-16"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10"
          >
            Technical Skills
          </motion.h2>
          {/* Liquid Glass background for title */}
          <motion.div 
            className="absolute inset-0 -m-4 liquid-glass rounded-2xl"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="space-y-8"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: categoryIndex * 0.05 
              }}
            >
              {/* Enhanced Category Header with Liquid Glass */}
              <div className="relative">
                <div className="flex items-center gap-6 relative z-10">
                  <div 
                    className={`h-2 w-20 liquid-glass rounded-full relative overflow-hidden`}
                  >
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-60`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                </div>
                {/* Liquid Glass background for category header */}
                <div 
                  className="absolute inset-0 -m-3 liquid-glass-card rounded-xl"
                />
              </div>
              
              {/* Enhanced Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className={`group relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl liquid-glass-card liquid-glass-hover transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${getLevelBackground(skill.level)} overflow-hidden`}
                    initial={{ y: 20, scale: 0.9 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeOut",
                      delay: skillIndex * 0.03 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    {/* Gradient overlay for enhanced liquid glass effect */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div 
                      className="absolute inset-0 liquid-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="relative p-3 rounded-xl liquid-glass-card"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className={`w-12 h-12 object-contain transition-all duration-300 group-hover:drop-shadow-lg ${
                            skill.invert ? "dark:invert" : ""
                          }`}
                        />
                      </motion.div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <p className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                        {skill.name}
                      </p>
                      <motion.span 
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelBadge(skill.level)}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {skill.level}
                      </motion.span>
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
