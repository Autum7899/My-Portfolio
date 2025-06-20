// src/components/LoadingScreen.js
import React from 'react';
import { motion } from 'framer-motion';

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
    y: '50%',
  },
  end: {
    y: '150%',
  },
};

const circleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <motion.div
        className="flex justify-around w-20 h-10"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-4 h-4 bg-indigo-500 rounded-full"
          variants={circleVariants}
          transition={circleTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-indigo-500 rounded-full"
          variants={circleVariants}
          transition={circleTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-indigo-500 rounded-full"
          variants={circleVariants}
          transition={circleTransition}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
