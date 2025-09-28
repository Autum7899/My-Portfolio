// src/components/LoadingScreen.js
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, Database } from 'lucide-react';

const LoadingScreen = ({ setIsLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
        <motion.div
          className="fixed inset-0 bg-background z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            {/* Animated Logo/Icon */}
            <motion.div
              className="relative mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Code size={32} className="text-white" />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Minh Sơn
            </motion.h2>

            {/* Loading Animation */}
            <div className="flex justify-center space-x-2 mb-8">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              ))}
            </div>

            {/* Floating Tech Icons */}
            <div className="relative">
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Cpu size={16} className="text-blue-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
                animate={{
                  rotate: -360,
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Database size={12} className="text-green-500" />
              </motion.div>
            </div>
          </div>
        </motion.div>
  );
};

export default LoadingScreen;