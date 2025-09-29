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
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto relative z-10"
            >

                {/* Name */}
                <motion.h1 
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-black dark:text-white relative z-10 leading-tight mb-8"
                >
                    Hi, I'm Minh Sơn
                </motion.h1>

                {/* Title */}
                <motion.p 
                    variants={itemVariants}
                    className="text-lg sm:text-xl md:text-2xl text-primary mb-6 font-medium max-w-2xl mx-auto"
                >
                    Information Systems Student & Aspiring Full-Stack Developer
                </motion.p>


                {/* Location */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center items-center space-x-4 mb-8"
                >
                    <div className="flex items-center text-muted-foreground">
                        <MapPin size={18} className="mr-2"/>
                        {user.location}
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center space-x-4 sm:space-x-6 mb-10"
                >
                    {[
                        { icon: Github, href: user.socials.github, label: "GitHub Profile" },
                        { icon: Linkedin, href: user.socials.linkedin, label: "LinkedIn Profile" },
                        { icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}`, label: "Email" }
                    ].map(({ icon: Icon, href, label }, index) => (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-primary/10"
                        >
                            <Icon size={24} className="sm:w-7 sm:h-7" />
                        </a>
                    ))}
                </motion.div>

                {/* Download CV Button */}
                <motion.a
                    variants={itemVariants}
                    href="/LuongMinhSon-CV.pdf"
                    download="LuongMinhSon-CV.pdf"
                    className="inline-flex items-center gap-2 sm:gap-3 liquid-glass text-black dark:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl liquid-glass-hover transition-all duration-300 shadow-xl border-2 border-primary/30 text-sm sm:text-base"
                >
                    {/* Download Icon */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                        <svg 
                            className="w-4 h-4 sm:w-5 sm:h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                            />
                        </svg>
                    </div>
                    
                    {/* Button Text */}
                    <span>Download CV</span>
                    
                    {/* Arrow Icon */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                        <svg 
                            className="w-3 h-3 sm:w-4 sm:h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" 
                            />
                        </svg>
                    </div>
                </motion.a>
            </motion.div>
        </section>
    );
};
export default Hero;