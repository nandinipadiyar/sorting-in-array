import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Copy,
  Check,
  Clock,
  Cpu,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ListOrdered,
  PlayCircle,
} from 'lucide-react';
import { SORTING_ALGORITHMS } from '../../data/sortingAlgorithmsData';
import { SortingVisualizer } from './SortingVisualizer';

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API fallback ignored if unavailable
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border border-sand bg-white hover:bg-ivory text-navy transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-sage-dark" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          {label}
        </>
      )}
    </button>
  );
}

export function SortingDetailPage({ algorithm, onSelectAlgorithm, onBack }) {
  const [activeView, setActiveView] = useState('all'); // 'all' | 'simulation' | 'theory'

  const scrollToSection = (id) => {
    if (activeView !== 'all') {
      setActiveView('all');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Navigation & Algorithm Switcher */}
      <div className="card p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            All Sorting Algorithms
          </button>

          <div className="inline-flex rounded-lg border border-sand bg-ivory p-1 self-start sm:self-auto">
            {[
              { id: 'all', label: 'Full Lesson + Simulator' },
              { id: 'simulation', label: 'Simulator Focus' },
              { id: 'theory', label: 'Theory & C++ Only' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeView === tab.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-navy/70 hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Switcher across all 7 algorithms */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-sand/50">
          {SORTING_ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onSelectAlgorithm(algo.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                algo.id === algorithm.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-ivory/70 text-navy border-sand hover:bg-sand-light'
              }`}
            >
              {algo.number}. {algo.name}
            </button>
          ))}
        </div>

        {/* Title & Quick Jump Pills */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sage text-white text-xs font-black tracking-wider uppercase">
              Algorithm {algorithm.number}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-ivory border border-sand text-navy text-xs font-bold">
              {algorithm.methodType}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-ivory border border-sand text-navy text-xs font-bold">
              {algorithm.complexity.stable}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-ivory border border-sand text-navy text-xs font-bold">
              {algorithm.complexity.inPlace === 'Yes' ? 'In-Place' : 'Not In-Place'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-navy tracking-tight">
            {algorithm.name}
          </h1>
          <p className="text-navy/75 text-base mt-1 font-medium">{algorithm.tagline}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { id: 'sec-sim', label: 'Interactive Simulation' },
              { id: 'sec-intro', label: 'A. Introduction' },
              { id: 'sec-working', label: 'B. Working Principle' },
              { id: 'sec-example', label: 'C. Example' },
              { id: 'sec-algo', label: 'D. Algorithm' },
              { id: 'sec-cpp', label: 'E. C++ Program' },
              { id: 'sec-complexity', label: 'F. Complexity' },
              { id: 'sec-proscons', label: 'G. Advantages & Disadvantages' },
              { id: 'sec-apps', label: 'H. Applications' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => scrollToSection(pill.id)}
                className="px-2.5 py-1 rounded-md bg-ivory hover:bg-sand-light border border-sand/70 text-[11px] font-bold text-navy/80 hover:text-navy transition-colors cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Simulation Section */}
      {(activeView === 'all' || activeView === 'simulation') && (
        <section id="sec-sim" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2.5">
            <PlayCircle className="w-6 h-6 text-sage-dark" />
            <h2 className="text-xl font-black text-navy uppercase tracking-wider">
              Interactive Simulation
            </h2>
          </div>
          <SortingVisualizer algorithm={algorithm} />
        </section>
      )}

      {/* Detailed Theory Sections A through H */}
      {(activeView === 'all' || activeView === 'theory') && (
        <div className="space-y-6">
          {/* A. Introduction */}
          <section id="sec-intro" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-sand pb-3">
              <BookOpen className="w-5 h-5 text-sage-dark" />
              <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                A. Introduction
              </h2>
            </div>
            <p className="text-navy/90 leading-relaxed text-base">
              {algorithm.introduction.summary}
            </p>
            <div className="bg-ivory border-l-4 border-sage rounded-r-lg p-4 text-sm text-navy/85 leading-relaxed">
              <span className="font-black text-navy uppercase text-xs tracking-wider block mb-1">
                Simple Definition
              </span>
              {algorithm.introduction.definition}
            </div>
            {algorithm.id === 'radix' && (
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-sm text-amber-950 font-medium">
                <strong>Supported Input Note:</strong> Standard Radix Sort works on{' '}
                <strong>non-negative integers (0, 1, 2, ...)</strong> because elements are grouped
                into digit buckets 0 through 9.
              </div>
            )}
          </section>

          {/* B. Working Principle */}
          <section id="sec-working" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-sand pb-3">
              <ListOrdered className="w-5 h-5 text-sage-dark" />
              <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                B. Working Principle (Step-by-Step)
              </h2>
            </div>
            <ol className="space-y-3">
              {algorithm.workingPrinciple.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-navy/90 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* C. Example (Pass-by-Pass) */}
          <section id="sec-example" className="card p-6 md:p-8 scroll-mt-24 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-sand pb-3">
              <Lightbulb className="w-5 h-5 text-sage-dark" />
              <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                C. Solved Example (Pass-by-Pass Walkthrough)
              </h2>
            </div>

            <div className="bg-ivory rounded-xl border border-sand p-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-navy/70">
                Initial Example Array:
              </span>
              <div className="flex flex-wrap gap-2">
                {algorithm.example.initialArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 array-block text-sm shadow-none"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {algorithm.example.passes.map((pass, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-sand bg-ivory/40 p-4 md:p-5 space-y-3"
                >
                  <div className="text-sm font-black text-navy">{pass.passTitle}</div>
                  <p className="text-sm text-navy/85 leading-relaxed">{pass.explanation}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-navy/50 mr-1">
                      After Pass:
                    </span>
                    {pass.after.map((val, cellIdx) => {
                      const isHi = pass.highlightIndices.includes(cellIdx);
                      const isSortedCell =
                        pass.sortedUpTo >= 0 && cellIdx <= pass.sortedUpTo;
                      return (
                        <div
                          key={cellIdx}
                          className={`w-10 h-10 rounded-md border font-mono text-sm font-bold flex items-center justify-center ${
                            isHi
                              ? 'bg-amber-100 border-amber-500 text-amber-950'
                              : isSortedCell
                              ? 'bg-sage text-white border-sage-dark'
                              : 'bg-white border-sand-dark text-navy'
                          }`}
                        >
                          {val}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-sage bg-sage/10 p-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-sage-dark">
                Final Sorted Array:
              </span>
              <div className="flex flex-wrap gap-2">
                {algorithm.example.finalArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-md border border-sage-dark bg-sage text-white font-mono text-sm font-bold flex items-center justify-center"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* D. Algorithm (Pseudocode) */}
          <section id="sec-algo" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-3">
              <div className="flex items-center gap-2.5">
                <ListOrdered className="w-5 h-5 text-sage-dark" />
                <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                  D. Algorithm (Pseudocode)
                </h2>
              </div>
              <CopyButton text={algorithm.pseudocode.join('\n')} label="Copy Pseudocode" />
            </div>
            <div className="bg-ivory rounded-xl border border-sand p-4 md:p-5 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-navy leading-relaxed whitespace-pre">
                {algorithm.pseudocode.join('\n')}
              </pre>
            </div>
          </section>

          {/* E. C++ Implementation */}
          <section id="sec-cpp" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-3">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-sage-dark" />
                <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                  E. C++ Implementation
                </h2>
              </div>
              <CopyButton text={algorithm.cppCode} label="Copy C++ Code" />
            </div>
            <p className="text-xs text-navy/70 font-medium">
              Complete, standard C++ program using <code className="font-mono">&lt;iostream&gt;</code>{' '}
              — ready to compile and run with <code className="font-mono">g++</code>.
            </p>
            <div className="bg-navy text-ivory rounded-xl border border-navy-light p-4 md:p-5 overflow-x-auto shadow-inner">
              <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
                <code>{algorithm.cppCode}</code>
              </pre>
            </div>
          </section>

          {/* F. Complexity Analysis */}
          <section id="sec-complexity" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-sand pb-3">
              <Clock className="w-5 h-5 text-sage-dark" />
              <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                F. Complexity Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-ivory rounded-xl border border-sand p-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-navy/60">
                  Best-Case Time
                </div>
                <div className="text-2xl font-mono font-black text-sage-dark mt-1">
                  {algorithm.complexity.best}
                </div>
                <p className="text-xs text-navy/75 mt-2 leading-relaxed">
                  {algorithm.complexity.bestNote}
                </p>
              </div>
              <div className="bg-ivory rounded-xl border border-sand p-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-navy/60">
                  Average-Case Time
                </div>
                <div className="text-2xl font-mono font-black text-navy mt-1">
                  {algorithm.complexity.average}
                </div>
                <p className="text-xs text-navy/75 mt-2 leading-relaxed">
                  {algorithm.complexity.averageNote}
                </p>
              </div>
              <div className="bg-ivory rounded-xl border border-sand p-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-navy/60">
                  Worst-Case Time
                </div>
                <div className="text-2xl font-mono font-black text-amber-700 mt-1">
                  {algorithm.complexity.worst}
                </div>
                <p className="text-xs text-navy/75 mt-2 leading-relaxed">
                  {algorithm.complexity.worstNote}
                </p>
              </div>
              <div className="bg-ivory rounded-xl border border-sand p-4">
                <div className="text-[11px] font-black uppercase tracking-wider text-navy/60">
                  Space Complexity
                </div>
                <div className="text-2xl font-mono font-black text-navy mt-1">
                  {algorithm.complexity.space}
                </div>
                <p className="text-xs text-navy/75 mt-2 leading-relaxed">
                  {algorithm.complexity.spaceNote}
                </p>
              </div>
            </div>
          </section>

          {/* G. Advantages & Disadvantages */}
          <section id="sec-proscons" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-24">
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-sand pb-3">
                <CheckCircle2 className="w-5 h-5 text-sage-dark" />
                <h2 className="text-base font-black text-navy uppercase tracking-wider">
                  G. Advantages
                </h2>
              </div>
              <ul className="space-y-2.5 text-sm text-navy/90 leading-relaxed">
                {algorithm.advantages.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-sage-dark font-black mt-0.5">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-sand pb-3">
                <XCircle className="w-5 h-5 text-red-700" />
                <h2 className="text-base font-black text-navy uppercase tracking-wider">
                  G. Disadvantages
                </h2>
              </div>
              <ul className="space-y-2.5 text-sm text-navy/90 leading-relaxed">
                {algorithm.disadvantages.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-700 font-black mt-0.5">−</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* H. Applications */}
          <section id="sec-apps" className="card p-6 md:p-8 scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-sand pb-3">
              <Cpu className="w-5 h-5 text-sage-dark" />
              <h2 className="text-lg font-black text-navy uppercase tracking-wider">
                H. Applications
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {algorithm.applications.map((app, idx) => (
                <li
                  key={idx}
                  className="bg-ivory rounded-xl border border-sand p-4 text-sm text-navy/90 leading-relaxed"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-sage-dark block mb-1">
                    Use Case {idx + 1}
                  </span>
                  {app}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
