// src/components/Header.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll detection and lock body scroll when the menu is open
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Prevent scrolling when the mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to remove event listener and restore scroll
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = ["About", "Education", "Skills", "Projects", "Contact"];

  // Animation variants for the menu panel sliding in from the right
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
        staggerChildren: 0.07, // Stagger the animation of child elements (links)
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Animation variants for each navigation link
  const linkVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    // Use a React Fragment to return multiple root elements
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          // Lowered z-index for header
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#hero"
            className="text-xl font-bold text-white hover:text-indigo-400 transition-colors"
          >
             Minh Sơn
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu is now a sibling to the header, not a child */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-slate-900 shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-8 justify-center">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-8">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link}
                      variants={linkVariants}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-medium text-gray-200 hover:text-indigo-400 transition-colors"
                    >
                      {link}
                    </motion.a>
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
