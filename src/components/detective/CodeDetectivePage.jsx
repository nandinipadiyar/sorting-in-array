import { useState } from 'react';
import {
  Bug,
  Terminal,
  SearchCode,
  FileCode2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { GuessOutputGame } from '../play/GuessOutputGame';
import { FindErrorGame } from '../play/FindErrorGame';
import {
  IDENTIFY_ALGORITHM_PUZZLES,
  COMPLETE_CODE_PUZZLES,
} from '../../data/codeDetectiveData';

function NumberedSnippet({ code, highlightFixed = false }) {
  return (
    <div
      className={`rounded-xl border p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed ${
        highlightFixed
          ? 'bg-emerald-950 text-emerald-50 border-emerald-700'
          : 'bg-navy text-ivory border-navy-light'
      }`}
    >
      {code.split('\n').map((line, idx) => (
        <div key={idx} className="flex gap-4">
          <span className="opacity-35 select-none w-5 text-right shrink-0">{idx + 1}</span>
          <span
            className={`whitespace-pre ${
              line.includes('MISSING LINE') ? 'text-cyan-300 font-bold' : ''
            }`}
          >
            {line || ' '}
          </span>
        </div>
      ))}
    </div>
  );
}

function IdentifyAlgorithmPanel() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState({});

  const p = IDENTIFY_ALGORITHM_PUZZLES[idx];
  const isAnswered = selected !== null;
  const isCorrect = selected === p.correctIndex;

  const pick = (optIdx) => {
    if (isAnswered) return;
    setSelected(optIdx);
    setSolved((prev) => ({ ...prev, [p.id]: optIdx === p.correctIndex }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Code Detective · Algorithm Recognition
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{p.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Case {idx + 1} of {IDENTIFY_ALGORITHM_PUZZLES.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold">
            Solved: {Object.values(solved).filter(Boolean).length} /{' '}
            {IDENTIFY_ALGORITHM_PUZZLES.length}
          </span>
        </div>
      </div>

      <NumberedSnippet code={p.code} />

      <div className="space-y-3">
        <div className="text-sm font-bold text-navy">
          Which sorting algorithm does this C++ function implement?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {p.options.map((opt, i) => {
            const picked = selected === i;
            const right = i === p.correctIndex;
            let cls = 'bg-white border-sand hover:border-blue-500 text-navy';
            if (isAnswered) {
              if (right) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              else if (picked) cls = 'bg-red-50 border-red-400 text-red-900';
              else cls = 'bg-ivory/60 border-sand/60 text-navy/50';
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={isAnswered}
                className={`p-3.5 rounded-xl border-2 font-bold text-sm text-left transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span>{opt}</span>
                {isAnswered && right && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isAnswered && picked && !right && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div
          className={`rounded-xl border-2 p-4 space-y-1.5 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm">
            {isCorrect
              ? `Case Cracked! It is ${p.options[p.correctIndex]}.`
              : `Answer: ${p.options[p.correctIndex]}`}
          </div>
          <p className="text-sm leading-relaxed">{p.explanation}</p>
          <p className="text-xs font-bold opacity-80">Key Clue: {p.clue}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand/50">
        <button
          onClick={() => {
            setIdx((idx - 1 + IDENTIFY_ALGORITHM_PUZZLES.length) % IDENTIFY_ALGORITHM_PUZZLES.length);
            setSelected(null);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => {
            setIdx(0);
            setSelected(null);
            setSolved({});
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={() => {
            setIdx((idx + 1) % IDENTIFY_ALGORITHM_PUZZLES.length);
            setSelected(null);
          }}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Case
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CompleteMissingLinePanel() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState({});

  const p = COMPLETE_CODE_PUZZLES[idx];
  const isAnswered = selected !== null;
  const isCorrect = selected === p.correctIndex;

  const pick = (optIdx) => {
    if (isAnswered) return;
    setSelected(optIdx);
    setSolved((prev) => ({ ...prev, [p.id]: optIdx === p.correctIndex }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-violet-700">
            Code Detective · {p.topic}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{p.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold">
            Puzzle {idx + 1} of {COMPLETE_CODE_PUZZLES.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Solved: {Object.values(solved).filter(Boolean).length} /{' '}
            {COMPLETE_CODE_PUZZLES.length}
          </span>
        </div>
      </div>

      <NumberedSnippet code={p.templateCode} />

      <div className="space-y-3">
        <div className="text-sm font-bold text-navy">
          Choose the exact C++ statement that completes{' '}
          <code className="font-mono text-blue-700">/* ??? MISSING LINE ??? */</code>:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {p.options.map((opt, i) => {
            const picked = selected === i;
            const right = i === p.correctIndex;
            let cls = 'bg-white border-sand hover:border-violet-500 text-navy';
            if (isAnswered) {
              if (right) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              else if (picked) cls = 'bg-red-50 border-red-400 text-red-900';
              else cls = 'bg-ivory/60 border-sand/60 text-navy/50';
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={isAnswered}
                className={`p-3.5 rounded-xl border-2 font-mono font-bold text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span>{opt}</span>
                {isAnswered && right && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && picked && !right && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="space-y-4">
          <div
            className={`rounded-xl border-2 p-4 space-y-1.5 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-400 text-amber-950'
            }`}
          >
            <div className="font-black text-sm">
              {isCorrect ? 'Code Completed Correctly!' : 'Here is the right completion:'}
            </div>
            <p className="text-sm leading-relaxed">{p.explanation}</p>
            <div className="text-xs font-bold">
              Compiled Output:{' '}
              <code className="font-mono bg-white/80 px-2 py-0.5 rounded border border-sand">
                {p.expectedOutput}
              </code>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Complete Working C++ Program
            </div>
            <NumberedSnippet code={p.completeCode} highlightFixed={true} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand/50">
        <button
          onClick={() => {
            setIdx((idx - 1 + COMPLETE_CODE_PUZZLES.length) % COMPLETE_CODE_PUZZLES.length);
            setSelected(null);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => {
            setIdx(0);
            setSelected(null);
            setSolved({});
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={() => {
            setIdx((idx + 1) % COMPLETE_CODE_PUZZLES.length);
            setSelected(null);
          }}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Puzzle
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const DETECTIVE_TABS = [
  { id: 'find-error', label: 'Find Errors in C++', icon: Bug },
  { id: 'guess-output', label: 'Guess the Output', icon: Terminal },
  { id: 'identify-algo', label: 'Identify the Algorithm', icon: SearchCode },
  { id: 'complete-code', label: 'Complete Missing Lines', icon: FileCode2 },
];

export function CodeDetectivePage() {
  const [tab, setTab] = useState('find-error');

  return (
    <div className="space-y-6">
      <div className="card p-6 md:p-8 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/40">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider">
            <SearchCode className="w-3.5 h-3.5 text-violet-600" />
            ARRAYVERSE · Code Detective
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
            Code Detective
          </h2>
          <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
            Sharpen your C++ debugging and tracing skills: hunt down off-by-one bugs, predict program
            outputs, recognize sorting implementations, and fill in missing algorithm lines.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-sand/60">
          {DETECTIVE_TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer inline-flex items-center gap-2 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-transparent shadow-sm'
                    : 'bg-white text-navy border-sand hover:border-blue-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card p-6 md:p-8">
        {tab === 'find-error' && <FindErrorGame />}
        {tab === 'guess-output' && <GuessOutputGame />}
        {tab === 'identify-algo' && <IdentifyAlgorithmPanel />}
        {tab === 'complete-code' && <CompleteMissingLinePanel />}
      </div>
    </div>
  );
}
