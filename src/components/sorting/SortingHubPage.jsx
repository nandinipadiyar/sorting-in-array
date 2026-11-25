import { ArrowRight, GitCompare, BookOpen, PlayCircle, Swords } from 'lucide-react';
import { SORTING_ALGORITHMS, getAlgorithmById } from '../../data/sortingAlgorithmsData';
import { SortingDetailPage } from './SortingDetailPage';
import { SortingFaceOff } from './SortingFaceOff';

export function SortingHubPage({
  selectedAlgoId,
  setSelectedAlgoId,
  arenaTab = 'lab',
  setArenaTab,
}) {
  if (selectedAlgoId) {
    const algo = getAlgorithmById(selectedAlgoId);
    return (
      <SortingDetailPage
        algorithm={algo}
        onSelectAlgorithm={(id) => {
          setSelectedAlgoId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBack={() => {
          setSelectedAlgoId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Sorting Arena Header Banner + Mode Switcher */}
      <div className="card p-6 md:p-8 bg-gradient-to-br from-white via-blue-50/35 to-violet-50/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-violet-600" />
              ARRAYVERSE · Sorting Arena &amp; Coding Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Sorting Arena
            </h2>
            <p className="text-navy/75 text-sm sm:text-base leading-relaxed">
              Explore all 7 sorting algorithms in the <strong>Coding Lab</strong> with theory,
              pseudocode, C++ programs, and individual simulations — or race any two side by side
              in <strong>Algorithm Face-Off</strong>!
            </p>
          </div>

          <div className="inline-flex rounded-xl border border-sand bg-white p-1.5 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setArenaTab && setArenaTab('lab')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                arenaTab === 'lab'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-navy/70 hover:text-navy'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Coding Lab (7 Algos)
            </button>
            <button
              onClick={() => setArenaTab && setArenaTab('faceoff')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                arenaTab === 'faceoff'
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm'
                  : 'text-navy/70 hover:text-navy'
              }`}
            >
              <Swords className="w-4 h-4" />
              Algorithm Face-Off
            </button>
          </div>
        </div>
      </div>

      {arenaTab === 'faceoff' ? (
        <SortingFaceOff />
      ) : (
        <div className="space-y-10">
          {/* 7 Algorithm Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SORTING_ALGORITHMS.map((algo) => (
              <div
                key={algo.id}
                onClick={() => {
                  setSelectedAlgoId(algo.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card p-6 flex flex-col h-full hover:border-blue-500 transition-all group cursor-pointer hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                    {algo.number}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-ivory border border-sand text-navy/80">
                    {algo.methodType}
                  </span>
                </div>

                <h3 className="text-lg font-black text-navy mb-2 group-hover:text-blue-700 transition-colors">
                  {algo.name}
                </h3>

                <p className="text-navy/70 text-sm mb-5 flex-1 leading-relaxed">{algo.shortDesc}</p>

                <div className="grid grid-cols-2 gap-2 mb-5 pt-3 border-t border-sand/50 text-xs">
                  <div className="bg-ivory/80 rounded-lg px-2.5 py-1.5 border border-sand/50">
                    <span className="text-[10px] font-bold uppercase text-navy/50 block">
                      Avg / Worst
                    </span>
                    <span className="font-mono font-bold text-navy">{algo.complexity.worst}</span>
                  </div>
                  <div className="bg-ivory/80 rounded-lg px-2.5 py-1.5 border border-sand/50">
                    <span className="text-[10px] font-bold uppercase text-navy/50 block">
                      Space / Stability
                    </span>
                    <span className="font-mono font-bold text-navy">
                      {algo.complexity.space} · {algo.complexity.stable}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-blue-600 font-bold text-sm group-hover:text-violet-600 transition-colors">
                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4" />
                    Open Coding Lab
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <section id="comparison-table" className="card p-6 md:p-8 space-y-5 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand pb-4">
              <div className="flex items-center gap-2.5">
                <GitCompare className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-navy uppercase tracking-wider">
                  Sorting Algorithms Comparison
                </h2>
              </div>
              <span className="text-xs font-bold text-navy/60">
                Click any algorithm row to open its Coding Lab &amp; Simulator
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-ivory border-b-2 border-sand-dark text-[11px] font-black uppercase tracking-wider text-navy/70">
                    <th className="py-3 px-4">Algorithm Name</th>
                    <th className="py-3 px-4">Best-Case</th>
                    <th className="py-3 px-4">Average-Case</th>
                    <th className="py-3 px-4">Worst-Case</th>
                    <th className="py-3 px-4">Space</th>
                    <th className="py-3 px-4">Stable / Unstable</th>
                    <th className="py-3 px-4">In-Place</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/50 text-sm">
                  {SORTING_ALGORITHMS.map((algo) => (
                    <tr
                      key={algo.id}
                      onClick={() => {
                        setSelectedAlgoId(algo.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:bg-ivory/80 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-bold text-navy">
                        <span className="font-mono text-xs text-navy/50 mr-2">{algo.number}.</span>
                        {algo.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sage-dark">
                        {algo.complexity.best}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-navy">
                        {algo.complexity.average}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                        {algo.complexity.worst}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-navy">
                        {algo.complexity.space}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            algo.complexity.stable === 'Stable'
                              ? 'bg-sage/20 text-sage-dark'
                              : 'bg-sand-light text-navy/80'
                          }`}
                        >
                          {algo.complexity.stable}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            algo.complexity.inPlace === 'Yes'
                              ? 'bg-sage/20 text-sage-dark'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {algo.complexity.inPlace === 'Yes' ? 'In-place' : 'Not In-place'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-navy/80">
              <div className="bg-ivory rounded-lg border border-sand p-3.5">
                <strong className="text-navy">What does Stable mean?</strong> A sorting algorithm is{' '}
                <em>stable</em> if two elements with equal values keep the same relative order after
                sorting as they had in the input array.
              </div>
              <div className="bg-ivory rounded-lg border border-sand p-3.5">
                <strong className="text-navy">What does In-Place mean?</strong> An <em>in-place</em>{' '}
                algorithm sorts the array using only a small constant amount of extra memory (or
                O(log n) recursion stack), without allocating a full extra copy of the array.
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
