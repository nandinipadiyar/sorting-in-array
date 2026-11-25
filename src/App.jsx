import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SimulatorPage } from './components/SimulatorPage';
import { LearningPage } from './components/LearningPage';
import { SortingHubPage } from './components/sorting/SortingHubPage';
import { PlayAndLearnPage } from './components/play/PlayAndLearnPage';
import { CodeDetectivePage } from './components/detective/CodeDetectivePage';
import { MysteryArrayPage } from './components/mystery/MysteryArrayPage';

export function App() {
  const [activePage, setActivePage] = useState('landing');
  const [globalArray, setGlobalArray] = useState([10, 20, 30, 40, 50]);
  const [selectedAlgoId, setSelectedAlgoId] = useState(null);
  const [arenaTab, setArenaTab] = useState('lab');

  const navigateTo = (page) => {
    setActivePage(page);
    if (page === 'sorting') {
      setSelectedAlgoId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openFaceOff = () => {
    setSelectedAlgoId(null);
    setArenaTab('faceoff');
    setActivePage('sorting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'simulator', label: 'Array Playground' },
    { id: 'sorting', label: 'Sorting Arena' },
    { id: 'detective', label: 'Code Detective' },
    { id: 'mystery', label: 'Mystery Array' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learning', label: 'Learning Mode' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-navy selection:bg-blue-600 selection:text-white">
      <header className="bg-white/95 backdrop-blur border-b-2 border-sand-dark shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row items-center justify-between py-3.5 gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigateTo('landing')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-mono font-black text-base shadow-sm transition-transform group-hover:-translate-y-0.5">
                <span>[ ]</span>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-navy via-blue-800 to-violet-700 bg-clip-text text-transparent leading-none">
                  ARRAYVERSE
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/55 mt-0.5">
                  The Interactive Coding Playground
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-1.5">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'sorting') setArenaTab('lab');
                      navigateTo(item.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm'
                        : 'text-navy/75 hover:bg-blue-50/70 hover:text-blue-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {activePage === 'landing' && (
          <LandingPage onNavigate={navigateTo} onOpenFaceOff={openFaceOff} />
        )}
        {activePage === 'simulator' && (
          <SimulatorPage
            globalArray={globalArray}
            setGlobalArray={setGlobalArray}
            onOpenSorting={() => {
              setArenaTab('lab');
              navigateTo('sorting');
            }}
          />
        )}
        {activePage === 'sorting' && (
          <SortingHubPage
            selectedAlgoId={selectedAlgoId}
            setSelectedAlgoId={setSelectedAlgoId}
            arenaTab={arenaTab}
            setArenaTab={setArenaTab}
          />
        )}
        {activePage === 'detective' && <CodeDetectivePage />}
        {activePage === 'mystery' && <MysteryArrayPage />}
        {activePage === 'play' && <PlayAndLearnPage />}
        {activePage === 'learning' && <LearningPage />}
      </main>
    </div>
  );
}

export default App;
