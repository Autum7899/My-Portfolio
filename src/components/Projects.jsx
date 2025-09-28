// src/components/Projects.js
import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Code2, 
  Star, 
  Eye, 
  Filter, 
  Grid, 
  List, 
  Search,
  ArrowRight,
  Zap,
  Clock,
  Tag,
  ChevronDown
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { projects } from '/src/data/portfolioData.jsx';

// Memoized Project Card Component for better performance
const ProjectCard = memo(({ 
  project, 
  index, 
  viewMode, 
  hoveredProject, 
  setHoveredProject 
}) => {
  const isHovered = hoveredProject === index;
  
  // Optimized animation variants
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother animation
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`group relative ${
        viewMode === 'list' 
          ? 'flex flex-col md:flex-row gap-6 p-6 liquid-glass-card liquid-glass-hover rounded-2xl' 
          : 'liquid-glass-card liquid-glass-hover rounded-2xl overflow-hidden shadow-xl transition-all duration-300'
      }`}
      whileHover={{ 
        scale: viewMode === 'grid' ? 1.02 : 1.01, 
        y: viewMode === 'grid' ? -8 : -2,
        transition: { duration: 0.2, ease: "easeOut" }
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
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Optimized Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        />
        
        {/* Project Links */}
        <motion.div 
          className="absolute top-4 right-4 flex space-x-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.2 }
          }}
        >
          <motion.a
            href={project.demo}
            className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <ExternalLink size={16} className="text-white dark:text-gray-900" />
          </motion.a>
          <motion.a
            href={project.repo}
            className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <Github size={16} className="text-white dark:text-gray-900" />
          </motion.a>
        </motion.div>

        {/* Featured Badge */}
        {index < 2 && (
          <motion.div 
            className="absolute top-4 left-4 liquid-glass px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground flex items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <Star size={12} />
            Featured
          </motion.div>
        )}
      </div>

      {/* Project Content */}
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <motion.div
            className="flex items-center text-muted-foreground text-sm"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Clock size={14} className="mr-1" />
            <span>2024</span>
          </motion.div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 6).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-3 py-1 liquid-glass-card text-xs font-medium text-foreground rounded-full flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: tagIndex * 0.05,
                duration: 0.2
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
            >
              <Tag size={10} />
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 6 && (
            <span className="px-3 py-1 liquid-glass-card text-xs font-medium text-muted-foreground rounded-full">
              +{project.tags.length - 6} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.demo}
            className="flex items-center gap-2 px-4 py-2 liquid-glass text-primary-foreground rounded-lg font-medium transition-all duration-200"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Eye size={16} />
            View Demo
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href={project.repo}
            className="flex items-center gap-2 px-4 py-2 liquid-glass-card text-foreground rounded-lg font-medium transition-all duration-200 hover:liquid-glass"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Github size={16} />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Memoized categories to prevent recalculation
  const categories = useMemo(() => [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.tags.some(tag => ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'].includes(tag))).length },
    { id: 'backend', name: 'Backend', count: projects.filter(p => p.tags.some(tag => ['Node.js', 'Express', 'C#', '.NET', 'Python', 'Django', 'FastAPI'].includes(tag))).length },
    { id: 'fullstack', name: 'Full-Stack', count: projects.filter(p => p.tags.some(tag => ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MySQL'].includes(tag)) && p.tags.length > 3).length },
    { id: 'database', name: 'Database', count: projects.filter(p => p.tags.some(tag => ['MySQL', 'SQL Server', 'MongoDB', 'PostgreSQL'].includes(tag))).length }
  ], []);

  // Memoized sort options
  const sortOptions = useMemo(() => [
    { id: 'newest', name: 'Newest First' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'name', name: 'Name A-Z' },
    { id: 'complexity', name: 'Most Complex' }
  ], []);

  // Optimized filtering and sorting with useMemo
  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesCategory = selectedCategory === 'all' || 
          project.tags.some(tag => {
            switch(selectedCategory) {
              case 'frontend': return ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'].includes(tag);
              case 'backend': return ['Node.js', 'Express', 'C#', '.NET', 'Python', 'Django', 'FastAPI'].includes(tag);
              case 'fullstack': return ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MySQL'].includes(tag) && project.tags.length > 3;
              case 'database': return ['MySQL', 'SQL Server', 'MongoDB', 'PostgreSQL'].includes(tag);
              default: return true;
            }
          });
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch(sortBy) {
          case 'newest': return 0;
          case 'oldest': return 0;
          case 'name': return a.title.localeCompare(b.title);
          case 'complexity': return b.tags.length - a.tags.length;
          default: return 0;
        }
      });
  }, [selectedCategory, searchTerm, sortBy]);

  // Optimized callbacks
  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const handleSortChange = useCallback((sortId) => {
    setSortBy(sortId);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // Optimized animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08, // Reduced stagger for faster animation
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
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
          {/* Enhanced Header */}
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
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Explore my collection of projects that demonstrate my skills in full-stack development, 
              problem-solving, and innovative thinking. Each project tells a story of learning and growth.
            </motion.p>
            <motion.div
              className="w-24 h-1 liquid-glass mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          {/* Optimized Controls */}
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
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 liquid-glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                />
              </div>

              {/* Filter Toggle */}
              <motion.button
                onClick={toggleFilters}
                className="flex items-center gap-2 px-4 py-3 liquid-glass-card rounded-xl text-foreground hover:liquid-glass transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <Filter size={20} />
                Filters
                <ChevronDown size={16} className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* View Mode Toggle */}
              <div className="flex liquid-glass-card rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'liquid-glass text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'liquid-glass text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
                </div>

            {/* Optimized Filters */}
            <AnimatePresence mode="wait">
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 p-6 liquid-glass-card rounded-xl"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <motion.button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedCategory === category.id
                                ? 'liquid-glass text-primary-foreground'
                                : 'liquid-glass-card text-muted-foreground hover:text-foreground'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.1 }}
                          >
                            {category.name} ({category.count})
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Sort By</h3>
                      <div className="flex flex-wrap gap-2">
                        {sortOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleSortChange(option.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              sortBy === option.id
                                ? 'liquid-glass text-primary-foreground'
                                : 'liquid-glass-card text-muted-foreground hover:text-foreground'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.1 }}
                          >
                            {option.name}
                          </motion.button>
                    ))}
                  </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
                  </motion.div>

          {/* Optimized Projects Display */}
                  <motion.div 
            className={`${
              viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
            }`}
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredAndSortedProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  index={index}
                  viewMode={viewMode}
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredAndSortedProjects.length === 0 && (
                <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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
                Ready to Build Something Amazing?
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm always excited to take on new challenges and create innovative solutions. 
                Let's collaborate and bring your ideas to life!
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 liquid-glass text-primary-foreground rounded-lg font-semibold transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
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

export default memo(Projects);