// src/components/Projects.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { projects } from '/src/data/portfolioData.jsx';

const Projects = () => {
  return (
    <AnimatedSection id="projects">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg overflow-hidden group shadow-lg border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => <span key={tag} className="bg-muted text-primary text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>)}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <a href={project.demo} className="text-primary hover:text-primary/90 font-semibold inline-flex items-center group/link">
                    View Demo <ArrowRight className="inline w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                  <a href={project.repo} className="text-muted-foreground hover:text-foreground"><Github /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
export default Projects;