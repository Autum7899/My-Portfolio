// src/components/About.js
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Cpu, Database, Lightbulb, Target, Users, Award, BookOpen, Zap, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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
          {/* Enhanced Title with Liquid Glass */}
          <motion.div 
            className="relative mb-16"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center text-foreground relative z-10"
            >
              About Me
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

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Profile Image Section */}
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center"
            >
              <div className="relative group w-full max-w-lg">
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.03, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Liquid Glass Border */}
                <div className="absolute -inset-2 liquid-glass rounded-3xl p-2">
                  <div className="bg-background rounded-2xl h-full w-full" />
                </div>
                
                {/* Main Image Container */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ 
                    scale: 1.03
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://placehold.co/500x500/667eea/ffffff?text=MS&font=montserrat"
                      alt="Minh Sơn - Full Stack Developer"
                      className="w-full h-auto object-cover shadow-2xl"
                    />
                    
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 liquid-glass text-black dark:text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  Available for Work
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
              <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.p 
                  className="text-xl sm:text-2xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Hello! I'm <span className="text-primary font-semibold">Sơn</span>, a passionate third-year Computer Science student specializing in Information Systems. I have a solid foundation in software development, database design, and system analysis.
                </motion.p>
                
                <motion.p 
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
              I'm driven by turning complex requirements into elegant software solutions. I have hands-on experience with modern technologies and am always eager to learn through personal projects and coursework.
                </motion.p>
                
                <motion.p 
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
              I'm actively seeking internship opportunities to contribute my skills, learn from experienced professionals, and tackle real-world challenges.
                </motion.p>
              </motion.div>

              {/* Key Achievements */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">Key Highlights</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <CheckCircle size={22} className="text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-muted-foreground text-lg">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </AnimatedSection>
  );
};
export default About;