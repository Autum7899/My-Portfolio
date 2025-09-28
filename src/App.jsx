import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggleButton from './components/ThemeToggleButton';
import PokemonBackground from './components/PokemonBackground';
import WalkingCharacter from './components/WalkingCharacter/WalkingCharacter';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // We only need one state: is the loading screen visible?
  const [isLoading, setIsLoading] = useState(true);

  // All the useEffect logic for loading has been moved into LoadingScreen.js

  return (
    <div className="relative isolate">
      <AnimatePresence>
        {/* We render the LoadingScreen and pass it the function to change our state.
          When the LoadingScreen is done, it will call setIsLoading(false),
          which will trigger AnimatePresence to remove it.
        */}
        {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <PokemonBackground />
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
          <WalkingCharacter />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

export default App;