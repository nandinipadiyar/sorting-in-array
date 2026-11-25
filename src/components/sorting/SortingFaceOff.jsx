import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Shuffle,
  ArrowUpDown,
  Swords,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SORTING_ALGORITHMS, getAlgorithmById } from '../../data/sortingAlgorithmsData';
import { generateSortingSteps } from '../../utils/sortingEngine';

const SPEED_OPTIONS = [
  { label: '0.5x', ms: 850 },
  { label: '1x', ms: 480 },
  { label: '2x', ms: 240 },
  { label: '4x', ms: 110 },
];

function ArenaPanel({ title, algo, step, maxStepIndex, stepIndex, maxAbsVal }) {
  const isDone = step.isComplete;

  return (
    <div
      className={`card p-5 space-y-4 border-2 transition-colors ${
        isDone ? 'border-sage bg-sage/5' : 'border-sand'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
            {title}
          </span>
          <h4 className="text-lg font-black text-navy">{algo.name}</h4>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            isDone
              ? 'bg-sage text-white'
              : 'bg-ivory border border-sand text-navy/80'
          }`}
        >
          {isDone ? `Finished (${maxStepIndex} steps)` : step.passLabel}
        </span>
      </div>

      {/* Live Bars + Blocks */}
      <div className="bg-ivory/70 rounded-xl border border-sand/50 p-4 overflow-x-auto">
        <div className="flex items-end justify-start sm:justify-center gap-2.5 min-w-max pt-2 pb-1">
          {step.items.map((item, idx) => {
            const isComparing = step.comparing.includes(idx);
            const isSwapping = step.swapping.includes(idx);
            const isSorted = step.sorted.includes(idx);
            const isPivot = algo.id === 'quick' && step.quickInfo?.pivotIdx === idx;
            const isMin = algo.id === 'selection' && step.minOrMaxIdx === idx;

            let blockCls = 'bg-white border-sand-dark text-navy';
            let barCls = 'bg-sand-dark/60';
            if (isPivot || isMin) {
              blockCls = 'bg-navy border-navy text-white -translate-y-1.5';
              barCls = 'bg-navy';
            } else if (isSwapping) {
              blockCls = 'bg-orange-100 border-orange-500 text-orange-950 -translate-y-1.5';
              barCls = 'bg-orange-500';
            } else if (isComparing) {
              blockCls = 'bg-amber-100 border-amber-500 text-amber-950 -translate-y-1';
              barCls = 'bg-amber-500';
            } else if (isSorted) {
              blockCls = 'array-block-selected';
              barCls = 'bg-sage';
            }

            const barH = Math.max(14, Math.round((Math.abs(item.val) / maxAbsVal) * 72));

            return (
              <motion.div
                key={item.id}
                layout
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="h-20 flex items-end">
                  <div
                    className={`w-6 rounded-t transition-all duration-200 ${barCls}`}
                    style={{ height: `${barH}px` }}
                  />
                </div>
                <div
                  className={`w-10 h-10 rounded-lg border font-mono text-xs font-bold flex items-center justify-center transition-all ${blockCls}`}
                >
                  {item.val}
                </div>
                <span className="text-[9px] font-mono text-navy/50">[{idx}]</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-ivory rounded-lg border border-sand/60 p-2.5">
          <div className="text-[10px] font-black uppercase text-navy/50">Comparisons</div>
          <div className="text-base font-mono font-black text-amber-700 mt-0.5">
            {step.comparisons}
          </div>
        </div>
        <div className="bg-ivory rounded-lg border border-sand/60 p-2.5">
          <div className="text-[10px] font-black uppercase text-navy/50">Swaps / Moves</div>
          <div className="text-base font-mono font-black text-blue-700 mt-0.5">
            {step.swaps}
          </div>
        </div>
        <div className="bg-ivory rounded-lg border border-sand/60 p-2.5">
          <div className="text-[10px] font-black uppercase text-navy/50">Steps</div>
          <div className="text-base font-mono font-black text-navy mt-0.5">
            {Math.min(stepIndex, maxStepIndex)} / {maxStepIndex}
          </div>
        </div>
      </div>

      <div className="bg-white border border-sand rounded-lg px-3.5 py-2.5 text-xs font-medium text-navy/85 min-h-[44px] flex items-center">
        {step.message}
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] font-mono">
        <span className="px-2 py-1 rounded bg-ivory border border-sand">
          Best: <strong>{algo.complexity.best}</strong>
        </span>
        <span className="px-2 py-1 rounded bg-ivory border border-sand">
          Avg: <strong>{algo.complexity.average}</strong>
        </span>
        <span className="px-2 py-1 rounded bg-ivory border border-sand">
          Worst: <strong>{algo.complexity.worst}</strong>
        </span>
        <span className="px-2 py-1 rounded bg-ivory border border-sand">
          Space: <strong>{algo.complexity.space}</strong>
        </span>
      </div>
    </div>
  );
}

export function SortingFaceOff() {
  const [algoAId, setAlgoAId] = useState('bubble');
  const [algoBId, setAlgoBId] = useState('quick');
  const [inputStr, setInputStr] = useState('42, 17, 8, 99, 23, 56, 12');
  const [sharedArray, setSharedArray] = useState([42, 17, 8, 99, 23, 56, 12]);
  const [order, setOrder] = useState('asc');
  const [speedIdx, setSpeedIdx] = useState(1);
  const [tick, setTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timerRef = useRef(null);

  const algoA = getAlgorithmById(algoAId);
  const algoB = getAlgorithmById(algoBId);

  const stepsA = useMemo(
    () => generateSortingSteps(algoAId, sharedArray, order),
    [algoAId, sharedArray, order]
  );
  const stepsB = useMemo(
    () => generateSortingSteps(algoBId, sharedArray, order),
    [algoBId, sharedArray, order]
  );

  const maxTicks = Math.max(stepsA.length - 1, stepsB.length - 1);
  const stepA = stepsA[Math.min(tick, stepsA.length - 1)] || stepsA[0];
  const stepB = stepsB[Math.min(tick, stepsB.length - 1)] || stepsB[0];
  const bothComplete = tick >= maxTicks;

  useEffect(() => {
    if (!isPlaying) return;
    if (bothComplete) {
      setIsPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      setTick((t) => Math.min(t + 1, maxTicks));
    }, SPEED_OPTIONS[speedIdx].ms);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, tick, speedIdx, bothComplete, maxTicks]);

  const applyArray = (arr, nextA = algoAId, nextB = algoBId) => {
    if (arr.length === 0 || arr.length > 10) {
      setErrorMsg('Please enter between 1 and 10 integers for side-by-side comparison.');
      return;
    }
    if ((nextA === 'radix' || nextB === 'radix') && arr.some((n) => n < 0)) {
      setErrorMsg('Radix Sort requires non-negative integers (>= 0).');
      return;
    }
    setErrorMsg('');
    setIsPlaying(false);
    setSharedArray(arr);
    setInputStr(arr.join(', '));
    setTick(0);
  };

  const handleApplyInput = () => {
    const tokens = inputStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (tokens.length === 0 || tokens.some((t) => !/^-?\d+$/.test(t))) {
      setErrorMsg('Enter valid comma-separated integers (e.g. 42, 17, 8, 99, 23).');
      return;
    }
    applyArray(tokens.map((t) => parseInt(t, 10)));
  };

  const handleRandom = () => {
    const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 95) + 5);
    applyArray(arr);
  };

  const handleSelectAlgo = (side, nextId) => {
    setIsPlaying(false);
    setTick(0);
    if (nextId === 'radix' && sharedArray.some((n) => n < 0)) {
      const cleaned = sharedArray.map((n) => Math.abs(n));
      setSharedArray(cleaned);
      setInputStr(cleaned.join(', '));
      setErrorMsg('Converted negative values to non-negative for Radix Sort compatibility.');
    } else {
      setErrorMsg('');
    }
    if (side === 'A') setAlgoAId(nextId);
    else setAlgoBId(nextId);
  };

  const maxAbsVal = Math.max(1, ...sharedArray.map((n) => Math.abs(n)));
  const finalA = stepsA[stepsA.length - 1];
  const finalB = stepsB[stepsB.length - 1];

  return (
    <div className="space-y-6">
      {/* Arena Header & Controls */}
      <div className="card p-5 md:p-6 bg-gradient-to-br from-white via-blue-50/30 to-violet-50/40 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-700">
              <Swords className="w-4 h-4 text-violet-600" />
              Side-by-Side Dual Execution Arena
            </div>
            <h3 className="text-2xl font-black text-navy mt-0.5">Algorithm Face-Off</h3>
            <p className="text-sm text-navy/70">
              Run any two sorting algorithms simultaneously on the exact same input array and compare
              real comparisons, swaps, execution steps, and complexity.
            </p>
          </div>
        </div>

        {/* Selectors + Shared Array Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-3">
            <label className="block text-xs font-black uppercase tracking-wider text-blue-700 mb-1.5">
              Algorithm A
            </label>
            <select
              value={algoAId}
              onChange={(e) => handleSelectAlgo('A', e.target.value)}
              className="input-field py-2.5 text-sm font-bold"
            >
              {SORTING_ALGORITHMS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.number}. {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs font-black uppercase tracking-wider text-violet-700 mb-1.5">
              Algorithm B
            </label>
            <select
              value={algoBId}
              onChange={(e) => handleSelectAlgo('B', e.target.value)}
              className="input-field py-2.5 text-sm font-bold"
            >
              {SORTING_ALGORITHMS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.number}. {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-6">
            <label className="block text-xs font-black uppercase tracking-wider text-navy/70 mb-1.5">
              Shared Input Array (up to 10 integers)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyInput()}
                className="input-field py-2.5 text-sm font-mono flex-1"
                placeholder="e.g. 42, 17, 8, 99, 23"
              />
              <button onClick={handleApplyInput} className="btn-primary py-2.5 px-4 text-sm">
                Apply
              </button>
              <button
                onClick={handleRandom}
                className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center justify-center gap-1.5"
              >
                <Shuffle className="w-4 h-4" />
                Random
              </button>
            </div>
          </div>
        </div>

        {/* Presets & Playback Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-sand/60">
          <div className="flex flex-wrap items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={() => {
                  if (bothComplete) setTick(0);
                  setIsPlaying(true);
                }}
                className="btn-gradient py-2.5 px-5 text-sm inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {tick > 0 && !bothComplete ? 'Resume Face-Off' : bothComplete ? 'Replay' : 'Start Face-Off'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="btn-primary py-2.5 px-5 text-sm inline-flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}

            <button
              onClick={() => {
                setIsPlaying(false);
                setTick((t) => Math.min(t + 1, maxTicks));
              }}
              disabled={isPlaying || bothComplete}
              className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center gap-1.5"
            >
              <SkipForward className="w-4 h-4" />
              Step
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setTick(0);
              }}
              className="btn-secondary py-2.5 px-4 text-sm inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-sand bg-ivory p-1">
              {['asc', 'desc'].map((ord) => (
                <button
                  key={ord}
                  onClick={() => {
                    setIsPlaying(false);
                    setOrder(ord);
                    setTick(0);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                    order === ord ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  <ArrowUpDown className="w-3 h-3" />
                  {ord === 'asc' ? 'Asc' : 'Desc'}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-lg border border-sand bg-ivory p-1">
              {SPEED_OPTIONS.map((sp, idx) => (
                <button
                  key={sp.label}
                  onClick={() => setSpeedIdx(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                    speedIdx === idx ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Test Array Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-black uppercase tracking-wider text-navy/50">Presets:</span>
          {[
            { label: 'Default', arr: [42, 17, 8, 99, 23, 56, 12] },
            { label: 'Nearly Sorted', arr: [10, 20, 35, 30, 40, 50, 60] },
            { label: 'Reversed', arr: [70, 60, 50, 40, 30, 20, 10] },
            { label: 'Duplicates', arr: [30, 12, 30, 8, 12, 45, 8] },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyArray(preset.arr)}
              className="px-3 py-1 rounded-full bg-white border border-sand hover:border-blue-400 font-bold text-navy cursor-pointer transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Side-by-Side Execution Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArenaPanel
          title="Contender A"
          algo={algoA}
          step={stepA}
          stepIndex={tick}
          maxStepIndex={stepsA.length - 1}
          maxAbsVal={maxAbsVal}
        />
        <ArenaPanel
          title="Contender B"
          algo={algoB}
          step={stepB}
          stepIndex={tick}
          maxStepIndex={stepsB.length - 1}
          maxAbsVal={maxAbsVal}
        />
      </div>

      {/* Direct Comparison Summary */}
      <div className="card p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-sand pb-3">
          <h4 className="text-sm font-black uppercase tracking-wider text-navy">
            Live Side-by-Side Metrics
          </h4>
          {bothComplete && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-dark">
              <CheckCircle2 className="w-4 h-4" />
              Both Runs Complete
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[560px] text-sm">
            <thead>
              <tr className="bg-ivory border-b border-sand text-[11px] font-black uppercase tracking-wider text-navy/60">
                <th className="py-2.5 px-4">Metric</th>
                <th className="py-2.5 px-4 text-blue-700">{algoA.name}</th>
                <th className="py-2.5 px-4 text-violet-700">{algoB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50 font-mono">
              <tr>
                <td className="py-2.5 px-4 font-sans font-bold text-navy">Comparisons</td>
                <td className="py-2.5 px-4 font-bold">{stepA.comparisons}</td>
                <td className="py-2.5 px-4 font-bold">{stepB.comparisons}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-sans font-bold text-navy">Swaps / Moves</td>
                <td className="py-2.5 px-4 font-bold">{stepA.swaps}</td>
                <td className="py-2.5 px-4 font-bold">{stepB.swaps}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-sans font-bold text-navy">Total Execution Steps</td>
                <td className="py-2.5 px-4 font-bold">{stepsA.length - 1}</td>
                <td className="py-2.5 px-4 font-bold">{stepsB.length - 1}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-sans font-bold text-navy">
                  Time Complexity (Best / Avg / Worst)
                </td>
                <td className="py-2.5 px-4 text-xs">
                  {algoA.complexity.best} / {algoA.complexity.average} / {algoA.complexity.worst}
                </td>
                <td className="py-2.5 px-4 text-xs">
                  {algoB.complexity.best} / {algoB.complexity.average} / {algoB.complexity.worst}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {bothComplete && (
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 p-4 text-sm text-navy leading-relaxed">
            <strong>Arena Observation:</strong> On this {sharedArray.length}-element array,{' '}
            <strong>{algoA.name}</strong> finished in <strong>{stepsA.length - 1}</strong> steps (
            {finalA.comparisons} comparisons, {finalA.swaps} moves), while{' '}
            <strong>{algoB.name}</strong> finished in <strong>{stepsB.length - 1}</strong> steps (
            {finalB.comparisons} comparisons, {finalB.swaps} moves).
          </div>
        )}
      </div>
    </div>
  );
}
