import { useState } from 'react';
import {
  Terminal,
  Bug,
  ArrowUpDown,
  Sparkles,
  Calculator,
  Zap,
  ArrowLeft,
  Gamepad2,
} from 'lucide-react';
import { GuessOutputGame } from './GuessOutputGame';
import { FindErrorGame } from './FindErrorGame';
import { ArrangeArrayGame } from './ArrangeArrayGame';
import { SortingChallengeGame } from './SortingChallengeGame';
import { OutputChallengeGame } from './OutputChallengeGame';
import { QuickQuizGame } from './QuickQuizGame';

const MINI_GAMES = [
  {
    id: 'guess-output',
    letter: 'A',
    title: 'Guess the Output',
    desc: 'Read a C++ array or sorting program and predict its exact output from multiple choices.',
    icon: Terminal,
    accent: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'find-error',
    letter: 'B',
    title: 'Find the Error',
    desc: 'Spot logical or syntax bugs in C++ code and inspect the corrected working program.',
    icon: Bug,
    accent: 'from-purple-500 to-violet-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'arrange-array',
    letter: 'C',
    title: 'Arrange the Array',
    desc: 'Swap scrambled array blocks into ascending or descending order and verify your solution.',
    icon: ArrowUpDown,
    accent: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'sorting-challenge',
    letter: 'D',
    title: 'Sorting Challenge',
    desc: 'Watch a live sorting animation on a random array and identify which algorithm is running.',
    icon: Sparkles,
    accent: 'from-indigo-500 to-purple-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'output-challenge',
    letter: 'E',
    title: 'Output Challenge',
    desc: 'Trace C++ searching and sorting snippets by hand and type the calculated console output.',
    icon: Calculator,
    accent: 'from-blue-600 to-cyan-600',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  {
    id: 'quick-quiz',
    letter: 'F',
    title: 'Quick Quiz',
    desc: 'Test your knowledge of array operations, searching, sorting stability, and time complexity.',
    icon: Zap,
    accent: 'from-fuchsia-500 to-purple-600',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
  },
];

export function PlayAndLearnPage() {
  const [activeGameId, setActiveGameId] = useState(null);

  if (activeGameId) {
    return (
      <div className="space-y-6">
        <div className="card p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <button
            onClick={() => setActiveGameId(null)}
            className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            All Mini-Games
          </button>

          <div className="flex flex-wrap gap-2">
            {MINI_GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGameId(game.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  game.id === activeGameId
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-sm'
                    : 'bg-ivory/70 text-navy border-sand hover:border-blue-400'
                }`}
              >
                {game.letter}. {game.title}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-6 md:p-8">
          {activeGameId === 'guess-output' && <GuessOutputGame />}
          {activeGameId === 'find-error' && <FindErrorGame />}
          {activeGameId === 'arrange-array' && <ArrangeArrayGame />}
          {activeGameId === 'sorting-challenge' && <SortingChallengeGame />}
          {activeGameId === 'output-challenge' && <OutputChallengeGame />}
          {activeGameId === 'quick-quiz' && <QuickQuizGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card p-6 md:p-8 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/50 border-blue-200/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-300/60 text-blue-800 text-xs font-black uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
              Interactive Coding Playground
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Play &amp; Learn
            </h2>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              Practice reading C++ code, catching bugs, arranging arrays, and recognizing sorting
              algorithms through 6 focused mini-games with instant explanations.
            </p>
          </div>
          <button
            onClick={() => setActiveGameId('guess-output')}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            Start Playing →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MINI_GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              onClick={() => setActiveGameId(game.id)}
              className="card p-6 flex flex-col h-full cursor-pointer group hover:-translate-y-1.5 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${game.accent} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-full border ${game.badgeBg}`}
                >
                  Game {game.letter}
                </span>
              </div>

              <h3 className="text-lg font-black text-navy mb-2 group-hover:text-blue-700 transition-colors">
                {game.title}
              </h3>

              <p className="text-navy/70 text-sm mb-6 flex-1 leading-relaxed">{game.desc}</p>

              <div className="text-sm font-bold text-blue-600 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                Play Mini-Game{' '}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
