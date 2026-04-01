import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "React.js", "Tailwind CSS", "GSAP", "Framer Motion", "Vite"]
  },
  {
    title: "Backend Core",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"]
  },
  {
    title: "Web Automation",
    skills: ["Playwright", "Puppeteer", "Web Scraping", "Data Extraction", "End-to-End Testing"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker (Basic)", "Postman", "Figma", "Vercel"]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".skill-category", {
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="py-24 bg-zinc-950/50" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="skills-header text-3xl md:text-5xl font-bold mb-16 text-white text-center">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Arsenal.</span>
        </h2>
        
        <div className="skills-container grid md:grid-cols-2 gap-10 lg:gap-16">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <h3 className="text-xl font-semibold text-white border-b border-zinc-800 pb-4 mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800/80 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
