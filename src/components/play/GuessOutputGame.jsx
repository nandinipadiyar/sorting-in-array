import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, RotateCcw, Terminal } from 'lucide-react';
import { GUESS_OUTPUT_QUESTIONS } from '../../data/playGamesData';

function NumberedCode({ code }) {
  const lines = code.split('\n');
  return (
    <div className="bg-navy text-ivory rounded-xl border border-navy-light p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => (
        <div key={idx} className="flex gap-4">
          <span className="text-ivory/35 select-none w-5 text-right shrink-0">{idx + 1}</span>
          <span className="whitespace-pre">{line || ' '}</span>
        </div>
      ))}
    </div>
  );
}

export function GuessOutputGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [solvedMap, setSolvedMap] = useState({});

  const q = GUESS_OUTPUT_QUESTIONS[index];
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

  const correctCount = Object.values(solvedMap).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Mini-Game A · {q.topic}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{q.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Question {index + 1} of {GUESS_OUTPUT_QUESTIONS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            Solved: {correctCount} / {GUESS_OUTPUT_QUESTIONS.length}
          </span>
        </div>
      </div>

      <NumberedCode code={q.code} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-navy">
          <Terminal className="w-4 h-4 text-purple-600" />
          What will this C++ program print?
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt, idx) => {
            const isPicked = selected === idx;
            const isRightOption = idx === q.correctIndex;
            let btnClass =
              'bg-white border-sand hover:border-blue-500 hover:bg-blue-50/40 text-navy';

            if (isAnswered) {
              if (isRightOption) {
                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              } else if (isPicked) {
                btnClass = 'bg-red-50 border-red-400 text-red-900';
              } else {
                btnClass = 'bg-ivory/60 border-sand/60 text-navy/50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border-2 text-left font-mono text-sm font-bold transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswered && isRightOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isPicked && !isRightOption && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div
          className={`rounded-xl border-2 p-4 space-y-2 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Spot on! Correct Output:{' '}
                <code className="font-mono bg-white/80 px-2 py-0.5 rounded border border-emerald-300">
                  {q.expectedOutput}
                </code>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                Not quite. Correct Output:{' '}
                <code className="font-mono bg-white/80 px-2 py-0.5 rounded border border-amber-300">
                  {q.expectedOutput}
                </code>
              </>
            )}
          </div>
          <p className="text-sm leading-relaxed">{q.explanation}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand/50">
        <button
          onClick={() => goTo((index - 1 + GUESS_OUTPUT_QUESTIONS.length) % GUESS_OUTPUT_QUESTIONS.length)}
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
          onClick={() => goTo((index + 1) % GUESS_OUTPUT_QUESTIONS.length)}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Question
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
