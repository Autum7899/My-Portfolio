// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useTheme } from './components/useTheme';

function App() {
    const { theme } = useTheme();

    return (
        <div className={`${theme} bg-background text-foreground`}>
            <Header />
            <main>
                <Hero />
                <About />
                <Education />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
            <ThemeToggleButton />
        </div>
    );
}

export default App;