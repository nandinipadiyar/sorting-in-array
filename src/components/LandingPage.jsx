import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Shuffle,
  Sparkles,
  Swords,
  SearchCode,
  Puzzle,
} from 'lucide-react';

const FLOATING_TILES = [
  { val: 12, idx: 0, delay: 0 },
  { val: 42, idx: 1, delay: 0.4 },
  { val: 7, idx: 2, delay: 0.8 },
  { val: 89, idx: 3, delay: 1.2 },
  { val: 25, idx: 4, delay: 1.6 },
];

export function LandingPage({ onNavigate, onOpenFaceOff }) {
  const [tiles, setTiles] = useState(FLOATING_TILES);
  const [focusedIdx, setFocusedIdx] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setFocusedIdx((prev) => (prev + 1) % tiles.length);
    }, 1500);
    return () => clearInterval(id);
  }, [tiles.length]);

  const shuffleTiles = () => {
    const vals = tiles.map((t) => t.val);
    for (let i = vals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [vals[i], vals[j]] = [vals[j], vals[i]];
    }
    setTiles(tiles.map((t, i) => ({ ...t, val: vals[i] })));
  };

  return (
    <div className="space-y-14 py-2 relative overflow-hidden">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            ARRAYVERSE – The Interactive Coding Playground
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-navy tracking-tight leading-[1.08]"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
              ARRAYVERSE
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy/80">
              Code. Visualize. Experiment.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-base sm:text-lg text-navy/80 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Drag and drop array blocks, race two sorting algorithms side by side in the Sorting
            Arena, crack C++ bugs in Code Detective, and solve Mystery Array puzzles — all with real
            algorithm execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1"
          >
            <button
              onClick={() => onNavigate('simulator')}
              className="btn-gradient text-sm sm:text-base px-6 py-3.5 inline-flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              Array Playground
            </button>
            <button
              onClick={() => (onOpenFaceOff ? onOpenFaceOff() : onNavigate('sorting'))}
              className="btn-primary text-sm sm:text-base px-6 py-3.5 inline-flex items-center gap-2"
            >
              <Swords className="w-4 h-4" />
              Algorithm Face-Off
            </button>
            <button
              onClick={() => onNavigate('play')}
              className="btn-secondary text-sm sm:text-base px-5 py-3.5 border-violet-300 text-violet-800 hover:border-violet-500 inline-flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              Play &amp; Learn
            </button>
          </motion.div>
        </div>

        {/* Original Coding-Themed 3D Interactive Playground Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            whileHover={{ rotateY: -2, rotateX: 2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-3xl p-[2px] bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 shadow-2xl"
          >
            <div className="bg-white rounded-[22px] p-5 sm:p-6 space-y-5 relative overflow-hidden">
              {/* Subtle Coding Grid Background SVG */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="av-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#243447" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#av-grid)" />
              </svg>

              {/* Top Bar */}
              <div className="relative flex items-center justify-between border-b border-sand/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="w-3 h-3 rounded-full bg-violet-500" />
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="ml-2 text-xs font-mono font-bold text-navy/60">
                    arrayverse_engine.cpp
                  </span>
                </div>
                <button
                  onClick={shuffleTiles}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-[11px] font-bold text-blue-700 hover:border-violet-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Shuffle className="w-3 h-3" />
                  Shuffle Blocks
                </button>
              </div>

              {/* Floating Interactive 3D Number Blocks */}
              <div className="relative bg-ivory/80 rounded-2xl border border-sand p-4 sm:p-5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-navy/55 mb-4">
                  <span>Memory Cells · int A[5]</span>
                  <span className="text-violet-700">
                    Active Ptr → A[{focusedIdx}] = {tiles[focusedIdx].val}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2.5 sm:gap-3 pt-1">
                  {tiles.map((tile, idx) => {
                    const isActive = idx === focusedIdx;
                    const barHeight = Math.max(16, Math.round((tile.val / 89) * 44));
                    return (
                      <motion.div
                        key={tile.idx}
                        animate={{
                          y: isActive ? [-6, -10, -6] : [0, -4, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.8,
                          delay: tile.delay,
                          ease: 'easeInOut',
                        }}
                        onClick={() => setFocusedIdx(idx)}
                        className="flex flex-col items-center gap-1.5 cursor-pointer"
                      >
                        <div className="h-12 flex items-end">
                          <div
                            className={`w-5 rounded-t-md transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-t from-blue-600 to-cyan-500'
                                : 'bg-sand-dark/60'
                            }`}
                            style={{ height: `${barHeight}px` }}
                          />
                        </div>
                        <div
                          className={`w-full h-12 sm:h-14 rounded-xl border-2 font-mono font-black text-sm sm:text-base flex items-center justify-center shadow-sm transition-all ${
                            isActive
                              ? 'bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-600 text-white border-blue-700 shadow-lg scale-105'
                              : 'bg-white text-navy border-sand-dark hover:border-blue-400'
                          }`}
                        >
                          {tile.val}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-navy/55">
                          [{idx}]
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Original Coding Graphic Strip */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-navy text-ivory rounded-xl p-3.5 font-mono text-[11px] leading-relaxed border border-navy-light">
                  <div className="text-cyan-300 font-bold mb-1">// C++ Memory Address</div>
                  <div>{`int* ptr = &A[${focusedIdx}];`}</div>
                  <div className="text-blue-200">{`// Value: ${tiles[focusedIdx].val}`}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 rounded-xl p-3.5 border border-blue-200 flex flex-col justify-center">
                  <div className="text-[10px] font-black uppercase tracking-wider text-violet-700 mb-1">
                    Interactive Playground
                  </div>
                  <div className="text-xs font-bold text-navy leading-snug">
                    Click any block above or shuffle to watch live pointer tracking!
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Modules Showcase */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Explore ARRAYVERSE
            </span>
            <h2 className="text-2xl font-black text-navy tracking-tight">
              Interactive Coding Sections
            </h2>
          </div>
          <span className="text-xs font-bold text-navy/60">
            Select any playground to launch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigate('simulator')}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-blue-500 hover:border-blue-400 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">A. Array Playground</h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Create custom arrays, drag and drop elements, edit values inline, and run insertion,
              deletion, addressing, and searching animations.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 group-hover:text-violet-600 inline-flex items-center gap-1">
              Open Playground{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('sorting')}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-violet-500 hover:border-violet-400 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">
              B &amp; F. Sorting Arena &amp; Coding Lab
            </h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Master all 7 sorting algorithms with theory, pass-by-pass examples, pseudocode,
              verified C++ programs, complexity tables, and live simulations.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-violet-600 group-hover:text-blue-600 inline-flex items-center gap-1">
              Enter Coding Lab{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div
            onClick={() => (onOpenFaceOff ? onOpenFaceOff() : onNavigate('sorting'))}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-cyan-500 hover:border-cyan-400 bg-gradient-to-br from-white to-cyan-50/35 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Swords className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">E. Algorithm Face-Off</h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Select any two sorting algorithms and race them side by side on the exact same array
              comparing real comparisons, swaps, and steps.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-cyan-700 group-hover:text-blue-600 inline-flex items-center gap-1">
              Launch Face-Off{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('detective')}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-blue-600 hover:border-blue-500 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <SearchCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">C. Code Detective</h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Find bugs in C++ snippets, guess program outputs, identify mystery sorting functions,
              and complete missing lines of code.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-blue-700 group-hover:text-violet-600 inline-flex items-center gap-1">
              Investigate Code{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('mystery')}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-violet-600 hover:border-violet-500 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Puzzle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">D. Mystery Array</h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Deduce missing values, solve array index pattern puzzles, and predict the next step of
              sorting or searching operations.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-violet-700 group-hover:text-blue-600 inline-flex items-center gap-1">
              Solve Mysteries{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('learning')}
            className="card p-6 flex flex-col cursor-pointer group hover:-translate-y-1.5 border-t-4 border-t-sky-500 hover:border-sky-400 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-navy mb-2">Learning Mode &amp; Play Hub</h3>
            <p className="text-sm text-navy/70 flex-1 leading-relaxed mb-4">
              Review core 1D/2D array theory and memory formulas, or jump into Play &amp; Learn
              interactive challenges anytime.
            </p>
            <span className="text-xs font-black uppercase tracking-wider text-sky-700 group-hover:text-blue-600 inline-flex items-center gap-1">
              Open Guides{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
