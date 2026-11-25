import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { generateSortingSteps } from '../../utils/sortingEngine';

const SPEED_OPTIONS = [
  { label: '0.25x', ms: 1400 },
  { label: '0.5x', ms: 900 },
  { label: '1x', ms: 550 },
  { label: '2x', ms: 280 },
  { label: '4x', ms: 130 },
];

function RadixDigitsDisplay({ val, exp, isHighlighted }) {
  if (!isHighlighted) return <span>{val}</span>;
  const str = String(Math.abs(val));
  const digitPosFromRight = Math.round(Math.log10(exp));
  const padded = str.padStart(digitPosFromRight + 1, '0');
  const targetIdx = padded.length - 1 - digitPosFromRight;

  return (
    <span className="inline-flex items-center">
      {padded.split('').map((ch, idx) => (
        <span
          key={idx}
          className={
            idx === targetIdx
              ? 'px-0.5 rounded bg-amber-400 text-navy font-black underline decoration-2'
              : 'opacity-75'
          }
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function SortingVisualizer({ algorithm }) {
  const [arrayInput, setArrayInput] = useState(algorithm.defaultArray.join(', '));
  const [activeArray, setActiveArray] = useState(algorithm.defaultArray);
  const [randomSize, setRandomSize] = useState(algorithm.defaultArray.length);
  const [order, setOrder] = useState('asc');
  const [speedIdx, setSpeedIdx] = useState(2); // 1x default
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputError, setInputError] = useState('');

  const timerRef = useRef(null);

  // Reset when switching algorithms
  useEffect(() => {
    setIsPlaying(false);
    setArrayInput(algorithm.defaultArray.join(', '));
    setActiveArray(algorithm.defaultArray);
    setRandomSize(algorithm.defaultArray.length);
    setStepIdx(0);
    setInputError('');
  }, [algorithm]);

  const steps = useMemo(
    () => generateSortingSteps(algorithm.id, activeArray, order),
    [algorithm.id, activeArray, order]
  );

  const currentStep = steps[Math.min(stepIdx, steps.length - 1)] || steps[0];
  const isAtEnd = stepIdx >= steps.length - 1;
  const hasStarted = stepIdx > 0;

  // Auto-playback effect
  useEffect(() => {
    if (!isPlaying) return;
    if (isAtEnd) {
      setIsPlaying(false);
      return;
    }
    const delay = SPEED_OPTIONS[speedIdx].ms;
    timerRef.current = setTimeout(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1));
    }, delay);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, stepIdx, speedIdx, isAtEnd, steps.length]);

  const validateAndApply = (arr) => {
    if (arr.length === 0) {
      setInputError('Please enter at least one valid integer (comma-separated).');
      return false;
    }
    if (arr.length > 14) {
      setInputError('Please enter up to 14 elements so the visualization stays clear.');
      return false;
    }
    if (algorithm.id === 'radix' && arr.some((n) => n < 0)) {
      setInputError(
        'Radix Sort only supports non-negative integers (>= 0). Please remove negative numbers.'
      );
      return false;
    }
    setInputError('');
    setIsPlaying(false);
    setActiveArray(arr);
    setArrayInput(arr.join(', '));
    setStepIdx(0);
    return true;
  };

  const handleApplyInput = () => {
    const tokens = arrayInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (tokens.length === 0 || tokens.some((t) => !/^-?\d+$/.test(t))) {
      setInputError('Enter valid whole numbers separated by commas (e.g. 42, 17, 8, 99, 23).');
      return;
    }
    const parsed = tokens.map((t) => parseInt(t, 10));
    validateAndApply(parsed);
  };

  const handleRandomArray = () => {
    const count = Math.max(4, Math.min(12, randomSize));
    const arr = Array.from({ length: count }, () =>
      algorithm.id === 'radix'
        ? Math.floor(Math.random() * 900) + 1
        : Math.floor(Math.random() * 95) + 5
    );
    validateAndApply(arr);
  };

  const handlePreset = (type) => {
    if (type === 'sample') {
      validateAndApply([...algorithm.defaultArray]);
    } else if (type === 'duplicates') {
      validateAndApply(
        algorithm.id === 'radix' ? [120, 45, 120, 9, 45, 300, 9] : [35, 12, 35, 8, 12, 50, 8]
      );
    } else if (type === 'sorted') {
      validateAndApply(
        algorithm.id === 'radix' ? [5, 18, 42, 105, 230, 410] : [10, 20, 30, 40, 50, 60]
      );
    } else if (type === 'reversed') {
      validateAndApply(
        algorithm.id === 'radix' ? [410, 230, 105, 42, 18, 5] : [60, 50, 40, 30, 20, 10]
      );
    }
  };

  const handleOrderChange = (newOrder) => {
    if (newOrder === order) return;
    setIsPlaying(false);
    setOrder(newOrder);
    setStepIdx(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
  };

  const maxAbsVal = Math.max(1, ...currentStep.items.map((x) => Math.abs(x.val)));

  // Group Merge Tree nodes by level for rendering
  const mergeTreeByLevel = useMemo(() => {
    if (!currentStep.mergeInfo?.treeNodes?.length) return [];
    const grouped = new Map();
    for (const node of currentStep.mergeInfo.treeNodes) {
      if (!grouped.has(node.level)) grouped.set(node.level, []);
      grouped.get(node.level).push(node);
    }
    return Array.from(grouped.entries()).sort((a, b) => a[0] - b[0]);
  }, [currentStep.mergeInfo]);

  return (
    <div className="space-y-6">
      {/* Controls Card */}
      <div className="card p-5 md:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          {/* Custom Array Input */}
          <div className="flex-1 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-navy/70">
              Custom Array Input {algorithm.id === 'radix' && '(Non-negative integers ≥ 0)'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyInput();
                }}
                placeholder="e.g. 64, 25, 12, 22, 11"
                className="input-field py-2.5 text-sm font-mono flex-1"
              />
              <button onClick={handleApplyInput} className="btn-primary py-2.5 text-sm whitespace-nowrap">
                Set Array
              </button>
            </div>
          </div>

          {/* Random Generator + Order Toggle */}
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-navy/70 mb-1.5">
                Random Size
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={randomSize}
                  onChange={(e) => setRandomSize(Number(e.target.value))}
                  className="input-field py-2.5 px-3 text-sm w-20"
                >
                  {[5, 6, 7, 8, 9, 10].map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleRandomArray}
                  className="btn-secondary py-2.5 px-4 text-sm flex items-center gap-2 whitespace-nowrap"
                >
                  <Shuffle className="w-4 h-4" />
                  Generate Random Array
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-navy/70 mb-1.5">
                Sort Order
              </label>
              <div className="inline-flex rounded-lg border border-sand bg-ivory p-1">
                <button
                  onClick={() => handleOrderChange('asc')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    order === 'asc'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Ascending
                </button>
                <button
                  onClick={() => handleOrderChange('desc')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    order === 'desc'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Descending
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Presets & Input Error */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-sand/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-navy/50 mr-1">
              Test Cases:
            </span>
            {[
              { id: 'sample', label: 'Default Sample' },
              { id: 'duplicates', label: 'With Duplicates' },
              { id: 'sorted', label: 'Already Sorted' },
              { id: 'reversed', label: 'Reverse Sorted' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handlePreset(p.id)}
                className="px-3 py-1 rounded-full text-xs font-bold border border-sand bg-ivory/70 hover:bg-sand-light text-navy transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-navy/60 font-medium">{algorithm.inputNote}</span>
        </div>

        {inputError && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{inputError}</span>
          </div>
        )}

        {/* Playback Controls + Speed */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-sand/50">
          <div className="flex flex-wrap items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={() => {
                  if (isAtEnd) setStepIdx(0);
                  setIsPlaying(true);
                }}
                className="btn-accent py-2.5 px-5 text-sm flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {hasStarted && !isAtEnd ? 'Resume' : isAtEnd ? 'Replay' : 'Start'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}

            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((p) => Math.max(0, p - 1));
              }}
              disabled={isPlaying || stepIdx === 0}
              className="btn-secondary py-2.5 px-3.5 text-sm flex items-center gap-1.5"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4" />
              Prev
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((p) => Math.min(steps.length - 1, p + 1));
              }}
              disabled={isPlaying || isAtEnd}
              className="btn-secondary py-2.5 px-3.5 text-sm flex items-center gap-1.5"
              title="Step-by-Step Next"
            >
              Step
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="btn-secondary py-2.5 px-4 text-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black uppercase tracking-wider text-navy/60">
              Speed:
            </span>
            <div className="inline-flex rounded-lg border border-sand bg-ivory p-1">
              {SPEED_OPTIONS.map((sp, idx) => (
                <button
                  key={sp.label}
                  onClick={() => setSpeedIdx(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                    speedIdx === idx
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-navy/70 hover:text-navy'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-3.5 text-center">
          <div className="text-[10px] font-black uppercase tracking-wider text-navy/50">
            Current Pass / Phase
          </div>
          <div className="text-sm sm:text-base font-black text-navy mt-1 truncate">
            {currentStep.passLabel}
          </div>
        </div>
        <div className="card p-3.5 text-center">
          <div className="text-[10px] font-black uppercase tracking-wider text-navy/50">
            Step Progress
          </div>
          <div className="text-sm sm:text-base font-mono font-black text-navy mt-1">
            {stepIdx} / {steps.length - 1}
          </div>
        </div>
        <div className="card p-3.5 text-center">
          <div className="text-[10px] font-black uppercase tracking-wider text-navy/50">
            {algorithm.id === 'radix' ? 'Comparisons (Non-Cmp)' : 'Comparisons'}
          </div>
          <div className="text-sm sm:text-base font-mono font-black text-amber-700 mt-1">
            {currentStep.comparisons}
          </div>
        </div>
        <div className="card p-3.5 text-center">
          <div className="text-[10px] font-black uppercase tracking-wider text-navy/50">
            {algorithm.id === 'radix'
              ? 'Bucket Moves'
              : algorithm.id === 'merge'
              ? 'Array Writes'
              : algorithm.id === 'insertion' || algorithm.id === 'shell'
              ? 'Shifts / Writes'
              : 'Swaps'}
          </div>
          <div className="text-sm sm:text-base font-mono font-black text-sage-dark mt-1">
            {currentStep.swaps}
          </div>
        </div>
      </div>

      {/* Visual Stage */}
      <div className="card p-5 md:p-6 space-y-5">
        {/* Stage Header & Color Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand pb-3">
          <h3 className="text-sm font-black text-navy uppercase tracking-wider">
            Interactive {algorithm.name} Visualization
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-200 border border-amber-500 inline-block" />
              Comparing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-orange-200 border border-orange-500 inline-block" />
              {algorithm.id === 'insertion' || algorithm.id === 'shell'
                ? 'Shifting / Placing'
                : algorithm.id === 'merge'
                ? 'Writing Merged'
                : 'Swapping / Moving'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sage border border-sage-dark inline-block" />
              Sorted
            </span>
            {algorithm.id === 'selection' && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-navy border border-navy inline-block" />
                Current {order === 'asc' ? 'Min' : 'Max'}
              </span>
            )}
            {algorithm.id === 'quick' && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-navy border border-navy inline-block" />
                Pivot
              </span>
            )}
          </div>
        </div>

        {/* Algorithm-Specific Top Banners */}
        {algorithm.id === 'insertion' && currentStep.keyInfo && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-ivory rounded-xl border border-sand px-4 py-3">
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-md bg-sage text-white">
                Sorted Region: [0..{Math.max(0, currentStep.keyInfo.sortedEnd)}]
              </span>
              {currentStep.keyInfo.sortedEnd < currentStep.items.length - 1 && (
                <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-navy/70">
                  Unsorted: [{currentStep.keyInfo.sortedEnd + 1}..{currentStep.items.length - 1}]
                </span>
              )}
            </div>
            {currentStep.keyInfo.val !== null && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-navy/60">
                  Active Key:
                </span>
                <span className="px-3 py-1 rounded-md bg-navy text-white font-mono font-bold text-sm shadow-sm">
                  {currentStep.keyInfo.val}
                </span>
              </div>
            )}
          </div>
        )}

        {algorithm.id === 'shell' && currentStep.shellInfo && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-ivory rounded-xl border border-sand px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-navy/60">
                Current Gap:
              </span>
              <span className="px-3 py-1 rounded-md bg-navy text-white font-mono font-black text-sm">
                gap = {currentStep.shellInfo.gap ?? '—'}
              </span>
              {currentStep.shellInfo.isFinalInsertion && (
                <span className="px-3 py-1 rounded-full bg-sage text-white text-xs font-black uppercase tracking-wider">
                  Final Insertion Sort Pass (gap = 1)
                </span>
              )}
            </div>
            {currentStep.shellInfo.gapHistory.length > 0 && (
              <div className="text-xs font-mono font-bold text-navy/70">
                Gap Sequence: {currentStep.shellInfo.gapHistory.join(' → ')}
              </div>
            )}
          </div>
        )}

        {algorithm.id === 'radix' && currentStep.radixInfo && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-ivory rounded-xl border border-sand px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-navy/60">
                Active Digit Place:
              </span>
              <span className="px-3 py-1 rounded-md bg-navy text-white font-mono font-bold text-sm">
                {currentStep.radixInfo.placeName} (÷ {currentStep.radixInfo.exp})
              </span>
            </div>
            <div className="text-xs font-bold text-navy/70">
              Phase:{' '}
              <span className="uppercase text-sage-dark">
                {currentStep.radixInfo.phase === 'distribute'
                  ? 'Distributing into Buckets 0–9'
                  : currentStep.radixInfo.phase === 'collect'
                  ? 'Collecting FIFO from Buckets'
                  : currentStep.radixInfo.phase === 'done'
                  ? 'All Digit Passes Complete'
                  : 'Preparing Digit Pass'}
              </span>
            </div>
          </div>
        )}

        {/* Main Array Bars + Blocks */}
        <div className="bg-ivory/60 rounded-xl border border-sand/40 p-4 sm:p-6 overflow-x-auto">
          <div className="flex items-end justify-start sm:justify-center gap-3 sm:gap-4 min-w-max pt-6 pb-4 px-2">
            {currentStep.items.map((item, idx) => {
              const isComparing = currentStep.comparing.includes(idx);
              const isSwapping = currentStep.swapping.includes(idx);
              const isSorted = currentStep.sorted.includes(idx);
              const isMinMax =
                algorithm.id === 'selection' && currentStep.minOrMaxIdx === idx;
              const isPivot =
                algorithm.id === 'quick' && currentStep.quickInfo?.pivotIdx === idx;
              const isQuickLeft =
                algorithm.id === 'quick' &&
                currentStep.quickInfo?.leftIndices?.includes(idx);
              const isQuickRight =
                algorithm.id === 'quick' &&
                currentStep.quickInfo?.rightIndices?.includes(idx);
              const isQuickInRange =
                algorithm.id !== 'quick' ||
                currentStep.quickInfo?.low === null ||
                (idx >= currentStep.quickInfo.low && idx <= currentStep.quickInfo.high) ||
                isSorted;
              const isMergeInRange =
                algorithm.id !== 'merge' ||
                !currentStep.mergeInfo?.activeRange ||
                (idx >= currentStep.mergeInfo.activeRange[0] &&
                  idx <= currentStep.mergeInfo.activeRange[1]) ||
                currentStep.isComplete;
              const isShellPair =
                algorithm.id === 'shell' &&
                currentStep.shellInfo?.gapPair?.includes(idx);
              const isInsertionHole =
                algorithm.id === 'insertion' &&
                currentStep.keyInfo?.holeIdx === idx &&
                !currentStep.isComplete;
              const isRadixActive =
                algorithm.id === 'radix' &&
                currentStep.radixInfo?.activeIdx === idx &&
                (currentStep.radixInfo?.phase === 'distribute' ||
                  currentStep.radixInfo?.phase === 'collect');

              // Determine block styling
              let blockClasses = 'bg-white border-sand-dark text-navy';
              let barColor = 'bg-sand-dark/60';
              if (isPivot || isMinMax) {
                blockClasses = 'bg-navy border-navy text-white -translate-y-2 shadow-lg';
                barColor = 'bg-navy';
              } else if (isSwapping) {
                blockClasses =
                  'bg-orange-100 border-orange-500 text-orange-950 -translate-y-2 shadow-md';
                barColor = 'bg-orange-500';
              } else if (isComparing || isShellPair) {
                blockClasses =
                  'bg-amber-100 border-amber-500 text-amber-950 -translate-y-1.5 shadow-md';
                barColor = 'bg-amber-500';
              } else if (isSorted) {
                blockClasses = 'array-block-selected';
                barColor = 'bg-sage';
              } else if (isQuickLeft) {
                blockClasses = 'bg-sage/20 border-sage text-navy';
                barColor = 'bg-sage/70';
              } else if (isQuickRight) {
                blockClasses = 'bg-sand-light border-navy/40 text-navy';
                barColor = 'bg-navy/50';
              }

              const barHeight = Math.max(
                18,
                Math.round((Math.abs(item.val) / maxAbsVal) * 88)
              );

              const dimmed =
                (algorithm.id === 'quick' &&
                  currentStep.quickInfo?.low !== null &&
                  !isQuickInRange) ||
                (algorithm.id === 'merge' &&
                  currentStep.mergeInfo?.activeRange &&
                  !isMergeInRange);

              // Badge text above bar
              let topBadge = null;
              if (isPivot) topBadge = { text: 'PIVOT', cls: 'bg-navy text-white' };
              else if (isMinMax)
                topBadge = {
                  text: order === 'asc' ? 'MIN' : 'MAX',
                  cls: 'bg-navy text-white',
                };
              else if (isInsertionHole)
                topBadge = { text: 'POS', cls: 'bg-amber-500 text-white' };
              else if (isShellPair)
                topBadge = {
                  text: `GAP ${currentStep.shellInfo.gap}`,
                  cls: 'bg-amber-600 text-white',
                };
              else if (isQuickLeft)
                topBadge = { text: 'L', cls: 'bg-sage text-white' };
              else if (isQuickRight)
                topBadge = { text: 'R', cls: 'bg-navy/70 text-white' };

              return (
                <motion.div
                  key={item.id}
                  layout
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className={`flex flex-col items-center gap-1.5 transition-opacity duration-300 ${
                    dimmed ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="h-5 flex items-center justify-center">
                    {topBadge && (
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${topBadge.cls}`}
                      >
                        {topBadge.text}
                      </span>
                    )}
                  </div>

                  {/* Proportional Height Bar */}
                  <div className="h-24 flex items-end justify-center">
                    <div
                      className={`w-7 sm:w-8 rounded-t-md transition-all duration-300 ${barColor}`}
                      style={{ height: `${barHeight}px` }}
                    />
                  </div>

                  {/* Array Tile */}
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 array-block relative text-base ${blockClasses}`}
                  >
                    {algorithm.id === 'radix' ? (
                      <RadixDigitsDisplay
                        val={item.val}
                        exp={currentStep.radixInfo?.exp || 1}
                        isHighlighted={
                          isRadixActive || currentStep.radixInfo?.phase === 'distribute'
                        }
                      />
                    ) : (
                      <span>{item.val}</span>
                    )}
                  </div>

                  {/* Index Label */}
                  <span className="text-[10px] font-mono font-bold text-navy/60">
                    [{idx}]
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Sort Special Panel: Left/Right Subarrays & Recursion Stack */}
        {algorithm.id === 'quick' && currentStep.quickInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-ivory/70 rounded-xl border border-sand p-4">
              <div className="text-[11px] font-black uppercase tracking-wider text-navy/60 mb-2">
                Current Partition Range & Subarrays
              </div>
              {currentStep.quickInfo.low !== null ? (
                <div className="space-y-1.5 text-xs font-mono">
                  <div>
                    Active Subarray:{' '}
                    <span className="font-bold text-navy">
                      [{currentStep.quickInfo.low}..{currentStep.quickInfo.high}]
                    </span>{' '}
                    | Pivot:{' '}
                    <span className="font-bold text-navy">
                      A[{currentStep.quickInfo.pivotIdx}] ={' '}
                      {currentStep.items[currentStep.quickInfo.pivotIdx]?.val}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2 py-1 rounded bg-sage/20 border border-sage text-navy font-bold">
                      Left ({order === 'asc' ? '≤' : '≥'} pivot): [
                      {currentStep.quickInfo.leftIndices
                        .map((k) => currentStep.items[k]?.val)
                        .join(', ') || 'empty'}
                      ]
                    </span>
                    <span className="px-2 py-1 rounded bg-sand-light border border-sand-dark text-navy font-bold">
                      Right ({order === 'asc' ? '>' : '<'} pivot): [
                      {currentStep.quickInfo.rightIndices
                        .map((k) => currentStep.items[k]?.val)
                        .join(', ') || 'empty'}
                      ]
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-navy/60">
                  Press Start or Step to begin partitioning around the pivot.
                </p>
              )}
            </div>

            <div className="bg-ivory/70 rounded-xl border border-sand p-4">
              <div className="text-[11px] font-black uppercase tracking-wider text-navy/60 mb-2">
                Recursive Call History
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {currentStep.quickInfo.callStack.length === 0 ? (
                  <span className="text-xs text-navy/60">No recursive calls yet.</span>
                ) : (
                  currentStep.quickInfo.callStack.map((frame) => (
                    <span
                      key={frame.id}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-bold border ${
                        frame.status === 'active'
                          ? 'bg-navy text-white border-navy'
                          : frame.status === 'done'
                          ? 'bg-sage/20 text-sage-dark border-sage'
                          : 'bg-white text-navy/70 border-sand'
                      }`}
                    >
                      QS({frame.low},{frame.high})
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Merge Sort Special Panel: Merge Buffers & Visual Division Tree */}
        {algorithm.id === 'merge' && currentStep.mergeInfo && (
          <div className="space-y-4">
            {(currentStep.mergeInfo.leftBuffer.length > 0 ||
              currentStep.mergeInfo.rightBuffer.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-ivory/70 rounded-xl border border-sand p-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-navy/60 mb-2">
                    Left Subarray Buffer
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.mergeInfo.leftBuffer.map((val, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded font-mono text-xs font-bold border ${
                          i < currentStep.mergeInfo.leftPtr
                            ? 'bg-sand/30 text-navy/40 border-sand line-through'
                            : i === currentStep.mergeInfo.leftPtr
                            ? 'bg-amber-100 text-amber-950 border-amber-500'
                            : 'bg-white text-navy border-sand'
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-navy/60 mb-2">
                    Right Subarray Buffer
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.mergeInfo.rightBuffer.map((val, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded font-mono text-xs font-bold border ${
                          i < currentStep.mergeInfo.rightPtr
                            ? 'bg-sand/30 text-navy/40 border-sand line-through'
                            : i === currentStep.mergeInfo.rightPtr
                            ? 'bg-amber-100 text-amber-950 border-amber-500'
                            : 'bg-white text-navy border-sand'
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Visual Division Tree */}
            <div className="bg-ivory/70 rounded-xl border border-sand p-4 overflow-x-auto">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-navy/60">
                  Visual Division & Merge Tree
                </span>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-white border border-sand">Pending</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-400">
                    Dividing / Merging
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sage text-white">Sorted</span>
                </div>
              </div>
              <div className="space-y-3 min-w-max">
                {mergeTreeByLevel.map(([level, nodes]) => (
                  <div key={level} className="flex items-center justify-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-navy/40 w-12">
                      Lvl {level}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {nodes.map((nd) => {
                        const cls =
                          nd.status === 'merged'
                            ? 'bg-sage text-white border-sage-dark'
                            : nd.status === 'merging' || nd.status === 'active'
                            ? 'bg-amber-100 text-amber-950 border-amber-500'
                            : nd.status === 'divided'
                            ? 'bg-navy/10 text-navy border-navy/30'
                            : 'bg-white text-navy/50 border-sand';
                        return (
                          <div
                            key={nd.id}
                            className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold transition-colors ${cls}`}
                          >
                            [{nd.values.join(', ')}]
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Radix Sort Special Panel: 10 Digit Buckets (0-9) */}
        {algorithm.id === 'radix' && currentStep.radixInfo && (
          <div className="bg-ivory/70 rounded-xl border border-sand p-4">
            <div className="text-[11px] font-black uppercase tracking-wider text-navy/60 mb-3">
              Digit Buckets (0 – 9) — {currentStep.radixInfo.placeName} Place
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {currentStep.radixInfo.buckets.map((bucket, digit) => {
                const isActiveBucket = currentStep.radixInfo.activeBucket === digit;
                return (
                  <div
                    key={digit}
                    className={`rounded-lg border p-2 min-h-[86px] flex flex-col transition-all ${
                      isActiveBucket
                        ? 'bg-amber-50 border-amber-500 shadow-sm'
                        : 'bg-white border-sand'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-mono font-black text-center pb-1 mb-1.5 border-b ${
                        isActiveBucket
                          ? 'text-amber-900 border-amber-300'
                          : 'text-navy/60 border-sand/50'
                      }`}
                    >
                      B[{digit}]
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                      {bucket.map((bItem) => (
                        <span
                          key={bItem.id}
                          className="px-2 py-0.5 rounded bg-navy text-white font-mono text-[11px] font-bold w-full text-center"
                        >
                          {bItem.val}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Explanation & Final Sorted Banner */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.stepNumber}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="bg-white border border-sand px-5 py-3.5 rounded-xl text-sm text-navy font-medium shadow-sm"
            >
              {currentStep.message}
            </motion.div>
          </AnimatePresence>

          {currentStep.isComplete && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border-2 border-sage bg-sage/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sage-dark shrink-0" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-sage-dark">
                    Final Sorted Array ({order === 'asc' ? 'Ascending' : 'Descending'})
                  </div>
                  <div className="font-mono font-black text-navy text-base mt-0.5">
                    [{currentStep.items.map((x) => x.val).join(', ')}]
                  </div>
                </div>
              </div>
              <button onClick={handleReset} className="btn-secondary py-2 px-4 text-xs">
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
