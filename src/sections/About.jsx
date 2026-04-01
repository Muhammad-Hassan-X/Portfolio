import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Bot, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-cards-container",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: <Code2 className="text-blue-400" size={28} />,
      title: "Frontend Engineering",
      desc: "Building pixel-perfect, accessible, and responsive UIs with modern React and Tailwind."
    },
    {
      icon: <Bot className="text-indigo-400" size={28} />,
      title: "Web Automation",
      desc: "Automating repetitive tasks, testing, and scraping with Playwright flawlessly."
    },
    {
      icon: <Zap className="text-purple-400" size={28} />,
      title: "Performance First",
      desc: "Optimizing state, assets, and rendering loops for blazing-fast experiences."
    }
  ];

  return (
    <section id="about" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="about-header text-3xl md:text-5xl font-bold mb-12 text-white">
          Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Code.</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-light">
            <p className="about-content">
              I am a passionate software engineer blending design and logic to build exceptional digital experiences. Operating as a freelance professional, I focus on delivering immense value through clean code and modern aesthetics.
            </p>
            <p className="about-content">
              My expertise sits at the intersection of stunning frontend interfaces and robust automation systems. Whether it's a dynamic SaaS dashboard or a web scraping bot, I build it to scale and perform beautifully.
            </p>
            <p className="about-content">
              When I'm not coding, I'm exploring new web technologies, refining UI/UX patterns, or automating my own life workflows.
            </p>
          </div>

          <div className="about-cards-container grid sm:grid-cols-2 gap-6 lg:gap-8">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className={`about-card bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 p-6 rounded-2xl hover:bg-zinc-800/80 transition-colors ${index === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-700/50">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
