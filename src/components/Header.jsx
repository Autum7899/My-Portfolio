// src/components/Header.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const navLinks = ["About", "Education", "Skills", "Projects", "Contact"];

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 25, staggerChildren: 0.07 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const linkVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="text-xl font-bold text-foreground hover:text-primary transition-colors">Minh Sơn</a>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">{link}</a>
            ))}
          </nav>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-foreground" aria-label="Open menu"><Menu /></button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" />
            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-background shadow-2xl z-50 md:hidden">
              <div className="flex flex-col h-full p-8 justify-center">
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close menu"><X size={28} /></button>
                <nav className="flex flex-col space-y-8">
                  {navLinks.map((link) => (
                    <motion.a key={link} variants={linkVariants} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-foreground hover:text-primary transition-colors">{link}</motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;