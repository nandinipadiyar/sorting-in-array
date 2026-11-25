import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import { QUICK_QUIZ_QUESTIONS } from '../../data/playGamesData';

export function QuickQuizGame() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [id]: selectedIdx }

  const q = QUICK_QUIZ_QUESTIONS[index];
  const picked = answers[q.id] ?? null;
  const isAnswered = picked !== null;
  const isCorrect = picked === q.correctIndex;

  const answeredCount = Object.keys(answers).length;
  const correctCount = QUICK_QUIZ_QUESTIONS.filter(
    (item) => answers[item.id] === item.correctIndex
  ).length;

  const handleAnswer = (optIdx) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Mini-Game F · {q.category}
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">Quick Quiz</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            Question {index + 1} of {QUICK_QUIZ_QUESTIONS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            Correct: {correctCount} / {answeredCount || 0}
          </span>
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_QUIZ_QUESTIONS.map((item, idx) => {
          const ans = answers[item.id];
          let dotCls = 'bg-ivory border-sand text-navy/60';
          if (idx === index) dotCls = 'bg-navy border-navy text-white';
          else if (ans !== undefined) {
            dotCls =
              ans === item.correctIndex
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-red-100 border-red-300 text-red-900';
          }
          return (
            <button
              key={item.id}
              onClick={() => setIndex(idx)}
              className={`w-8 h-8 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${dotCls}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="bg-ivory/70 rounded-xl border border-sand p-5">
        <div className="flex items-start gap-2.5">
          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-base sm:text-lg font-bold text-navy leading-relaxed">{q.question}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const isRight = idx === q.correctIndex;
          let cls =
            'bg-white border-sand hover:border-blue-500 hover:bg-blue-50/40 text-navy';
          if (isAnswered) {
            if (isRight) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950';
            else if (isPicked) cls = 'bg-red-50 border-red-400 text-red-900';
            else cls = 'bg-ivory/60 border-sand/60 text-navy/50';
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${cls}`}
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

      {isAnswered && (
        <div
          className={`rounded-xl border-2 p-4 space-y-1.5 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}
        >
          <div className="font-black text-sm">
            {isCorrect ? 'Correct!' : 'Incorrect — Review Explanation:'}
          </div>
          <p className="text-sm leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answeredCount === QUICK_QUIZ_QUESTIONS.length && (
        <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-bold text-navy">
            Quiz Complete! You answered <strong>{correctCount}</strong> out of{' '}
            <strong>{QUICK_QUIZ_QUESTIONS.length}</strong> questions correctly.
          </div>
          <button
            onClick={() => {
              setAnswers({});
              setIndex(0);
            }}
            className="btn-primary py-2 px-4 text-xs"
          >
            Retake Quiz
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sand/50">
        <button
          onClick={() =>
            setIndex((index - 1 + QUICK_QUIZ_QUESTIONS.length) % QUICK_QUIZ_QUESTIONS.length)
          }
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={() => {
            setAnswers({});
            setIndex(0);
          }}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Quiz
        </button>

        <button
          onClick={() => setIndex((index + 1) % QUICK_QUIZ_QUESTIONS.length)}
          className="btn-primary py-2 px-5 text-sm inline-flex items-center gap-1.5"
        >
          Next Question
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
