// src/components/LoadingScreen.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, Code, Cpu, Database } from 'lucide-react';

const LoadingScreen = ({ setIsLoading, pokemonLoadingState }) => {
  const [progress, setProgress] = useState(0);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);
  const [loadingStartTime] = useState(Date.now());

  useEffect(() => {
    if (pokemonLoadingState) {
      setProgress(pokemonLoadingState.progress);
      setIsPokemonLoading(pokemonLoadingState.isLoading);
      
      // Only hide loading screen when Pokemon are fully loaded (100%)
      if (!pokemonLoadingState.isLoading && pokemonLoadingState.progress >= 100) {
        // Add a small delay for smooth transition
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [pokemonLoadingState, setIsLoading]);

  // Fallback timeout for loading screen
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      const elapsedTime = Date.now() - loadingStartTime;
      if (elapsedTime > 10000) { // 10 seconds fallback
        console.warn('Loading screen fallback triggered');
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [setIsLoading, loadingStartTime]);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-sm mx-auto px-6">
        {/* Simple Pikachu Animation */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.div
            className="relative w-24 h-24 mx-auto"
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src="/pikachu-running.gif"
              alt="Pikachu Loading"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Simple Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Loading Portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            Loading Pokemon background...
          </p>
        </motion.div>

        {/* Simple Progress Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-xs text-muted-foreground mb-2 text-center">
            {Math.round(progress)}%
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Simple Loading Dots */}
        <motion.div
          className="flex justify-center space-x-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Simple Skip Button */}
        <motion.button
          onClick={() => setIsLoading(false)}
          className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Skip Loading
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;