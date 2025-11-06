import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative" id="home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Talk to AI in realtime
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-orange-300"> with stunning visuals</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300 max-w-xl"
          >
            A clean AI chat with a realtime voice-ready engine and a mesmerizing aura animation. Minimal, fast, and delightful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <a href="#chat" className="px-5 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition">Start chatting</a>
            <a href="#features" className="px-5 py-3 rounded-lg border border-white/20 hover:border-white/40 transition">Learn more</a>
          </motion.div>
        </div>

        <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full rounded-2xl overflow-hidden">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/40" />
        </div>
      </div>
    </section>
  );
}
