// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Code, Cpu, Database } from 'lucide-react';
import { user } from '/src/data/portfolioData.jsx';

const Hero = () => {
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
        hidden: { opacity: 0, y: 20 },
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
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Simplified Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-2 h-2 bg-primary/10 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-3 h-3 bg-blue-500/10 rounded-full"
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-6 relative z-10"
            >

                {/* Enhanced Name with Liquid Glass Background */}
                <motion.div 
                    className="relative mb-8"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1 
                        className="text-4xl md:text-6xl font-extrabold text-center text-foreground relative z-10 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.span
                            className="inline-block"
                            whileHover={{ 
                                backgroundImage: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Hi, I'm Minh Sơn
                        </motion.span>
                    </motion.h1>
                    
                    {/* Liquid Glass background for title */}
                    <motion.div 
                        className="absolute inset-0 -m-4 liquid-glass rounded-2xl"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Enhanced Title */}
                <motion.p 
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-primary mb-6 font-medium"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        Information Systems Student & Aspiring Full-Stack Developer
                    </motion.span>
                </motion.p>

                {/* Enhanced Bio */}
                <motion.p 
                    variants={itemVariants}
                    className="max-w-4xl mx-auto text-lg text-muted-foreground mb-8 leading-relaxed"
                >
                    A passionate third-year Computer Science student specializing in Information Systems. 
                    I love building robust applications and solving complex problems with clean, efficient code. 
                    Currently exploring the exciting world of full-stack development and always eager to learn new technologies.
                </motion.p>

                {/* Location with Animation */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center items-center space-x-4 mb-8"
                >
                    <motion.div 
                        className="flex items-center text-muted-foreground"
                        whileHover={{ scale: 1.1, color: "#3b82f6" }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <MapPin size={18} className="mr-2"/>
                        </motion.div>
                        {user.location}
                    </motion.div>
                </motion.div>

                {/* Simplified Social Links */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center space-x-6 mb-10"
                >
                    {[
                        { icon: Github, href: user.socials.github, label: "GitHub Profile" },
                        { icon: Linkedin, href: user.socials.linkedin, label: "LinkedIn Profile" },
                        { icon: Mail, href: `mailto:${user.email}`, label: "Email" }
                    ].map(({ icon: Icon, href, label }, index) => (
                        <motion.a
                            key={index}
                            href={href}
                            aria-label={label}
                            className="text-muted-foreground hover:text-primary transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                        >
                            <Icon size={28} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Liquid Glass CTA Button */}
                <motion.a
                    href={`mailto:${user.email}`}
                    className="inline-block liquid-glass text-primary-foreground font-semibold px-8 py-3 rounded-lg liquid-glass-hover transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    Let's Build Something Amazing Together
                </motion.a>
            </motion.div>
        </section>
    );
};
export default Hero;