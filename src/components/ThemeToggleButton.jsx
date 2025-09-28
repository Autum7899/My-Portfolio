// src/components/ThemeToggleButton.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/useTheme';

const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="fixed bottom-5 right-5 z-50 p-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-gray-900 rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    );
};

export default ThemeToggleButton;