// src/components/Footer.js
import React from "react";
import { Github, Linkedin, Facebook } from "lucide-react";
import { user } from "/src/data/portfolioData.jsx";

const Footer = () => {
  return (
    <footer className="bg-muted/50 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-6">
          <a href={user.socials.github} aria-label="GitHub Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Github /></a>
          <a href={user.socials.linkedin} aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Linkedin /></a>
          <a href={user.socials.facebook} aria-label="Facebook Profile" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"><Facebook /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} {user.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;