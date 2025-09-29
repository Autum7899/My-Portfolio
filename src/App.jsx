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
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonLoadingState, setPokemonLoadingState] = useState({
    isLoading: true,
    progress: 0
  });

  // Pokemon background toggle state
  const [showPokemonBackground, setShowPokemonBackground] = useState(true);

  // Handle Pokemon loading progress updates
  const handlePokemonLoadingProgress = (loadingState) => {
    setPokemonLoadingState(loadingState);
  };

  // Toggle Pokemon background
  const togglePokemonBackground = () => {
    setShowPokemonBackground(prev => !prev);
  };

  // Fallback timeout to prevent infinite loading
  React.useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.warn('Loading screen timeout - forcing app to load');
        setIsLoading(false);
      }
    }, 10000); // 10 second fallback

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  return (
    <div className="relative isolate">
      <AnimatePresence>
        {/* We render the LoadingScreen and pass it the function to change our state.
          When the LoadingScreen is done, it will call setIsLoading(false),
          which will trigger AnimatePresence to remove it.
        */}
        {isLoading && <LoadingScreen setIsLoading={setIsLoading} pokemonLoadingState={pokemonLoadingState} />}
      </AnimatePresence>
      
      {/* Always render PokemonBackground so it can update loading state */}
      <PokemonBackground 
        onLoadingProgress={handlePokemonLoadingProgress} 
        showPokemon={showPokemonBackground}
      />
      
      {!isLoading && (
        <>
          <Header 
            onTogglePokemonBackground={togglePokemonBackground} 
            showPokemonBackground={showPokemonBackground} 
          />
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