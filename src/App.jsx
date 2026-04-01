import React, { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Contact from './sections/Contact';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />
      <SmoothScroll>
        <div className={`min-h-screen bg-[#0a0a0b] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-opacity duration-700 ${!isLoaded ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
          <Navbar />
          
          <main>
            <Hero isLoaded={isLoaded} />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
    </>
  );
}

export default App;
