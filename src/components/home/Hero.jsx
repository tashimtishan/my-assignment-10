"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#0F0A1E] to-[#0F0A1E]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="flex-1 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-violet-600/20 text-violet-400 text-sm font-medium rounded-full mb-6 border border-violet-600/30"
            >
              The home for original ebooks
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Discover &amp; Read
              <span className="text-violet-400"> Original</span>
              <br />Ebooks
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
            >
              Connect with talented writers. Browse thousands of original ebooks across every genre. Start reading today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/browse" className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors text-center text-lg">
                Browse Ebooks
              </Link>
              <Link href="/register" className="px-8 py-4 border border-[#241B45] hover:border-violet-600 text-white font-semibold rounded-xl transition-colors text-center text-lg">
                Start Writing
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-8 mt-12"
            >
              {[["500+", "Ebooks"], ["200+", "Writers"], ["10k+", "Readers"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-white">{num}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-1 items-center justify-center"
          >
            <div className="relative w-96 h-[500px]">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute left-0 top-16 w-44 h-60 bg-gradient-to-br from-violet-800 to-violet-950 rounded-2xl border border-violet-500/30 shadow-2xl shadow-violet-900/50 flex flex-col items-center justify-center gap-3 rotate-[-8deg] opacity-70"
              >
                <span className="text-5xl">🌙</span>
                <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                <div className="w-14 h-1.5 bg-white/10 rounded-full" />
                <div className="w-16 h-1.5 bg-white/10 rounded-full" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute right-0 top-8 w-44 h-60 bg-gradient-to-br from-[#1A1333] to-[#2D1B69] rounded-2xl border border-violet-400/40 shadow-2xl shadow-violet-900/50 flex flex-col items-center justify-center gap-3 rotate-[6deg] opacity-80"
              >
                <span className="text-5xl">🚀</span>
                <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                <div className="w-14 h-1.5 bg-white/10 rounded-full" />
                <div className="w-16 h-1.5 bg-white/10 rounded-full" />
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-52 h-72 bg-gradient-to-br from-violet-600 to-violet-900 rounded-2xl border border-violet-400/60 shadow-2xl shadow-violet-600/40 flex flex-col items-center justify-center gap-4 z-10"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
                <div>
                  <p className="text-white font-bold text-center">Fable</p>
                  <p className="text-violet-300 text-xs text-center">Original Stories</p>
                </div>
                <div className="w-24 h-1.5 bg-white/20 rounded-full" />
                <div className="w-16 h-1.5 bg-white/10 rounded-full" />
                <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <p className="text-white text-xs">Read Now →</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute top-0 right-8 w-10 h-10 border-2 border-violet-400/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-4 right-12 w-4 h-4 bg-amber-400/60 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute bottom-20 left-4 w-3 h-3 bg-violet-400/60 rounded-full"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;