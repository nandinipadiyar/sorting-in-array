import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, CheckCircle2, ArrowLeft, ArrowRight, ArrowUpDown, Eye } from 'lucide-react';

function createScrambledArray(order = 'asc', size = 6) {
  const set = new Set();
  while (set.size < size) {
    set.add(Math.floor(Math.random() * 89) + 10);
  }
  const arr = Array.from(set);
  // Ensure it is not already sorted in the target order
  const sorted = [...arr].sort((a, b) => (order === 'asc' ? a - b : b - a));
  if (JSON.stringify(arr) === JSON.stringify(sorted)) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  }
  return arr.map((val, idx) => ({ id: `${Date.now()}-${idx}-${val}`, val }));
}

export function ArrangeArrayGame() {
  const [targetOrder, setTargetOrder] = useState('asc');
  const [items, setItems] = useState(() => createScrambledArray('asc', 6));
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [checkedResult, setCheckedResult] = useState(null); // null | { passed: boolean, correctPositions: boolean[] }

  const expectedValues = useMemo(() => {
    const vals = items.map((i) => i.val);
    return vals.sort((a, b) => (targetOrder === 'asc' ? a - b : b - a));
  }, [items, targetOrder]);

  const swapIndices = (i, j) => {
    if (i === j || i < 0 || j < 0 || i >= items.length || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    setMoves((m) => m + 1);
    setCheckedResult(null);
  };

  const handleTileClick = (idx) => {
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      swapIndices(selectedIdx, idx);
      setSelectedIdx(null);
    }
  };

  const handleCheck = () => {
    const correctPositions = items.map((item, idx) => item.val === expectedValues[idx]);
    const passed = correctPositions.every(Boolean);
    setCheckedResult({ passed, correctPositions });
  };

  const handleNewGame = (nextOrder = targetOrder) => {
    setTargetOrder(nextOrder);
    setItems(createScrambledArray(nextOrder, 6));
    setSelectedIdx(null);
    setMoves(0);
    setCheckedResult(null);
  };

  const handleReveal = () => {
    const sortedItems = [...items].sort((a, b) =>
      targetOrder === 'asc' ? a.val - b.val : b.val - a.val
    );
    setItems(sortedItems);
    setSelectedIdx(null);
    setCheckedResult({
      passed: true,
      correctPositions: sortedItems.map(() => true),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Mini-Game C · Interactive Sorting Practice
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">Arrange the Array</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-sand bg-ivory p-1">
            <button
              onClick={() => handleNewGame('asc')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                targetOrder === 'asc' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Ascending
            </button>
            <button
              onClick={() => handleNewGame('desc')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                targetOrder === 'desc' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Descending
            </button>
          </div>

          <button
            onClick={() => handleNewGame(targetOrder)}
            className="btn-secondary py-2 px-4 text-xs inline-flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" />
            New Random Array
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-bold text-navy">
          Goal: Arrange the array in{' '}
          <span className="text-purple-700 uppercase font-black">
            {targetOrder === 'asc' ? 'Ascending (Smallest → Largest)' : 'Descending (Largest → Smallest)'}
          </span>{' '}
          order. Click any two blocks to swap them!
        </span>
        <span className="font-mono font-bold text-xs px-3 py-1 rounded-full bg-white border border-blue-200 text-navy">
          Swaps made: {moves}
        </span>
      </div>

      {/* Interactive Array Blocks */}
      <div className="bg-ivory/60 rounded-xl border border-sand p-6 overflow-x-auto">
        <div className="flex justify-start sm:justify-center gap-4 min-w-max py-2">
          {items.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const checkState = checkedResult
              ? checkedResult.correctPositions[idx]
                ? 'correct'
                : 'wrong'
              : null;

            return (
              <div key={item.id} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-navy/50">idx {idx}</span>
                <motion.button
                  layout
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleTileClick(idx)}
                  className={`w-16 h-16 array-block cursor-pointer relative transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-700 -translate-y-2 shadow-lg'
                      : checkState === 'correct'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : checkState === 'wrong'
                      ? 'bg-amber-50 border-amber-500 text-amber-950'
                      : 'hover:border-blue-500'
                  }`}
                >
                  <span>{item.val}</span>
                </motion.button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      swapIndices(idx, idx - 1);
                      setSelectedIdx(null);
                    }}
                    disabled={idx === 0}
                    className="p-1 rounded border border-sand bg-white hover:bg-ivory disabled:opacity-30 cursor-pointer disabled:cursor-default"
                    title="Move Left"
                  >
                    <ArrowLeft className="w-3 h-3 text-navy" />
                  </button>
                  <button
                    onClick={() => {
                      swapIndices(idx, idx + 1);
                      setSelectedIdx(null);
                    }}
                    disabled={idx === items.length - 1}
                    className="p-1 rounded border border-sand bg-white hover:bg-ivory disabled:opacity-30 cursor-pointer disabled:cursor-default"
                    title="Move Right"
                  >
                    <ArrowRight className="w-3 h-3 text-navy" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCheck}
            className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Check Answer
          </button>
          <button
            onClick={handleReveal}
            className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Show Sorted Order
          </button>
        </div>

        {checkedResult && (
          <div
            className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold ${
              checkedResult.passed
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                : 'bg-amber-50 border-amber-400 text-amber-950'
            }`}
          >
            {checkedResult.passed
              ? `Perfect! Sorted in ${moves} swap${moves === 1 ? '' : 's'}.`
              : 'Not sorted yet — green blocks are in the right place, amber blocks need adjusting!'}
          </div>
        )}
      </div>
    </div>
  );
}
