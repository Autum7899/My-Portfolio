// src/components/Header.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Grid3X3,
  Zap,
  User,
  Briefcase,
  Code,
  FolderOpen,
  Mail,
} from "lucide-react";

// Simple navigation link component without animations
const NavLink = React.memo(({ link, isActive }) => {
  const Icon = link.icon;

  return (
    <a
      href={`#${link.href}`}
      className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 overflow-hidden ${
        isActive
          ? "text-primary bg-primary/10 border border-primary/30"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      }`}
    >
      <Icon
        size={16}
        className={`relative z-10 transition-colors duration-300 ${
          isActive ? "text-primary" : "group-hover:text-primary"
        }`}
      />
      <span
        className={`relative z-10 font-medium ${
          isActive ? "text-primary" : ""
        }`}
      >
        {link.name}
      </span>
    </a>
  );
});

NavLink.displayName = "NavLink";

// Simple mobile navigation link component without animations
const MobileNavLink = React.memo(({ link, isActive, onClose }) => {
  const Icon = link.icon;

  return (
    <a
      href={`#${link.href}`}
      onClick={onClose}
      className={`group relative flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
        isActive
          ? "text-primary bg-primary/15 shadow-md border border-primary/20"
          : "text-foreground hover:text-primary hover:bg-muted/60 hover:shadow-sm border border-transparent hover:border-primary/10"
      }`}
    >
      <Icon
        size={20}
        className={`relative z-10 transition-colors duration-300 ${
          isActive ? "text-primary" : "group-hover:text-primary"
        }`}
      />
      <span
        className={`relative z-10 text-lg font-medium ${
          isActive ? "text-primary" : ""
        }`}
      >
        {link.name}
      </span>
    </a>
  );
});

MobileNavLink.displayName = "MobileNavLink";

const Header = ({ onTogglePokemonBackground, showPokemonBackground }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 10);

    // Only check active section if scrolled significantly
    if (scrollY > 50) {
      const sections = [
        "hero",
        "about",
        "career",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    } else {
      setActiveSection("hero");
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMenuOpen, handleScroll]);

  const navLinks = useMemo(
    () => [
      { name: "About", href: "about", icon: User },
      { name: "Career", href: "career", icon: Briefcase },
      { name: "Skills", href: "skills", icon: Code },
      { name: "Projects", href: "projects", icon: FolderOpen },
      { name: "Contact", href: "contact", icon: Mail },
    ],
    [],
  );

  const menuVariants = useMemo(
    () => ({
      hidden: { x: "100%", opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 25,
        },
      },
      exit: {
        x: "100%",
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    }),
    [],
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 shadow-md border-b border-primary/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#hero" className="relative group">
              <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Minh Sơn
              </div>
            </a>

            <div className="flex items-center space-x-6">
              {/* Pokemon Background Toggle Button */}
              <button
                onClick={onTogglePokemonBackground}
                className="group relative flex items-center justify-center p-3 rounded-xl bg-card/30 dark:bg-card/10 hover:bg-card/50 transition-all duration-300"
                title={
                  showPokemonBackground
                    ? "Switch to Grid Background"
                    : "Switch to Pokemon Background"
                }
              >
                <div className="relative z-10 flex items-center justify-center">
                  {showPokemonBackground ? (
                    <Zap
                      size={20}
                      className="text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Grid3X3
                      size={20}
                      className="text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    link={link}
                    isActive={activeSection === link.href}
                  />
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-3 rounded-xl bg-card/30 dark:bg-card/10 hover:bg-card/50 transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 bg-white/40 z-40 lg:hidden"
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-white/98 dark:bg-gray-900/98 shadow-2xl z-50 lg:hidden border-l border-gray-200/60 dark:border-gray-700/60"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-2xl font-bold text-foreground">Menu</div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 rounded-xl bg-card/30 dark:bg-card/10 hover:bg-card/50 transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                {/* Mobile Pokemon Background Toggle */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      onTogglePokemonBackground();
                      setIsMenuOpen(false);
                    }}
                    className="group relative flex items-center space-x-3 px-5 py-4 rounded-xl bg-card/30 dark:bg-card/10 hover:bg-card/50 transition-all duration-300 text-lg font-medium w-full overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center space-x-3">
                      {showPokemonBackground ? (
                        <>
                          <Zap
                            size={20}
                            className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300"
                          />
                          <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            Switch to Grid
                          </span>
                        </>
                      ) : (
                        <>
                          <Grid3X3
                            size={20}
                            className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300"
                          />
                          <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                            Switch to Pokemon
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <MobileNavLink
                      key={link.name}
                      link={link}
                      isActive={activeSection === link.href}
                      onClose={() => setIsMenuOpen(false)}
                    />
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
