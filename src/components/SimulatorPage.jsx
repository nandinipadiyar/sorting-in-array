import { useState, useEffect } from 'react';
import { GripVertical, Pencil, Check, Shuffle, Plus, Trash2 } from 'lucide-react';
import { AddressCalc } from './operations/AddressCalc';
import { ArrayInsert } from './operations/ArrayInsert';
import { ArrayDelete } from './operations/ArrayDelete';
import { LinearSearch } from './operations/LinearSearch';
import { BinarySearch } from './operations/BinarySearch';

function OperationCard({ title, desc, onClick }) {
  return (
    <div
      className="card p-6 flex flex-col h-full hover:border-blue-500 hover:-translate-y-1 transition-all group cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-sm font-black text-navy mb-3 uppercase tracking-wider">{title}</h3>
      <p className="text-navy/70 text-sm mb-6 flex-1">{desc}</p>
      <button className="text-blue-600 font-bold text-sm text-left group-hover:text-violet-600 transition-colors flex items-center gap-1 cursor-pointer">
        Open Operation <span>→</span>
      </button>
    </div>
  );
}

export function SimulatorPage({ globalArray, setGlobalArray, onOpenSorting }) {
  const [inputStr, setInputStr] = useState(globalArray.join(', '));
  const [selectedOp, setSelectedOp] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editVal, setEditVal] = useState('');
  const [pushVal, setPushVal] = useState('60');

  useEffect(() => {
    setInputStr(globalArray.join(', '));
  }, [globalArray]);

  const handleCreateArray = () => {
    const parsed = inputStr
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (parsed.length > 0) {
      setGlobalArray(parsed);
      setEditingIdx(null);
      if (selectedOp) setSelectedOp(null);
    } else {
      alert('Please enter a valid comma-separated list of numbers.');
    }
  };

  const handleDrop = (targetIdx) => {
    if (dragIdx === null || dragIdx === targetIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...globalArray];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);
    setGlobalArray(next);
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const handleStartEdit = (idx, val) => {
    setEditingIdx(idx);
    setEditVal(String(val));
  };

  const handleSaveEdit = (idx) => {
    const parsed = parseInt(editVal, 10);
    if (!isNaN(parsed)) {
      const next = [...globalArray];
      next[idx] = parsed;
      setGlobalArray(next);
    }
    setEditingIdx(null);
  };

  const handleQuickPush = () => {
    const parsed = parseInt(pushVal, 10);
    if (isNaN(parsed)) return;
    setGlobalArray([...globalArray, parsed]);
  };

  const handleQuickRemove = (idx) => {
    if (globalArray.length <= 1) return;
    setGlobalArray(globalArray.filter((_, i) => i !== idx));
  };

  const handleShuffle = () => {
    const next = [...globalArray];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setGlobalArray(next);
  };

  return (
    <div className="space-y-8 relative">
      {/* Interactive Array Playground */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-white via-blue-50/20 to-violet-50/25">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
              Interactive Array Playground
            </span>
            <h2 className="text-2xl font-black text-navy">YOUR ARRAY</h2>
            <p className="text-navy/70 text-sm">
              Create an array, <strong>drag &amp; drop</strong> blocks to reorder positions, or{' '}
              <strong>click any value</strong> to edit it directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              value={pushVal}
              onChange={(e) => setPushVal(e.target.value)}
              className="input-field py-2 px-3 w-20 text-sm font-mono"
              aria-label="Value to append"
            />
            <button
              onClick={handleQuickPush}
              className="btn-secondary py-2 px-3.5 text-xs inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              Push
            </button>
            <button
              onClick={handleShuffle}
              className="btn-secondary py-2 px-3.5 text-xs inline-flex items-center gap-1"
            >
              <Shuffle className="w-3.5 h-3.5 text-violet-600" />
              Shuffle
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateArray()}
            className="input-field max-w-lg font-mono text-sm"
            placeholder="e.g. 10, 20, 30, 40, 50"
          />
          <button onClick={handleCreateArray} className="btn-primary whitespace-nowrap">
            CREATE ARRAY
          </button>
        </div>

        <div className="bg-ivory/70 rounded-xl p-5 border border-sand/50 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-2">
            {globalArray.map((val, idx) => {
              const isDragging = dragIdx === idx;
              const isDropTarget = dragOverIdx === idx && dragIdx !== idx;
              return (
                <div
                  key={`${idx}-${val}`}
                  draggable={editingIdx !== idx}
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverIdx(idx);
                  }}
                  onDragLeave={() => setDragOverIdx(null)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={() => {
                    setDragIdx(null);
                    setDragOverIdx(null);
                  }}
                  className={`flex flex-col items-center gap-2 transition-transform ${
                    isDragging ? 'opacity-50 scale-95' : ''
                  } ${isDropTarget ? 'scale-105' : ''}`}
                >
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-navy/45">
                    <GripVertical className="w-3 h-3 cursor-grab" />
                    <span>drag</span>
                  </div>

                  {editingIdx === idx ? (
                    <div className="w-20 h-16 flex items-center gap-1 bg-white border-2 border-blue-500 rounded-lg px-1.5 shadow-md">
                      <input
                        type="number"
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(idx)}
                        autoFocus
                        className="w-full font-mono font-bold text-sm text-center outline-none"
                      />
                      <button
                        onClick={() => handleSaveEdit(idx)}
                        className="p-1 rounded bg-blue-600 text-white cursor-pointer"
                        title="Save"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleStartEdit(idx, val)}
                      title="Click to edit value or drag to reorder"
                      className={`array-block w-16 h-16 relative cursor-grab active:cursor-grabbing group ${
                        isDropTarget ? 'border-blue-500 ring-2 ring-blue-400/50 bg-blue-50' : ''
                      }`}
                    >
                      <span>{val}</span>
                      <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-2.5 h-2.5 text-blue-600" />
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-navy/65 font-bold">idx [{idx}]</span>
                    {globalArray.length > 1 && (
                      <button
                        onClick={() => handleQuickRemove(idx)}
                        className="text-navy/35 hover:text-red-600 transition-colors cursor-pointer"
                        title={`Remove index ${idx}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedOp ? (
        <div className="card p-6 md:p-8">
          <button
            onClick={() => setSelectedOp(null)}
            className="btn-secondary text-sm mb-6 flex items-center gap-2"
          >
            ← Return to Operations
          </button>
          <div className="mt-2">
            {selectedOp === 'address' && <AddressCalc globalArray={globalArray} />}
            {selectedOp === 'insert' && (
              <ArrayInsert globalArray={globalArray} setGlobalArray={setGlobalArray} />
            )}
            {selectedOp === 'delete' && (
              <ArrayDelete globalArray={globalArray} setGlobalArray={setGlobalArray} />
            )}
            {selectedOp === 'linear' && <LinearSearch globalArray={globalArray} />}
            {selectedOp === 'binary' && <BinarySearch globalArray={globalArray} />}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OperationCard
            title="01. ARRAY ADDRESS CALCULATION"
            desc="Calculate the memory address of a specific element in 1D and 2D arrays."
            onClick={() => setSelectedOp('address')}
          />
          <OperationCard
            title="02. ARRAY INSERTION"
            desc="Insert a new element at a specific index and watch elements shift right."
            onClick={() => setSelectedOp('insert')}
          />
          <OperationCard
            title="03. ARRAY DELETION"
            desc="Remove an element from a specific index and watch elements shift left."
            onClick={() => setSelectedOp('delete')}
          />
          <OperationCard
            title="04. LINEAR SEARCH"
            desc="Search for an element sequentially from the first index to the last."
            onClick={() => setSelectedOp('linear')}
          />
          <OperationCard
            title="05. BINARY SEARCH"
            desc="Efficiently search for an element in a sorted array using divide and conquer."
            onClick={() => setSelectedOp('binary')}
          />
          {onOpenSorting && (
            <div
              className="card p-6 flex flex-col h-full border-blue-300 bg-gradient-to-br from-blue-50/50 to-violet-50/50 hover:border-violet-500 hover:-translate-y-1 transition-all group cursor-pointer"
              onClick={onOpenSorting}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-navy uppercase tracking-wider">
                  06. SORTING ARENA &amp; LAB
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 text-white px-2.5 py-0.5 rounded-full">
                  7 Algos
                </span>
              </div>
              <p className="text-navy/70 text-sm mb-6 flex-1">
                Compare two sorting algorithms side by side in Algorithm Face-Off or dive into all 7
                algorithms inside the Coding Lab.
              </p>
              <button className="text-blue-600 font-bold text-sm text-left group-hover:text-violet-600 transition-colors flex items-center gap-1 cursor-pointer">
                Enter Sorting Arena <span>→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
