import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".contact-content", {
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      // Free Web3Forms Integration
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `${formData.name} sent a message from your Portfolio!`,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000); // clear status after 5s
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="contact-header text-3xl md:text-5xl font-bold mb-16 text-white text-center">
          Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Together.</span>
        </h2>
        
        <div className="contact-container max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8 contact-content">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Get in touch</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Ready to take your digital presence to the next level? Drop me a message and let's discuss your project. I usually respond within 24 hours.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email</p>
                  <p className="text-slate-300 group-hover:text-white transition-colors">muhammadhasan.developer@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-slate-300 group-hover:text-white transition-colors">Remote / Worldwide</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800/50">
              <h4 className="text-sm font-semibold text-white mb-4">Hire me on Platforms</h4>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center space-x-2 px-4 py-2 bg-[#00b22d]/10 text-[#00b22d] border border-[#00b22d]/30 hover:bg-[#00b22d] hover:text-white rounded-full text-sm font-medium transition-colors">
                  <span>Upwork</span> <ExternalLink size={14} />
                </a>
                <a href="https://www.fiverr.com/ranahassan99" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-[#1dbf73]/10 text-[#1dbf73] border border-[#1dbf73]/30 hover:bg-[#1dbf73] hover:text-white rounded-full text-sm font-medium transition-colors">
                  <span>Fiverr</span> <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3 contact-content bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'Sending...'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
              >
                {status === 'Sending...' ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
              
              {/* Form Status Message */}
              {status && status !== 'Sending...' && (
                <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                  status.includes('successfully') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
