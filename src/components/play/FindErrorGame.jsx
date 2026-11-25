import { useState } from 'react';
import { Bug, CheckCircle2, XCircle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { FIND_ERROR_QUESTIONS } from '../../data/playGamesData';

function NumberedCodeBlock({ code, accent = 'navy' }) {
  const lines = code.split('\n');
  return (
    <div
      className={`rounded-xl border p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed ${
        accent === 'fixed'
          ? 'bg-emerald-950 text-emerald-50 border-emerald-700'
          : 'bg-navy text-ivory border-navy-light'
      }`}
    >
      {lines.map((line, idx) => (
        <div key={idx} className="flex gap-4">
          <span className="opacity-40 select-none w-5 text-right shrink-0">{idx + 1}</span>
          <span className="whitespace-pre">{line || ' '}</span>
        </div>
      ))}
    </div>
  );
}

export function FindErrorGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [solvedMap, setSolvedMap] = useState({});

  const q = FIND_ERROR_QUESTIONS[index];
  const isAnswered = selected !== null;
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (optIdx) => {
    if (isAnswered) return;
    setSelected(optIdx);
    setSolvedMap((prev) => ({ ...prev, [q.id]: optIdx === q.correctIndex }));
  };

  const goTo = (nextIdx) => {
    setIndex(nextIdx);
    setSelected(null);
  };

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Mini-Game B · {q.topic}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{q.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            Bug {index + 1} of {FIND_ERROR_QUESTIONS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Fixed: {solvedCount} / {FIND_ERROR_QUESTIONS.length}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5">
          <Bug className="w-4 h-4" />
          Buggy C++ Program — Inspect the Lines Carefully
        </div>
        <NumberedCodeBlock code={q.buggyCode} />
      </div>

      <div className="space-y-3">
        <div className="text-sm font-bold text-navy">Which option identifies the bug?</div>
        <div className="grid grid-cols-1 gap-2.5">
          {q.options.map((opt, idx) => {
            const isPicked = selected === idx;
            const isRight = idx === q.correctIndex;
            let cls =
              'bg-white border-sand hover:border-purple-500 hover:bg-purple-50/40 text-navy';
            if (isAnswered) {
              if (isRight) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              else if (isPicked) cls = 'bg-red-50 border-red-400 text-red-900';
              else cls = 'bg-ivory/60 border-sand/60 text-navy/50';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`p-3.5 rounded-xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span>{opt}</span>
                {isAnswered && isRight && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isPicked && !isRight && (
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
            className={`rounded-xl border-2 p-4 space-y-2 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-400 text-amber-950'
            }`}
          >
            <div className="font-black text-sm">
              {isCorrect ? 'Bug Caught! Great debugging.' : 'Good try — here is the actual bug:'}
            </div>
            <p className="text-sm leading-relaxed">{q.explanation}</p>
            <div className="text-xs font-bold pt-1">
              Output after fix:{' '}
              <code className="font-mono bg-white/80 px-2 py-0.5 rounded border border-sand">
                {q.expectedOutput}
              </code>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Corrected C++ Program
            </div>
            <NumberedCodeBlock code={q.fixedCode} accent="fixed" />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand/50">
        <button
          onClick={() => goTo((index - 1 + FIND_ERROR_QUESTIONS.length) % FIND_ERROR_QUESTIONS.length)}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={() => {
            setSelected(null);
            setSolvedMap({});
            setIndex(0);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Set
        </button>

        <button
          onClick={() => goTo((index + 1) % FIND_ERROR_QUESTIONS.length)}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Bug
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
