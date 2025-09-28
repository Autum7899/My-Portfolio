// src/components/Footer.js
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Mail, Heart, ArrowUp, Code, Coffee } from "lucide-react";
import { user } from "/src/data/portfolioData.jsx";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: user.socials.github, label: "GitHub Profile", color: "hover:text-gray-400" },
    { icon: Linkedin, href: user.socials.linkedin, label: "LinkedIn Profile", color: "hover:text-blue-600" },
    { icon: Facebook, href: user.socials.facebook, label: "Facebook Profile", color: "hover:text-blue-500" },
    { icon: Mail, href: `mailto:${user.email}`, label: "Email", color: "hover:text-red-500" }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-t from-muted/80 to-background mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-purple-500/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-blue-500/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 border border-green-500/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-foreground mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {user.name}
            </motion.h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A passionate Computer Science student specializing in Information Systems, 
              building the future one line of code at a time.
            </p>
            <motion.div 
              className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground"
              whileHover={{ x: 5 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
              <span>and lots of</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coffee size={16} className="text-amber-600" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${user.email}`}
                className="block text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                {user.email}
              </motion.a>
              <motion.p 
                className="text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                {user.location}
              </motion.p>
              <motion.p 
                className="text-muted-foreground text-sm"
                whileHover={{ x: 5 }}
              >
                Available for internships
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              aria-label={social.label}
              className={`text-muted-foreground ${social.color} transition-all duration-300 p-3 rounded-full hover:bg-muted/50`}
              whileHover={{ 
                scale: 1.2, 
                y: -5,
                rotate: 360
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            &copy; {new Date().getFullYear()} {user.name}. All Rights Reserved.
          </motion.p>

          <motion.div 
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Code size={16} />
            <span>Built with React & Framer Motion</span>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors p-2 rounded-lg hover:bg-primary/10"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ArrowUp size={16} />
            <span className="text-sm">Back to Top</span>
          </motion.button>
        </div>
      </div>

      {/* Simplified Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-1 h-1 bg-primary/20 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-purple-500/20 rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </footer>
  );
};
export default Footer;