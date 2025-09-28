// src/components/Education.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, MapPin, Star, ChevronRight } from 'lucide-react';
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
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            x: 30
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const achievements = [
        "Dean's List Recognition",
        "Academic Excellence Award",
        "Outstanding Project Presentation",
        "Leadership in Student Organizations"
    ];

    const skills = [
        "Software Engineering",
        "Database Management",
        "System Analysis",
        "Project Management",
        "Team Collaboration",
        "Problem Solving"
    ];

    return (
        <AnimatedSection id="education">
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
                            Education
                        </motion.h2>
                        
                        <motion.p 
                            className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            My academic journey has been focused on building a strong foundation in computer science 
                            and information systems, preparing me for a successful career in technology.
                        </motion.p>

                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        />
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Education Timeline */}
                        <motion.div 
                            variants={itemVariants}
                            className="lg:col-span-2"
                        >
                            <div className="relative max-w-4xl mx-auto pl-12">
                                {/* Timeline Line */}
                                <motion.div 
                                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 rounded-full"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                />
                                
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="relative mb-16 group"
                                        onHoverStart={() => setHoveredItem(index)}
                                        onHoverEnd={() => setHoveredItem(null)}
                                    >
                                        {/* Timeline Dot */}
                                        <motion.div 
                                            className="absolute -left-6 top-4 w-12 h-12 bg-card rounded-full border-4 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <GraduationCap className="text-primary" size={20}/>
                                        </motion.div>

                                        {/* Education Card */}
                                        <motion.div 
                                            className="p-8 rounded-2xl shadow-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group-hover:shadow-2xl"
                                            whileHover={{ 
                                                scale: 1.02, 
                                                y: -5
                                            }}
                                        >
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <motion.p 
                                                        className="text-primary font-semibold mb-2 flex items-center gap-2"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <Calendar size={16} />
                                                        {edu.date}
                                                    </motion.p>
                                                    <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                                                        {edu.degree}
                                                    </h3>
                                                </div>
                                                
                                                <motion.div
                                                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + index * 0.1 }}
                                                >
                                                    {index === 0 ? 'Current' : 'Completed'}
                                                </motion.div>
                                            </div>

                                            {/* Institution */}
                                            <motion.div 
                                                className="flex items-center gap-2 mb-3"
                                                whileHover={{ x: 5 }}
                                            >
                                                <MapPin size={16} className="text-muted-foreground" />
                                                <p className="text-lg text-card-foreground font-medium">{edu.institution}</p>
                                            </motion.div>

                                            {/* Major */}
                                            <motion.p 
                                                className="text-muted-foreground mb-4 flex items-center gap-2"
                                                whileHover={{ x: 5 }}
                                            >
                                                <BookOpen size={16} />
                                                <span className="font-medium">Major: {edu.major}</span>
                                            </motion.p>

                                            {/* Description */}
                                            <motion.p 
                                                className="text-sm text-card-foreground leading-relaxed"
                                                initial={{ opacity: 0.8 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                {edu.description}
                                            </motion.p>

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
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div 
                            variants={itemVariants}
                            className="space-y-8"
                        >
                            {/* Achievements */}
                            <motion.div
                                className="bg-card rounded-2xl p-6 shadow-xl border border-border"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.h3 
                                    className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <Award className="text-primary" size={20} />
                                    Achievements
                                </motion.h3>
                                
                                <div className="space-y-3">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <Star size={16} className="text-yellow-500 flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{achievement}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Key Skills */}
                            <motion.div
                                className="bg-card rounded-2xl p-6 shadow-xl border border-border"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.h3 
                                    className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <BookOpen className="text-primary" size={20} />
                                    Key Skills
                                </motion.h3>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-primary/10 text-primary text-xs font-semibold px-3 py-2 rounded-lg text-center"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.6 + index * 0.05 }}
                                            whileHover={{ 
                                                scale: 1.05,
                                                backgroundColor: "rgba(59, 130, 246, 0.2)" 
                                            }}
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Call to Action */}
                            <motion.div
                                className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 border border-primary/20"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h4 className="text-lg font-bold text-foreground mb-3">
                                    Ready to Learn More?
                                </h4>
                                <p className="text-muted-foreground text-sm mb-4">
                                    I'm always eager to expand my knowledge and take on new challenges.
                                </p>
                                <motion.a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    Let's Connect
                                    <ChevronRight size={16} />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatedSection>
    );
};
export default Education;