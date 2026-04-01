import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textContainerRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const glowRef = useRef(null);

  // Split text for letter animation
  const name = "Muhammad Hassan";
  const letters = name.split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Animate percentage 0-100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "expo.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(counter.val) + "%";
          }
        }
      }, 0);

      // Background Subtle Glow Pulse
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Letter-by-letter reveal (staggered upward motion)
      tl.to(".letter", { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.04, 
        ease: "expo.out" 
      }, 0.2)
      
      // Progress bar fill (syncs with duration)
      .to(progressRef.current, { 
        scaleX: 1, 
        duration: 2.5, 
        ease: "expo.inOut" 
      }, 0)
      
      // Small pause for premium feeling
      .to({}, { duration: 0.4 })
      
      // Exit animations: Text slides up and fades
      .to(".letter", { 
        y: -40, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.02, 
        ease: "power3.in" 
      }, "+=0")
      // Progress elements fade
      .to(progressRef.current, { opacity: 0, duration: 0.4 }, "-=0.4")
      .to(percentRef.current, { opacity: 0, duration: 0.4 }, "-=0.4")
      .to(glowRef.current, { opacity: 0, duration: 0.6 }, "-=0.6")
      
      // Screen slides completely up revealing website
      .to(loaderRef.current, { 
        yPercent: -100, 
        duration: 1.4, 
        ease: "expo.inOut" 
      }, "-=0.2");

    }, loaderRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[100] bg-[#0a0a0b] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Premium Noise/Grain Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-screen z-0"></div>
      
      {/* Subtle Animated Glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/30 rounded-full blur-[120px] z-0 opacity-0"
      ></div>
      
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Letter by Letter Title */}
        <div 
          ref={textContainerRef} 
          className="flex overflow-hidden mb-12 h-20 md:h-28 items-center"
        >
          {letters.map((char, index) => (
            <span 
              key={index}
              className={`letter inline-block text-4xl md:text-7xl font-extrabold tracking-tight translate-y-[100px] opacity-0 ${
                char === " " ? "w-4 md:w-6" : "text-white"
              }`}
            >
              {char}
            </span>
          ))}
          <span className="letter inline-block text-4xl md:text-7xl font-extrabold text-blue-500 translate-y-[100px] opacity-0">.</span>
        </div>
        
        {/* Progress Bar & Percentage */}
        <div className="flex items-center gap-6 w-[260px] md:w-[400px]">
          <div className="flex-1 h-[2px] bg-zinc-800/80 rounded-full overflow-hidden relative">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left scale-x-0 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            ></div>
          </div>
          <div 
            ref={percentRef} 
            className="text-white font-mono text-sm tracking-widest font-medium w-12 text-right opacity-80"
          >
            0%
          </div>
        </div>
      </div>
    </div>
  );
}
