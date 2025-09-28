// src/components/About.js
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Cpu, Database, Lightbulb, Target, Users, Award, BookOpen, Zap, Heart, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const stats = [
    { number: "3+", label: "Years Learning", icon: BookOpen, color: "text-blue-500" },
    { number: "15+", label: "Projects Built", icon: Code, color: "text-green-500" },
    { number: "20+", label: "Technologies", icon: Cpu, color: "text-purple-500" },
    { number: "∞", label: "Passion", icon: Heart, color: "text-red-500" }
  ];

  const interests = [
    { 
      title: "Full-Stack Development", 
      description: "Building complete web applications from frontend to backend with modern technologies", 
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Database Design", 
      description: "Creating efficient and scalable data structures for optimal performance", 
      icon: Database,
      color: "from-green-500 to-emerald-500"
    },
    { 
      title: "System Analysis", 
      description: "Understanding complex requirements and designing elegant solutions", 
      icon: Target,
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Continuous Learning", 
      description: "Always exploring new technologies and staying updated with industry trends", 
      icon: BookOpen,
      color: "from-orange-500 to-red-500"
    }
  ];

  const achievements = [
    "Third-year Computer Science student",
    "Specialized in Information Systems",
    "Active in personal projects and coursework",
    "Seeking internship opportunities"
  ];

  return (
    <AnimatedSection id="about">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Main Title with Enhanced Animation */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Profile Image Section */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative group">
                {/* Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-1">
                  <div className="bg-background rounded-xl h-full w-full" />
                </div>
                
                {/* Main Image */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
              <img
                src="https://placehold.co/600x600/1a202c/a3bffa?text=Profile+Pic"
                alt="About Minh Sơn"
                    className="rounded-xl shadow-2xl w-full relative"
                  />
                </motion.div>

            </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <motion.p 
                  className="text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Hello! I'm <span className="text-primary font-semibold">Sơn</span>, a passionate third-year Computer Science student with a deep
                  love for technology and a specialization in Information
              Systems. My academic journey has equipped me with a solid
              foundation in software development, database design, and system
              analysis.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
              I am driven by the challenge of turning complex requirements into
              simple, elegant, and efficient software solutions. I have hands-on
              experience with a variety of modern technologies and I am always
              eager to learn more and expand my skill set through personal
              projects and coursework.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
              I am actively seeking internship opportunities where I can
              contribute my skills, learn from experienced professionals, and
                  tackle real-world challenges that will help me grow as a developer.
                </motion.p>
              </motion.div>

              {/* Key Achievements */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">Key Highlights</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <motion.div
                  className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  animate={{
                    boxShadow: hoveredCard === index 
                      ? "0 20px 40px rgba(59, 130, 246, 0.2)" 
                      : "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon size={24} className={stat.color} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-foreground mb-2"
                    animate={{
                      color: hoveredCard === index ? "#3b82f6" : undefined
                    }}
                  >
                    {stat.number}
                  </motion.h3>
                  
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  
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
              </motion.div>
            ))}
          </motion.div>

          {/* Interests Section */}
          <motion.div
            variants={containerVariants}
            className="space-y-12"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-center text-foreground mb-12"
            >
              What Drives Me
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    rotateY: 5
                  }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div
                    className="flex items-start space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${interest.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 10
                      }}
                    >
                      <interest.icon size={20} className="text-white" />
                    </motion.div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {interest.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {interest.description}
                      </p>
                    </div>
                  </motion.div>
                  
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
                </motion.div>
              ))}
        </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};
export default About;