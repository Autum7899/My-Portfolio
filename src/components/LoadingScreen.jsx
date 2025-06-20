// src/components/LoadingScreen.js
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const circleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <img
        src="/pikachu-running.gif"
        alt="Loading..."
        className="w-64 h-auto"
      />
    </div>
  );
};

export default LoadingScreen;
