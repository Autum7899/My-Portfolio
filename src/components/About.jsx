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
              className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10"
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
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Profile Image Section */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative group">
                {/* Liquid Glass Border */}
                <div className="absolute -inset-1 liquid-glass rounded-2xl p-1">
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


        </motion.div>
      </div>
    </AnimatedSection>
  );
};
export default About;