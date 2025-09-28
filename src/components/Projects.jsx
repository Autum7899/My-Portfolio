// src/components/Projects.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ArrowRight, ExternalLink, Calendar, Code2, Star, Eye } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { projects } from '/src/data/portfolioData.jsx';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatedSection id="projects">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Featured Projects
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Here are some of my recent projects that showcase my skills in full-stack development, 
              problem-solving, and attention to detail. Each project represents a unique challenge 
              and learning opportunity.
            </motion.p>

            <motion.div
              className="w-24 h-1 liquid-glass mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative liquid-glass-card liquid-glass-hover rounded-2xl overflow-hidden shadow-xl liquid-gradient-accent transition-all duration-300"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                rotateY: 2
              }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              style={{ transformStyle: "preserve-3d" }}
            >
                {/* Project Image */}
                <div className="relative overflow-hidden h-64">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Project Links */}
                  <motion.div 
                    className="absolute top-4 right-4 flex space-x-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.demo}
                      className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </motion.a>
                    <motion.a
                      href={project.repo}
                      className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                  </motion.div>

                  {/* Featured Badge */}
                  <motion.div
                    className="absolute top-4 left-4 liquid-glass text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    Featured
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <motion.h3 
                    className="text-2xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground mb-4 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tag}
                        className="liquid-glass-card text-primary text-xs font-semibold px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + tagIndex * 0.05 }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "rgba(59, 130, 246, 0.2)" 
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <motion.div 
                    className="flex items-center justify-between text-sm text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Calendar size={14} />
                        <span>2024</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Code2 size={14} />
                        <span>Full-Stack</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.demo}
                      className="text-primary hover:text-primary/90 font-semibold inline-flex items-center group/link"
                      whileHover={{ x: 5 }}
                    >
                      View Demo 
                      <motion.div
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.a>
                    
                    <motion.a
                      href={project.repo}
                      className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), transparent)",
                    filter: "blur(10px)"
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Hover Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/50 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              className="liquid-glass-card liquid-gradient-primary rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Interested in seeing more?
              </h3>
              <p className="text-muted-foreground mb-6">
                Check out my GitHub profile for more projects and contributions.
              </p>
              <motion.a
                href={projects[0]?.repo || '#'}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View All Projects
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};
export default Projects;