import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodePointer } from '../CodePointer';

export function AddressCalc({ globalArray = [] }) {
  const [mode, setMode] = useState('1D');
  const [base1D, setBase1D] = useState(1000);
  const [size1D, setSize1D] = useState(4);
  const [len1D, setLen1D] = useState(globalArray.length > 0 ? globalArray.length : 5);
  const [targetIdx, setTargetIdx] = useState(0);

  useEffect(() => {
    if (globalArray.length > 0) setLen1D(globalArray.length);
  }, [globalArray]);

  const [base2D, setBase2D] = useState(1000);
  const [size2D, setSize2D] = useState(4);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [targetRow, setTargetRow] = useState(1);
  const [targetCol, setTargetCol] = useState(2);

  const [result1D, setResult1D] = useState(null);
  const [result2D, setResult2D] = useState(null);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">
          01. Array Address Calculation
        </h2>
        <p className="text-navy/70 text-sm">
          Calculate the exact memory address of an element in 1D and 2D arrays using Base Address
          and Element Size.
        </p>
      </div>

      <div className="flex border-b-2 border-sand mb-6">
        <button
          onClick={() => {
            setMode('1D');
            setResult1D(null);
            setResult2D(null);
          }}
          className={`px-6 py-3 font-bold text-sm transition-colors cursor-pointer ${
            mode === '1D'
              ? 'border-b-4 border-navy text-navy'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          1D Array
        </button>
        <button
          onClick={() => {
            setMode('2D');
            setResult1D(null);
            setResult2D(null);
          }}
          className={`px-6 py-3 font-bold text-sm transition-colors cursor-pointer ${
            mode === '2D'
              ? 'border-b-4 border-navy text-navy'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          2D Array (Matrix)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">
              Parameters
            </h3>
            {mode === '1D' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Base Address (Start)
                  </label>
                  <input
                    type="number"
                    value={base1D}
                    onChange={(e) => setBase1D(Number(e.target.value))}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Element Size (bytes)
                  </label>
                  <input
                    type="number"
                    value={size1D}
                    onChange={(e) => setSize1D(Number(e.target.value))}
                    className="input-field py-2"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Array Length
                  </label>
                  <input
                    type="number"
                    value={len1D}
                    onChange={(e) => setLen1D(Number(e.target.value))}
                    className="input-field py-2 bg-sand/20"
                    min="1"
                    max="20"
                    disabled={globalArray.length > 0}
                  />
                  {globalArray.length > 0 && (
                    <p className="text-[10px] text-sage font-bold mt-1">
                      Synced with Your Array
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Target Index
                  </label>
                  <input
                    type="number"
                    value={targetIdx}
                    onChange={(e) => setTargetIdx(Number(e.target.value))}
                    className="input-field py-2"
                    min="0"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      if (targetIdx < 0 || targetIdx >= len1D) {
                        alert('Index out of bounds');
                        return;
                      }
                      setResult1D(base1D + targetIdx * size1D);
                    }}
                    className="btn-primary w-full"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Base Address
                  </label>
                  <input
                    type="number"
                    value={base2D}
                    onChange={(e) => setBase2D(Number(e.target.value))}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy/80 mb-1">
                    Element Size (bytes)
                  </label>
                  <input
                    type="number"
                    value={size2D}
                    onChange={(e) => setSize2D(Number(e.target.value))}
                    className="input-field py-2"
                    min="1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Rows</label>
                    <input
                      type="number"
                      value={rows}
                      onChange={(e) => setRows(Number(e.target.value))}
                      className="input-field py-2"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">Columns</label>
                    <input
                      type="number"
                      value={cols}
                      onChange={(e) => setCols(Number(e.target.value))}
                      className="input-field py-2"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">
                      Target Row
                    </label>
                    <input
                      type="number"
                      value={targetRow}
                      onChange={(e) => setTargetRow(Number(e.target.value))}
                      className="input-field py-2"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/80 mb-1">
                      Target Col
                    </label>
                    <input
                      type="number"
                      value={targetCol}
                      onChange={(e) => setTargetCol(Number(e.target.value))}
                      className="input-field py-2"
                      min="0"
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      if (
                        targetRow < 0 ||
                        targetRow >= rows ||
                        targetCol < 0 ||
                        targetCol >= cols
                      ) {
                        alert('Index out of bounds');
                        return;
                      }
                      setResult2D(base2D + (targetRow * cols + targetCol) * size2D);
                    }}
                    className="btn-primary w-full"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="card p-6 min-h-[300px] flex flex-col">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">
              Memory Visualization
            </h3>
            <div className="flex-1 bg-ivory/50 rounded-xl border border-sand/30 p-6 flex items-center justify-center overflow-x-auto relative">
              {mode === '1D' ? (
                <div className="w-full">
                  <div className="flex gap-4 justify-start min-w-max pb-4 px-4">
                    {Array.from({ length: Math.min(len1D, 20) }).map((_, idx) => {
                      const selected = idx === targetIdx && result1D !== null;
                      const addr = base1D + idx * size1D;
                      const val = globalArray[idx] ?? '?';
                      return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold transition-colors ${
                              selected ? 'text-sage' : 'text-navy/50'
                            }`}
                          >
                            A[{idx}]
                          </span>
                          <motion.div
                            animate={{ y: selected ? -4 : 0 }}
                            className={`w-14 h-14 array-block transition-transform relative ${
                              selected ? 'array-block-selected z-20' : 'text-navy'
                            }`}
                          >
                            {val}
                            {selected && (
                              <motion.div
                                layoutId="active-pointer"
                                className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30"
                              >
                                <CodePointer isActive={true} label="ADDR" />
                              </motion.div>
                            )}
                          </motion.div>
                          <span
                            className={`text-[10px] font-mono font-bold transition-colors ${
                              selected ? 'text-sage' : 'text-navy/50'
                            }`}
                          >
                            {addr}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex gap-2 min-w-max pb-2">
                    <div className="w-8" />
                    {Array.from({ length: Math.min(cols, 10) }).map((_, cIdx) => (
                      <div
                        key={`col-${cIdx}`}
                        className="w-12 sm:w-14 text-center text-[10px] font-mono font-bold text-navy/50"
                      >
                        C{cIdx}
                      </div>
                    ))}
                  </div>
                  {Array.from({ length: Math.min(rows, 10) }).map((_, rIdx) => (
                    <div key={`row-${rIdx}`} className="flex gap-2 min-w-max items-center">
                      <div className="w-8 text-[10px] font-mono font-bold text-navy/50 text-right pr-2">
                        R{rIdx}
                      </div>
                      {Array.from({ length: Math.min(cols, 10) }).map((_, cIdx) => {
                        const selected =
                          rIdx === targetRow && cIdx === targetCol && result2D !== null;
                        const addr = base2D + (rIdx * cols + cIdx) * size2D;
                        return (
                          <div key={`cell-${rIdx}-${cIdx}`} className="flex flex-col items-center">
                            <motion.div
                              animate={{ y: selected ? -2 : 0 }}
                              className={`w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center font-mono font-bold text-xs bg-white border border-sand-dark rounded-md shadow-block transition-all duration-300 transform relative ${
                                selected
                                  ? 'bg-sage text-white -translate-y-2 shadow-block-selected border-sage-dark z-20'
                                  : 'hover:shadow-block-hover hover:-translate-y-1 text-navy z-10'
                              }`}
                            >
                              <span>
                                [{rIdx}][{cIdx}]
                              </span>
                              <div
                                className={`text-[9px] font-mono mt-1 ${
                                  selected ? 'text-white/80' : 'text-navy/50'
                                }`}
                              >
                                {addr}
                              </div>
                              {selected && (
                                <motion.div
                                  layoutId="active-pointer"
                                  className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30"
                                >
                                  <CodePointer isActive={true} label="ADDR" />
                                </motion.div>
                              )}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <p className="text-[10px] text-navy/50 mt-4 italic">
                    Row-Major Order visualization
                  </p>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {(mode === '1D' ? result1D : result2D) !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-white border border-sand rounded-xl p-5 overflow-hidden shadow-sm"
                >
                  <h4 className="text-[10px] font-black text-navy/50 uppercase tracking-wider mb-3">
                    Calculation Details
                  </h4>
                  {mode === '1D' ? (
                    <div className="space-y-2 font-mono text-sm text-navy">
                      <p className="text-navy/70 text-xs">
                        Address(A[i]) = Base + (i × ElementSize)
                      </p>
                      <p>
                        Address = {base1D} + ({targetIdx} × {size1D})
                      </p>
                      <p>
                        Address = {base1D} + {targetIdx * size1D}
                      </p>
                      <div className="pt-2 border-t border-sand/50 mt-2">
                        <span className="font-sans font-bold text-xs uppercase text-navy/60 mr-2">
                          Result:
                        </span>
                        <span className="text-lg font-bold text-sage">{result1D}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 font-mono text-sm text-navy">
                      <p className="text-navy/70 text-xs">
                        Address(A[i][j]) = Base + ((i × Columns) + j) × ElementSize
                      </p>
                      <p>
                        Address = {base2D} + (({targetRow} × {cols}) + {targetCol}) × {size2D}
                      </p>
                      <p>
                        Address = {base2D} + ({targetRow * cols} + {targetCol}) × {size2D}
                      </p>
                      <p>
                        Address = {base2D} + ({targetRow * cols + targetCol} × {size2D})
                      </p>
                      <p>
                        Address = {base2D} + {(targetRow * cols + targetCol) * size2D}
                      </p>
                      <div className="pt-2 border-t border-sand/50 mt-2">
                        <span className="font-sans font-bold text-xs uppercase text-navy/60 mr-2">
                          Result:
                        </span>
                        <span className="text-lg font-bold text-sage">{result2D}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
