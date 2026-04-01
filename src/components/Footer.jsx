import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-800/50">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center z-10 relative">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <a href="#" className="text-2xl font-bold tracking-tighter text-white block mb-2">
            Hassan<span className="text-blue-500">.</span>
          </a>
          <p className="text-sm text-slate-400 max-w-xs">
            Full-Stack Developer & Automation Specialist building premium digital experiences.
          </p>
        </div>
        
        <div className="flex space-x-5">
          <a href="https://github.com/Muhammad-Hassan-X" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-110">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-hassan-x" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-110">
            <Linkedin size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-110">
            <Twitter size={18} />
          </a>
          <a href="mailto:muhammadhasan.developer@gmail.com" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all hover:scale-110">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-10 pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Muhammad Hassan. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</a>
          <a className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
