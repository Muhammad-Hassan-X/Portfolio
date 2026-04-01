import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Paintbrush, FileCode, Webhook, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Monitor className="text-blue-400" size={32} />,
    title: "Landing Page Development",
    desc: "High-converting, visually stunning landing pages designed to capture leads and drive sales instantly."
  },
  {
    icon: <Paintbrush className="text-purple-400" size={32} />,
    title: "Website Redesign",
    desc: "Breathing new life into outdated websites with modern aesthetics, better UX, and lightning-fast performance."
  },
  {
    icon: <FileCode className="text-emerald-400" size={32} />,
    title: "Figma to Code",
    desc: "Pixel-perfect translation of your Figma designs into clean, semantic React and Tailwind code."
  },
  {
    icon: <Webhook className="text-orange-400" size={32} />,
    title: "API Integration",
    desc: "Seamlessly connecting your frontend to third-party services, databases, and custom backend systems."
  },
  {
    icon: <Bot className="text-indigo-400" size={32} />,
    title: "Web Automation",
    desc: "Building custom bots to automate your tedious repetitive browser tasks and scrape valuable data."
  }
];

export default function Services() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-24 bg-zinc-950/30" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="services-header text-3xl md:text-5xl font-bold mb-16 text-white text-center">
          What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Do.</span>
        </h2>
        
        <div className="services-container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="service-card bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-800/80 hover:border-blue-500/50 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-zinc-700">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
