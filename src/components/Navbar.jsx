import React from 'react';
import { Rocket, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-orange-400">
            <Rocket className="w-5 h-5" />
          </div>
          <span className="text-white">VibeChat AI</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#chat" className="hover:text-white transition">Chat</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition shadow">
            <Sparkles className="w-4 h-4" /> Try now
          </button>
        </div>
      </div>
    </header>
  );
}
