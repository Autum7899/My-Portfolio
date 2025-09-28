// src/components/Education.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { education } from '/src/data/portfolioData.jsx';

const Education = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
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
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };


    return (
        <AnimatedSection id="education">
            <div className="container mx-auto px-6 py-20">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="relative"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-20">
                        <motion.div
                            className="inline-flex items-center gap-3 liquid-glass-card liquid-glass-hover text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GraduationCap size={16} />
                            Academic Journey
                        </motion.div>
                        
                        <motion.h2 
                            className="text-5xl md:text-7xl font-bold mb-6 text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Education
                        </motion.h2>
                        
                        <motion.p 
                            className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Building a strong foundation in computer science and information systems, 
                            preparing for a successful career in technology.
                        </motion.p>
                    </motion.div>

                    {/* Main Education Content */}
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative"
                                    onHoverStart={() => setHoveredItem(index)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                >
                                    {/* Education Card */}
                                    <motion.div 
                                        className="relative p-8 rounded-3xl liquid-glass-card liquid-glass-hover liquid-gradient-primary transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10"
                                        whileHover={{ 
                                            scale: 1.02, 
                                            y: -8
                                        }}
                                    >
                                        {/* Status Badge */}
                                        <motion.div
                                            className="absolute -top-3 -right-3 liquid-glass text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            {index === 0 ? 'Current' : 'Completed'}
                                        </motion.div>

                                        {/* Header */}
                                        <div className="mb-6">
                                            <motion.div 
                                                className="flex items-center gap-3 text-primary font-semibold mb-3"
                                                whileHover={{ x: 5 }}
                                            >
                                                <Calendar size={20} />
                                                <span>{edu.date}</span>
                                            </motion.div>
                                            
                                            <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                                                {edu.degree}
                                            </h3>
                                        </div>

                                        {/* Institution & Major */}
                                        <div className="space-y-4 mb-6">
                                            <motion.div 
                                                className="flex items-center gap-3"
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="w-10 h-10 liquid-glass-card rounded-xl flex items-center justify-center">
                                                    <MapPin size={18} className="text-primary" />
                                                </div>
                                                <p className="text-lg text-foreground font-medium">{edu.institution}</p>
                                            </motion.div>

                                            <motion.div 
                                                className="flex items-center gap-3"
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="w-10 h-10 liquid-glass-card rounded-xl flex items-center justify-center">
                                                    <BookOpen size={18} className="text-primary" />
                                                </div>
                                                <span className="text-muted-foreground font-medium">Major: {edu.major}</span>
                                            </motion.div>
                                        </div>

                                        {/* Description */}
                                        <motion.p 
                                            className="text-muted-foreground leading-relaxed text-lg"
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1 }}
                                        >
                                            {edu.description}
                                        </motion.p>

                                        {/* Hover Glow Effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                                                filter: "blur(20px)"
                                            }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                opacity: [0, 0.3, 0]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatedSection>
    );
};
export default Education;