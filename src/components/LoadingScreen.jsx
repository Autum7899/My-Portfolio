import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ setIsLoading }) => {
  // State to manage the loading progress percentage
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // This effect simulates the loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Increment progress by a small random amount
        const newProgress = prev + Math.random() * 10;
        // Cap the simulated progress at 90% until the page is truly loaded
        return newProgress > 90 ? 100 : newProgress;
      });
    }, 400); // Update every 400ms

    // When the component unmounts or loading is done, clear the interval
    return () => clearInterval(interval);
  }, []);

  // This effect listens for the signal from App.jsx to finish loading
  useEffect(() => {
    // This function will be called by App.jsx when the window has finished loading
    const handleLoad = () => {
      // 1. Instantly move the progress bar to 100%
      setProgress(100);

      // 2. Wait a moment for the user to see 100%, then start the screen fade-out
      setTimeout(() => {
        setIsLoading(false); // This tells App.jsx to unmount the loader
      }, 500); // Wait 0.5s after hitting 100%
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [setIsLoading]);

  return (
    // The outer container handles the fade-out of the whole screen
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {/* Pikachu GIF */}
      <img
        src="/pikachu-running.gif"
        alt="Loading..."
        className="w-64 h-auto"
      />

      {/* Progress Bar Container */}
      <div className="w-64 h-4 mt-4 bg-gray-700 rounded-full overflow-hidden">
        {/* The filling part of the progress bar */}
        <motion.div
          className="h-full bg-blue-400"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }} // Animate the width based on progress
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>

      {/* Percentage Text */}
      <p className="mt-3 text-lg text-white font-semibold">
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
