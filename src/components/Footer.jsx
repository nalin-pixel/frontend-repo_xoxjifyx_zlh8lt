import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} VibeChat AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white transition" href="#">Privacy</a>
            <a className="hover:text-white transition" href="#">Terms</a>
            <a className="hover:text-white transition" href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
