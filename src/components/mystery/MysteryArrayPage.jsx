import { useState } from 'react';
import {
  Puzzle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import {
  MISSING_VALUE_PUZZLES,
  PATTERN_PUZZLES,
  NEXT_OPERATION_PUZZLES,
} from '../../data/mysteryArrayData';

function MissingValueMode() {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState({});

  const p = MISSING_VALUE_PUZZLES[idx];
  const parsed = parseInt(guess.trim(), 10);
  const isCorrect = submitted && parsed === p.answer;

  const handleCheck = (e) => {
    e.preventDefault();
    if (!guess.trim() || isNaN(parsed)) return;
    setSubmitted(true);
    setSolved((prev) => ({ ...prev, [p.id]: parsed === p.answer }));
  };

  const go = (nextIdx) => {
    setIdx(nextIdx);
    setGuess('');
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Mystery Array · {p.category}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{p.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Puzzle {idx + 1} of {MISSING_VALUE_PUZZLES.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
            Solved: {Object.values(solved).filter(Boolean).length} / {MISSING_VALUE_PUZZLES.length}
          </span>
        </div>
      </div>

      {/* Visual Array with Missing Block */}
      <div className="bg-ivory/70 rounded-xl border border-sand p-6 overflow-x-auto">
        <div className="flex justify-start sm:justify-center gap-4 min-w-max py-2">
          {p.array.map((val, i) => {
            const isMissing = val === null;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-navy/50">A[{i}]</span>
                <div
                  className={`w-16 h-16 array-block ${
                    isMissing
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-gradient-to-br from-blue-50 to-violet-100 border-2 border-dashed border-blue-500 text-blue-700'
                      : ''
                  }`}
                >
                  {isMissing ? (isCorrect ? p.answer : '?') : val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            if (submitted) setSubmitted(false);
          }}
          placeholder="Enter missing integer..."
          className="input-field py-2.5 font-mono text-sm flex-1"
        />
        <button type="submit" disabled={!guess.trim()} className="btn-primary py-2.5 px-6 text-sm">
          Verify Value
        </button>
        <button
          type="button"
          onClick={() => setShowHint((h) => !h)}
          className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-violet-600" />
          {showHint ? 'Hide Hint' : 'Hint'}
        </button>
      </form>

      {showHint && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950 font-medium">
          <strong>Hint:</strong> {p.hint}
        </div>
      )}

      {submitted && (
        <div
          className={`rounded-xl border-2 p-4 space-y-1.5 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Exact Match! The missing element is {p.answer}.
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                Not quite — check the pattern again or use the hint!
              </>
            )}
          </div>
          {isCorrect && <p className="text-sm leading-relaxed">{p.explanation}</p>}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-sand/50">
        <button
          onClick={() =>
            go((idx - 1 + MISSING_VALUE_PUZZLES.length) % MISSING_VALUE_PUZZLES.length)
          }
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => go((idx + 1) % MISSING_VALUE_PUZZLES.length)}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Mystery
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function PatternPuzzlesMode() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const p = PATTERN_PUZZLES[idx];
  const isAnswered = selected !== null;
  const isCorrect = selected === p.correctIndex;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-violet-700">
            Mystery Array · Pattern Recognition
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{p.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-bold">
          Pattern {idx + 1} of {PATTERN_PUZZLES.length}
        </span>
      </div>

      <p className="text-sm sm:text-base font-medium text-navy/90">{p.prompt}</p>

      <div className="bg-ivory/70 rounded-xl border border-sand p-6 overflow-x-auto">
        <div className="flex justify-start sm:justify-center gap-4 min-w-max py-2">
          {p.array.map((val, i) => {
            const isBlank = val === null;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-navy/50">[{i}]</span>
                <div
                  className={`w-15 h-15 array-block ${
                    isBlank
                      ? isAnswered
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-gradient-to-br from-violet-50 to-cyan-50 border-2 border-dashed border-violet-500 text-violet-700'
                      : ''
                  }`}
                >
                  {isBlank ? (isAnswered ? p.options[p.correctIndex] : '?') : val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              onClick={() => !isAnswered && setSelected(i)}
              disabled={isAnswered}
              className={`p-3.5 rounded-xl border-2 font-mono font-bold text-base transition-all cursor-pointer disabled:cursor-default ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowHint((h) => !h)}
          className="btn-secondary py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-violet-600" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>

      {showHint && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950 font-medium">
          <strong>Hint:</strong> {p.hint}
        </div>
      )}

      {isAnswered && (
        <div
          className={`rounded-xl border-2 p-4 space-y-1.5 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm">
            {isCorrect ? 'Pattern Solved!' : `Correct Value: ${p.options[p.correctIndex]}`}
          </div>
          <p className="text-sm leading-relaxed">{p.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-sand/50">
        <button
          onClick={() => {
            setIdx((idx - 1 + PATTERN_PUZZLES.length) % PATTERN_PUZZLES.length);
            setSelected(null);
            setShowHint(false);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => {
            setIdx((idx + 1) % PATTERN_PUZZLES.length);
            setSelected(null);
            setShowHint(false);
          }}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Pattern
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function NextOperationMode() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const p = NEXT_OPERATION_PUZZLES[idx];
  const isAnswered = selected !== null;
  const isCorrect = selected === p.correctIndex;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-700">
            Mystery Array · {p.algorithm}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{p.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
          Step {idx + 1} of {NEXT_OPERATION_PUZZLES.length}
        </span>
      </div>

      <div className="bg-ivory/70 rounded-xl border border-sand p-5 overflow-x-auto">
        <div className="text-[11px] font-black uppercase tracking-wider text-navy/50 mb-3">
          Current Array State
        </div>
        <div className="flex justify-start sm:justify-center gap-3 min-w-max">
          {p.beforeArray.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-14 h-14 array-block text-base ${
                  i < p.sortedPrefixCount ? 'array-block-selected' : ''
                }`}
              >
                {val}
              </div>
              <span className="text-[10px] font-mono font-bold text-navy/50">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm sm:text-base font-bold text-navy">{p.prompt}</p>

      <div className="grid grid-cols-1 gap-2.5">
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
              onClick={() => !isAnswered && setSelected(i)}
              disabled={isAnswered}
              className={`p-3.5 rounded-xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${cls}`}
            >
              <span>{opt}</span>
              {isAnswered && right && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              {isAnswered && picked && !right && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => setShowHint((h) => !h)}
          className="btn-secondary py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-violet-600" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>

      {showHint && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950 font-medium">
          <strong>Hint:</strong> {p.hint}
        </div>
      )}

      {isAnswered && (
        <div
          className={`rounded-xl border-2 p-4 space-y-1.5 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm">
            {isCorrect ? 'Great Prediction!' : 'Expected Next Step:'}
          </div>
          <p className="text-sm leading-relaxed">{p.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-sand/50">
        <button
          onClick={() => {
            setIdx((idx - 1 + NEXT_OPERATION_PUZZLES.length) % NEXT_OPERATION_PUZZLES.length);
            setSelected(null);
            setShowHint(false);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => {
            setIdx((idx + 1) % NEXT_OPERATION_PUZZLES.length);
            setSelected(null);
            setShowHint(false);
          }}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Challenge
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const MYSTERY_TABS = [
  { id: 'missing', label: 'Find Missing Value', icon: Puzzle },
  { id: 'pattern', label: 'Array Pattern Puzzles', icon: Sparkles },
  { id: 'next-op', label: 'Predict Next Operation', icon: GitBranch },
];

export function MysteryArrayPage() {
  const [tab, setTab] = useState('missing');

  return (
    <div className="space-y-6">
      <div className="card p-6 md:p-8 bg-gradient-to-br from-white via-violet-50/35 to-cyan-50/40">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-xs font-black uppercase tracking-wider">
            <Puzzle className="w-3.5 h-3.5 text-blue-600" />
            ARRAYVERSE · Mystery Array
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
            Mystery Array
          </h2>
          <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
            Solve array logic puzzles: deduce missing elements, decode index patterns, and predict
            what an algorithm will do on its next step.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-sand/60">
          {MYSTERY_TABS.map((t) => {
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
        {tab === 'missing' && <MissingValueMode />}
        {tab === 'pattern' && <PatternPuzzlesMode />}
        {tab === 'next-op' && <NextOperationMode />}
      </div>
    </div>
  );
}
