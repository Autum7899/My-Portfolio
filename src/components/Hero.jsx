// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, MapPin } from 'lucide-react';
import { user } from '/src/data/portfolioData.jsx';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto px-6"
            >
                <img src={user.profileImage} alt={user.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-primary shadow-2xl" />
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
                    Hi, I'm {user.name}
                </h1>
                <p className="text-xl md:text-2xl text-primary mb-6 font-medium">
                    {user.title}
                </p>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                    {user.bio}
                </p>
                <div className="flex justify-center items-center space-x-4 mb-8">
                    <div className="flex items-center text-muted-foreground">
                        <MapPin size={18} className="mr-2"/> {user.location}
                    </div>
                </div>
                <div className="flex justify-center space-x-6 mb-10">
                    <a href={user.socials.github} aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Github size={28}/></a>
                    <a href={user.socials.linkedin} aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Linkedin size={28}/></a>
                    <a href={user.socials.facebook} aria-label="Facebook Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Facebook size={28}/></a>
                </div>
                <a href={`mailto:${user.email}`} className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg transform hover:scale-105">
                    Get In Touch
                </a>
            </motion.div>
        </section>
    );
};
export default Hero;