import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'lucide-react';
import profileImg from '../assets/portfolio.png';

export default function Hero({ isLoaded }) {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!isLoaded) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4")
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
        .from(".hero-image", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-glow", { scale: 0.8, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=1.2");
    }, containerRef);
    
    return () => ctx.revert();
  }, [isLoaded]); // Added isLoaded as a dependency

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-10 md:pt-16 lg:pt-20 overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-3/5">
            <div className="hero-badge inline-flex border border-blue-500/30 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Available for Freelance Work
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              <div className="hero-title overflow-hidden">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"> Muhammad Hassan</span>.
              </div>
              <div className="hero-title overflow-hidden mt-1 text-5xl md:text-6xl lg:text-7xl">
                Full-Stack Developer &
              </div>
              <div className="hero-title overflow-hidden text-slate-400 text-4xl md:text-5xl lg:text-6xl mt-2">
                Automation Specialist.
              </div>
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              I craft incredibly fast, high-performance web applications and automate complex workflows using Playwright to save time and scale effectively.
            </p>
            
            <div className="hero-buttons flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center border border-blue-500/50">
                View Projects <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all hover:scale-105 border border-zinc-800 flex items-center text-slate-300">
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="hero-image w-full lg:w-2/5 flex justify-center -mt-12 lg:-mt-32">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1.5 bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-full bg-zinc-900 border-4 border-zinc-950 overflow-hidden relative">
                <img 
                  src={profileImg} 
                  alt="Hassan Jameel" 
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Optional Floating Element */}
              <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                <span className="text-sm font-medium text-white">Open to Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
