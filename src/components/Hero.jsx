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

    // Add CSS animation for gradient
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto relative z-10"
            >

                {/* Name with Cool Gradient */}
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center relative z-10 leading-tight mb-10"
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
                        backgroundSize: "300% 300%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "gradientShift 4s ease-in-out infinite"
                    }}
                >
                    Hi, I'm Minh Sơn
                </motion.h1>

                {/* Title */}
                <motion.p 
                    variants={itemVariants}
                    className="text-xl sm:text-2xl md:text-3xl text-primary mb-8 font-medium max-w-3xl mx-auto"
                >
                    Information Systems Student & Aspiring Full-Stack Developer
                </motion.p>


                {/* Location */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center items-center space-x-4 mb-10"
                >
                    <div className="flex items-center text-muted-foreground text-lg">
                        <MapPin size={20} className="mr-2"/>
                        {user.location}
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    variants={itemVariants}
                    className="flex justify-center space-x-6 sm:space-x-8 mb-12"
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
                            className="text-muted-foreground hover:text-primary transition-colors duration-300 p-3 rounded-xl hover:bg-primary/10"
                        >
                            <Icon size={28} className="sm:w-8 sm:h-8" />
                        </a>
                    ))}
                </motion.div>

                {/* Enhanced Download CV Button */}
                <motion.a
                    variants={itemVariants}
                    href="/LuongMinhSon-CV.pdf"
                    download="LuongMinhSon-CV.pdf"
                    className="group relative inline-flex items-center gap-3 sm:gap-4 liquid-glass text-black dark:text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-xl liquid-glass-hover transition-all duration-300 shadow-xl border-2 border-primary/70 dark:border-primary/50 text-base sm:text-lg overflow-hidden"
                    whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Animated Background Gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/60 via-purple-500/70 to-primary/60 dark:from-primary/40 dark:via-purple-500/50 dark:to-primary/40 rounded-xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    
                    {/* Download Icon with Animation */}
                    <motion.div 
                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center relative z-10"
                        whileHover={{ 
                            rotate: 360,
                            scale: 1.1
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
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
                    </motion.div>
                    
                    {/* Button Text with Glow */}
                    <motion.span 
                        className="relative z-10"
                        whileHover={{
                            textShadow: "0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(147, 51, 234, 0.4)"
                        }}
                    >
                        Download CV
                    </motion.span>
                    
                    {/* Arrow Icon with Slide Animation */}
                    <motion.div 
                        className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center relative z-10"
                        whileHover={{ 
                            x: 3,
                            scale: 1.1
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
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
                    </motion.div>
                    
                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-white/20 -skew-x-12 opacity-0 group-hover:opacity-100"
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.a>
            </motion.div>
        </section>
    );
};
export default Hero;