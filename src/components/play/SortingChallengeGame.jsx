import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Shuffle,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { SORTING_ALGORITHMS, getAlgorithmById } from '../../data/sortingAlgorithmsData';
import { generateSortingSteps } from '../../utils/sortingEngine';

function createChallenge(prevAlgoId = null) {
  const pool = SORTING_ALGORITHMS.map((a) => a.id).filter((id) => id !== prevAlgoId);
  const algoId = pool[Math.floor(Math.random() * pool.length)];
  const set = new Set();
  while (set.size < 6) {
    set.add(algoId === 'radix' ? Math.floor(Math.random() * 880) + 12 : Math.floor(Math.random() * 85) + 10);
  }
  const arr = Array.from(set);
  // Ensure array isn't already sorted
  const sorted = [...arr].sort((a, b) => a - b);
  if (JSON.stringify(arr) === JSON.stringify(sorted)) {
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
  }
  return { algoId, arr };
}

function getMysteryClue(algoId, step) {
  if (!step) return '';
  if (algoId === 'selection') {
    return step.minOrMaxIdx !== null
      ? `Scanning for the minimum element (currently idx ${step.minOrMaxIdx}: ${step.items[step.minOrMaxIdx]?.val}) to place at the front.`
      : 'Locking the selected minimum element into the sorted left prefix.';
  }
  if (algoId === 'bubble') {
    return step.comparing.length === 2
      ? `Comparing adjacent neighbors idx ${step.comparing[0]} and idx ${step.comparing[1]} and bubbling larger values right.`
      : 'Adjacent swaps complete for this pass — largest value settled at the right.';
  }
  if (algoId === 'insertion') {
    return step.keyInfo?.val !== null
      ? `Picking key = ${step.keyInfo.val} and shifting larger sorted elements right to insert it.`
      : 'Sorted left section grows one element at a time.';
  }
  if (algoId === 'quick') {
    return step.quickInfo?.pivotIdx !== null
      ? `Partitioning subarray around PIVOT = ${step.items[step.quickInfo.pivotIdx]?.val} into Left (≤) and Right (>) regions.`
      : 'Recursively partitioning subarrays around chosen pivots.';
  }
  if (algoId === 'merge') {
    return step.mergeInfo?.leftBuffer?.length
      ? `Merging two sorted halves [${step.mergeInfo.leftBuffer.join(', ')}] and [${step.mergeInfo.rightBuffer.join(', ')}].`
      : 'Splitting the array into smaller halves before merging sorted results.';
  }
  if (algoId === 'shell') {
    return step.shellInfo?.gap
      ? `Comparing and shifting elements separated by gap = ${step.shellInfo.gap}.`
      : 'Shrinking the comparison gap down toward 1.';
  }
  if (algoId === 'radix') {
    return `Distributing elements into 0–9 buckets by the ${step.radixInfo?.placeName || 'current'} digit, then collecting in order.`;
  }
  return '';
}

export function SortingChallengeGame() {
  const [challenge, setChallenge] = useState(() => createChallenge());
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [guessId, setGuessId] = useState(null);
  const timerRef = useRef(null);

  const steps = useMemo(
    () => generateSortingSteps(challenge.algoId, challenge.arr, 'asc'),
    [challenge]
  );

  const currentStep = steps[Math.min(stepIdx, steps.length - 1)] || steps[0];
  const isAtEnd = stepIdx >= steps.length - 1;
  const algoMeta = getAlgorithmById(challenge.algoId);

  useEffect(() => {
    if (!isPlaying) return;
    if (isAtEnd) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1));
    }, 650);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, stepIdx, isAtEnd, steps.length]);

  const handleNewChallenge = () => {
    setChallenge((prev) => createChallenge(prev.algoId));
    setStepIdx(0);
    setGuessId(null);
    setIsPlaying(true);
  };

  const isAnswered = guessId !== null;
  const isCorrect = guessId === challenge.algoId;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Mini-Game D · Mystery Algorithm Detective
          </span>
          <h3 className="text-xl font-black text-navy mt-0.5">Sorting Challenge</h3>
        </div>

        <button
          onClick={handleNewChallenge}
          className="btn-secondary py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <Shuffle className="w-3.5 h-3.5" />
          New Mystery Array
        </button>
      </div>

      {/* Mystery Playback Stage */}
      <div className="bg-ivory/70 rounded-xl border border-sand p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (isAtEnd) setStepIdx(0);
                setIsPlaying((p) => !p);
              }}
              className="btn-primary py-2 px-4 text-xs inline-flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play'}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((p) => Math.min(steps.length - 1, p + 1));
              }}
              disabled={isPlaying || isAtEnd}
              className="btn-secondary py-2 px-3 text-xs inline-flex items-center gap-1"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Step
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(0);
              }}
              className="btn-secondary py-2 px-3 text-xs inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="text-xs font-mono font-bold text-navy/70">
            Step {stepIdx} / {steps.length - 1} · Comparisons: {currentStep.comparisons} · Moves:{' '}
            {currentStep.swaps}
          </div>
        </div>

        {/* Visual Cues without spoiling name */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {challenge.algoId === 'shell' && currentStep.shellInfo?.gap > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-navy text-white font-mono font-bold">
              Active Gap: {currentStep.shellInfo.gap}
            </span>
          )}
          {challenge.algoId === 'insertion' && currentStep.keyInfo?.val !== null && (
            <span className="px-2.5 py-1 rounded-md bg-navy text-white font-mono font-bold">
              Active Key: {currentStep.keyInfo.val}
            </span>
          )}
          {challenge.algoId === 'radix' && currentStep.radixInfo && (
            <span className="px-2.5 py-1 rounded-md bg-navy text-white font-mono font-bold">
              Digit Place: {currentStep.radixInfo.placeName}
            </span>
          )}
          {challenge.algoId === 'merge' && currentStep.mergeInfo?.leftBuffer?.length > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-purple-100 border border-purple-300 text-purple-900 font-mono font-bold">
              Merging [{currentStep.mergeInfo.leftBuffer.join(', ')}] + [
              {currentStep.mergeInfo.rightBuffer.join(', ')}]
            </span>
          )}
        </div>

        {/* Array Blocks */}
        <div className="flex justify-start sm:justify-center gap-3 overflow-x-auto py-3 px-2">
          {currentStep.items.map((item, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);
            const isPivot =
              challenge.algoId === 'quick' && currentStep.quickInfo?.pivotIdx === idx;
            const isMin =
              challenge.algoId === 'selection' && currentStep.minOrMaxIdx === idx;

            let cls = 'bg-white border-sand-dark text-navy';
            if (isPivot || isMin) cls = 'bg-navy border-navy text-white -translate-y-2';
            else if (isSwapping) cls = 'bg-orange-100 border-orange-500 text-orange-950 -translate-y-2';
            else if (isComparing) cls = 'bg-amber-100 border-amber-500 text-amber-950 -translate-y-1';
            else if (isSorted) cls = 'array-block-selected';

            return (
              <motion.div
                key={item.id}
                layout
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="h-4 text-[9px] font-black uppercase">
                  {isPivot && <span className="px-1.5 py-0.5 rounded bg-navy text-white">PIVOT</span>}
                  {isMin && <span className="px-1.5 py-0.5 rounded bg-navy text-white">MIN</span>}
                </div>
                <div className={`w-14 h-14 array-block text-base ${cls}`}>{item.val}</div>
                <span className="text-[10px] font-mono text-navy/50">[{idx}]</span>
              </motion.div>
            );
          })}
        </div>

        {/* Mini Bucket Preview for Radix Mystery */}
        {challenge.algoId === 'radix' && currentStep.radixInfo && (
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-2">
            {currentStep.radixInfo.buckets.map((bucket, d) => (
              <div
                key={d}
                className="rounded border border-sand bg-white p-1.5 text-center min-h-[54px]"
              >
                <div className="text-[9px] font-mono font-bold text-navy/60 border-b border-sand/50 pb-0.5 mb-1">
                  B[{d}]
                </div>
                <div className="flex flex-col gap-0.5">
                  {bucket.map((b) => (
                    <span
                      key={b.id}
                      className="text-[10px] font-mono font-bold bg-navy text-white rounded px-1"
                    >
                      {b.val}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white border border-sand rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium text-navy">
          <strong className="text-blue-700">Live Observation:</strong>{' '}
          {getMysteryClue(challenge.algoId, currentStep)}
        </div>
      </div>

      {/* 7 Algorithm Choices */}
      <div className="space-y-3">
        <div className="text-sm font-bold text-navy flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          Which sorting algorithm is being demonstrated above?
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {SORTING_ALGORITHMS.map((algo) => {
            const isPicked = guessId === algo.id;
            const isRight = algo.id === challenge.algoId;
            let cls =
              'bg-white border-sand hover:border-blue-500 hover:bg-blue-50/40 text-navy';
            if (isAnswered) {
              if (isRight) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              else if (isPicked) cls = 'bg-red-50 border-red-400 text-red-900';
              else cls = 'bg-ivory/60 border-sand/60 text-navy/50';
            }

            return (
              <button
                key={algo.id}
                onClick={() => !isAnswered && setGuessId(algo.id)}
                disabled={isAnswered}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span>{algo.name}</span>
                {isAnswered && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {isAnswered && isPicked && !isRight && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
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
          <div className="font-black text-sm">
            {isCorrect
              ? `Correct! This is ${algoMeta.name}.`
              : `Not quite — this animation shows ${algoMeta.name}.`}
          </div>
          <p className="text-sm leading-relaxed">{algoMeta.introduction.summary}</p>
        </div>
      )}
    </div>
  );
}
