// src/components/Skills.js
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { skills } from "/src/data/portfolioData.jsx";

const Skills = () => {
  return (
    <AnimatedSection id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Technical Skills
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 text-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg transition-transform transform hover:-translate-y-2 duration-300"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                className={`w-16 h-16 object-contain ${
                  skill.invert ? "dark:invert" : ""
                }`}
              />
              <p className="font-semibold text-muted-foreground">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
export default Skills;
