// src/components/Projects.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ArrowRight, ExternalLink, Calendar, Code2, Star, Eye, Filter, Grid, List, Search } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { projects } from '/src/data/portfolioData.jsx';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30
    },
    visible: { 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'web', name: 'Web Development', count: projects.filter(p => p.tags.some(tag => ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript'].includes(tag))).length },
    { id: 'backend', name: 'Backend', count: projects.filter(p => p.tags.some(tag => ['Node.js', 'Express', 'C#', '.NET', 'Python', 'Django'].includes(tag))).length },
    { id: 'database', name: 'Database', count: projects.filter(p => p.tags.some(tag => ['MySQL', 'SQL Server', 'MongoDB'].includes(tag))).length }
  ];

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || 
      project.tags.some(tag => {
        switch(selectedCategory) {
          case 'web': return ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript'].includes(tag);
          case 'backend': return ['Node.js', 'Express', 'C#', '.NET', 'Python', 'Django'].includes(tag);
          case 'database': return ['MySQL', 'SQL Server', 'MongoDB'].includes(tag);
          default: return true;
        }
      });
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              Featured Projects
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
          
          {/* Description */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Here are some of my recent projects that showcase my skills in full-stack development, 
              problem-solving, and attention to detail. Each project represents a unique challenge 
              and learning opportunity.
            </motion.p>

            <motion.div
              className="w-24 h-1 liquid-glass mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Enhanced Controls */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 liquid-glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'liquid-glass text-primary-foreground'
                        : 'liquid-glass-card text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex liquid-glass-card rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'liquid-glass text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'liquid-glass text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Projects Display */}
          <motion.div 
            className={`${
              viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
            }`}
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative ${
                  viewMode === 'list' 
                    ? 'flex flex-col md:flex-row gap-6 p-6 liquid-glass-card liquid-glass-hover rounded-2xl' 
                    : 'liquid-glass-card liquid-glass-hover rounded-2xl overflow-hidden shadow-xl liquid-gradient-accent transition-all duration-300'
                }`}
                whileHover={{ 
                  scale: viewMode === 'grid' ? 1.02 : 1.01, 
                  y: viewMode === 'grid' ? -8 : -2,
                  rotateY: viewMode === 'grid' ? 2 : 0
                }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Project Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'md:w-80 h-48' : 'h-64'
                }`}>
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
                  {index < 2 && (
                    <motion.div 
                      className="absolute top-4 left-4 liquid-glass px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Star size={12} className="inline mr-1" />
                      Featured
                    </motion.div>
                  )}
                </div>

                {/* Project Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <motion.div
                      className="flex items-center text-muted-foreground text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <Calendar size={14} className="mr-1" />
                      <span>2024</span>
                    </motion.div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-3 py-1 liquid-glass-card text-xs font-medium text-foreground rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * tagIndex }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.demo}
                      className="flex items-center gap-2 px-4 py-2 liquid-glass text-primary-foreground rounded-lg font-medium transition-all duration-300"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                      View Demo
                      <ArrowRight size={16} />
                    </motion.a>
                    <motion.a
                      href={project.repo}
                      className="flex items-center gap-2 px-4 py-2 liquid-glass-card text-foreground rounded-lg font-medium transition-all duration-300 hover:liquid-glass"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>

                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: 180 }}
                  whileHover={{ 
                    scale: 1, 
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="liquid-glass-card p-8 rounded-2xl max-w-md mx-auto">
                <Search size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <div className="liquid-glass-card p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Interested in Working Together?
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm always excited to take on new challenges and create amazing projects. 
                Let's discuss how we can bring your ideas to life!
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 liquid-glass text-primary-foreground rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 size={20} />
                Start a Project
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;