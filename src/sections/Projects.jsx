import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SaaS Analytics Dashboard",
    problem: "Clients needed a unified view of disparate analytics sources with real-time updates.",
    solution: "Built a high-performance React dashboard using Websockets, complex state management, and customized D3 charts.",
    tech: ["React", "Tailwind", "Zustand", "D3.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "E-Commerce Architecture UI",
    problem: "Legacy storefront was slow and suffered from poor mobile conversion rates.",
    solution: "Redesigned the entire frontend experience mobile-first, integrating a headless CMS and optimizing image delivery.",
    tech: ["Next.js", "Tailwind", "GSAP", "Shopify"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Automated Data Scraper Bot",
    problem: "Manual data entry from competitor websites was taking 20+ hours weekly.",
    solution: "Developed an automated Playwright suite with stealth plugins to scrape, normalize, and push data to a MongoDB instance.",
    tech: ["Playwright", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  }
];

// Duplicate projects to create a seamless infinite loop
const loopProjects = [...projects, ...projects, ...projects, ...projects];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".projects-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Infinite Marquee setup
      const marqueeAnimation = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // Local hover handlers to avoid global freeze
      const handleMouseEnter = () => marqueeAnimation.pause();
      const handleMouseLeave = () => marqueeAnimation.play();

      const track = trackRef.current;
      if (track) {
        track.addEventListener("mouseenter", handleMouseEnter);
        track.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (track) {
          track.removeEventListener("mouseenter", handleMouseEnter);
          track.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <h2 className="projects-header text-3xl md:text-5xl font-bold text-white text-center">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Work.</span>
        </h2>
      </div>
      
      {/* Marquee Wrapper */}
      <div className="w-full overflow-hidden flex cursor-grab active:cursor-grabbing">
        <div ref={trackRef} className="flex w-max">
          {loopProjects.map((project, idx) => (
            <div 
              key={idx} 
              className="mr-6 md:mr-8 w-[320px] md:w-[400px] shrink-0 project-card group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] flex flex-col"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col pointer-events-none group-hover:pointer-events-auto">
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{project.title}</h3>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">Problem</span>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Solution</span>
                    <p className="text-sm text-slate-300 mt-1 line-clamp-2">{project.solution}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs font-medium text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 mt-auto">
                  <a href="#" className="flex-1 text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 pointer-events-auto">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href="#" className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-zinc-700 pointer-events-auto">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
