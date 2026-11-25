import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodePointer } from '../CodePointer';

export function ArrayInsert({ globalArray, setGlobalArray }) {
  const [valToInsert, setValToInsert] = useState('99');
  const [targetIdx, setTargetIdx] = useState(2);
  const [items, setItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setItems(globalArray.map((val, idx) => ({ val, id: Date.now() + idx })));
  }, [globalArray]);

  const handleInsert = async () => {
    if (isRunning) return;
    if (targetIdx < 0 || targetIdx > globalArray.length) {
      alert(`Invalid index. Must be between 0 and ${globalArray.length}`);
      return;
    }
    const parsed = parseInt(valToInsert, 10);
    if (isNaN(parsed)) {
      alert('Please enter a valid number to insert.');
      return;
    }

    setIsRunning(true);
    const working = globalArray.map((val, idx) => ({ val, id: Date.now() + idx }));
    working.push({ val: '', id: Date.now() + 1000 });
    setItems([...working]);
    setMessage('Step 1: Expanding array. Creating an empty slot at the end.');
    await new Promise((r) => setTimeout(r, 1000));

    for (let i = working.length - 1; i > targetIdx; i--) {
      setMessage(`Step 2: Shifting element from index ${i - 1} to index ${i} to make room...`);
      setActiveIdx(i - 1);
      working[i].val = working[i - 1].val;
      working[i - 1].val = '';
      setItems([...working]);
      await new Promise((r) => setTimeout(r, 800));
    }

    setActiveIdx(targetIdx);
    setMessage(`Step 3: Inserting the new value ${parsed} at index ${targetIdx}.`);
    await new Promise((r) => setTimeout(r, 800));

    working[targetIdx].val = parsed;
    working[targetIdx].id = Date.now() + 2000;
    setItems([...working]);
    setGlobalArray(working.map((item) => item.val));
    setMessage('Success! Element was inserted.');
    setActiveIdx(null);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-navy uppercase tracking-wider mb-2">
          02. Array Insertion
        </h2>
        <p className="text-navy/70 text-sm">
          Insert a new element at a specific index. Watch how existing elements must shift to the
          right to make room.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">
              Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy/80 mb-1">
                  Value to Insert
                </label>
                <input
                  type="number"
                  value={valToInsert}
                  onChange={(e) => setValToInsert(e.target.value)}
                  disabled={isRunning}
                  className="input-field py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy/80 mb-1">
                  Target Index
                </label>
                <input
                  type="number"
                  value={targetIdx}
                  onChange={(e) => setTargetIdx(Number(e.target.value))}
                  disabled={isRunning}
                  className="input-field py-2"
                  min="0"
                  max={globalArray.length}
                />
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleInsert}
                  disabled={isRunning}
                  className="btn-primary w-full"
                >
                  Insert Element
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="card p-6 flex-1 flex flex-col">
            <h3 className="text-sm font-black text-navy uppercase tracking-wider mb-4 border-b border-sand pb-2">
              Visualization
            </h3>
            <div className="flex-1 bg-ivory/50 rounded-xl border border-sand/30 p-6 flex flex-col items-center justify-center overflow-hidden min-h-[300px] relative">
              {items.length === 0 ? (
                <p className="text-navy/50 font-bold">The array is empty.</p>
              ) : (
                <div className="w-full flex justify-start sm:justify-center overflow-x-auto pb-8 hide-scrollbar">
                  <div className="flex gap-4 px-4">
                    {items.map((item, idx) => (
                      <div key={item.id} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-navy/50">
                          Idx {idx}
                        </span>
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: activeIdx === idx ? -4 : 0,
                          }}
                          className={`w-14 h-14 mb-8 array-block relative ${
                            item.val === ''
                              ? 'bg-sand/10 border-sand/30 border-dashed shadow-none'
                              : activeIdx === idx
                              ? 'array-block-selected z-10'
                              : ''
                          }`}
                        >
                          <span>{item.val}</span>
                          {activeIdx === idx && item.val !== '' && (
                            <motion.div
                              layoutId="insert-pointer"
                              className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                            >
                              <CodePointer isActive={true} label="SHIFT" />
                            </motion.div>
                          )}
                        </motion.div>
                        {idx === targetIdx && !isRunning && (
                          <div className="text-[10px] uppercase font-bold text-sage flex flex-col items-center">
                            <span>↑</span>
                            <span>Target</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-14 mt-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-white border border-sand px-6 py-3 rounded-lg text-sm text-navy font-medium shadow-sm"
                    >
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
