// src/components/Skills.js
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { usePortfolio } from "../context/PortfolioContext";

const Skills = () => {
  const { skills } = usePortfolio();

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: skills.frontend,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend Development",
      skills: skills.backend,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Database & Storage",
      skills: skills.database,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Cloud & DevOps",
      skills: skills.cloudDevOps,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Tools",
      skills: skills.tools,
      color: "from-gray-500 to-slate-500",
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "text-green-500";
      case "Intermediate":
        return "text-yellow-500";
      case "Learning":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500/20 text-green-500 border border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30";
      case "Learning":
        return "bg-blue-500/20 text-blue-500 border border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border border-gray-500/30";
    }
  };

  const getLevelBackground = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500/10";
      case "Intermediate":
        return "bg-yellow-500/10";
      case "Learning":
        return "bg-blue-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  return (
    <AnimatedSection id="skills">
      <div className="container mx-auto px-6">
        {/* Title with Liquid Glass */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground relative z-10">
            Technical Skills
          </h2>
          {/* Liquid Glass background for title */}
          <div className="absolute inset-0 -m-4 bg-primary/5 rounded-2xl" />
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: categoryIndex * 0.1,
              }}
            >
              {/* Category Header with Liquid Glass */}
              <div className="relative">
                <div className="flex items-center gap-6 relative z-10">
                  <div
                    className={`h-2 w-20 bg-card/50 dark:bg-card/30 rounded-full relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-60`}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                {/* Liquid Glass background for category header */}
                <div className="absolute inset-0 -m-3 bg-card/20 dark:bg-card/10 rounded-xl" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className={`group relative flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-card/30 dark:bg-card/10 border border-white/10 transition-all duration-300 hover:shadow-lg ${getLevelBackground(skill.level)}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: skillIndex * 0.03,
                    }}
                    whileHover={{
                      scale: 1.01,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                    />

                    <div className="relative z-10">
                      <div className="p-4 rounded-xl bg-white/10 dark:bg-black/20">
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className={`w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110 ${
                            skill.invert ? "dark:invert" : ""
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="text-center relative z-10">
                      <p className="font-semibold text-foreground text-base mb-3 group-hover:text-primary transition-colors duration-300">
                        {skill.name}
                      </p>
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getLevelBadge(skill.level)}`}
                      >
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
