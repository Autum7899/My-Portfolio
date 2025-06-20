// src/components/Footer.js
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { user } from "/src/data/portfolioData.jsx";

const Footer = () => {
  return (
    <footer className="bg-slate-800/50 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-gray-400">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href={user.socials.github}
            aria-label="GitHub Profile"
            className="text-gray-400 hover:text-indigo-400 transition-transform duration-300 hover:scale-110"
          >
            <Github />
          </a>
          <a
            href={user.socials.linkedin}
            aria-label="LinkedIn Profile"
            className="text-gray-400 hover:text-indigo-400 transition-transform duration-300 hover:scale-110"
          >
            <Linkedin />
          </a>
          <a
            href={user.socials.twitter}
            aria-label="Twitter Profile"
            className="text-gray-400 hover:text-indigo-400 transition-transform duration-300 hover:scale-110"
          >
            <Twitter />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} {user.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
