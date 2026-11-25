import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Terminal,
} from 'lucide-react';
import { OUTPUT_CHALLENGE_QUESTIONS } from '../../data/playGamesData';

function normalizeOutput(str) {
  return str.trim().replace(/\s+/g, ' ');
}

export function OutputChallengeGame() {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solvedMap, setSolvedMap] = useState({});

  const q = OUTPUT_CHALLENGE_QUESTIONS[index];
  const isCorrect =
    submitted && normalizeOutput(userInput) === normalizeOutput(q.expectedOutput);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setSubmitted(true);
    const ok = normalizeOutput(userInput) === normalizeOutput(q.expectedOutput);
    setSolvedMap((prev) => ({ ...prev, [q.id]: ok }));
  };

  const goTo = (nextIdx) => {
    setIndex(nextIdx);
    setUserInput('');
    setSubmitted(false);
    setShowHint(false);
  };

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Mini-Game E · {q.topic}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">{q.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Challenge {index + 1} of {OUTPUT_CHALLENGE_QUESTIONS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            Solved: {solvedCount} / {OUTPUT_CHALLENGE_QUESTIONS.length}
          </span>
        </div>
      </div>

      <div className="bg-navy text-ivory rounded-xl border border-navy-light p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
        {q.code.split('\n').map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="text-ivory/35 select-none w-5 text-right shrink-0">{idx + 1}</span>
            <span className="whitespace-pre">{line || ' '}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-navy">
          <Terminal className="w-4 h-4 text-blue-600" />
          Calculate and type the exact console output:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="Type output (e.g. 10 20 30)"
            className="input-field py-2.5 font-mono text-sm flex-1"
          />
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="btn-primary py-2.5 px-6 text-sm whitespace-nowrap"
          >
            Check Output
          </button>
          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <HelpCircle className="w-4 h-4 text-purple-600" />
            {showHint ? 'Hide Hint' : 'Hint'}
          </button>
        </div>
      </form>

      {showHint && (
        <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 font-medium">
          <strong>Hint:</strong> {q.hint}
        </div>
      )}

      {submitted && (
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
                Exact Match! Output is{' '}
                <code className="font-mono bg-white/80 px-2 py-0.5 rounded border border-emerald-300">
                  {q.expectedOutput}
                </code>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-600" />
                Expected Output:{' '}
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
          onClick={() =>
            goTo((index - 1 + OUTPUT_CHALLENGE_QUESTIONS.length) % OUTPUT_CHALLENGE_QUESTIONS.length)
          }
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={() => goTo((index + 1) % OUTPUT_CHALLENGE_QUESTIONS.length)}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Challenge
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
