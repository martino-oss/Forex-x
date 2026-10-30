import React from 'react';
import { Calendar, Building2, Globe2, Calculator, PlayCircle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calendar' | 'banks' | 'aggregator' | 'tools';
  setActiveTab: (tab: 'calendar' | 'banks' | 'aggregator' | 'tools') => void;
  onSimulateRelease: () => void;
  isSimulating: boolean;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onSimulateRelease,
  isSimulating,
  lastUpdated
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single element, no subtitle clutter) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-sm">
              FX
            </div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('calendar'); }}
              className="text-lg font-bold tracking-tight text-white whitespace-nowrap hover:text-cyan-400 transition-colors"
            >
              ForexPulse <span className="text-cyan-400 font-medium">Terminal</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Clean, single-line text tabs) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'calendar'
                  ? 'bg-slate-800 text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendario Forex Factory</span>
            </button>

            <button
              onClick={() => setActiveTab('banks')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'banks'
                  ? 'bg-slate-800 text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Niveles & Bancos Centrales</span>
            </button>

            <button
              onClick={() => setActiveTab('aggregator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'aggregator'
                  ? 'bg-slate-800 text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Agregador Económico Global</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'tools'
                  ? 'bg-slate-800 text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculadora & Riesgo</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Simulation/Refresh button + Time) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.bloomberg.com/live"
              target="_blank"
              rel="noopener noreferrer"
              title="Ver Bloomberg Television & Radio en Vivo"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Bloomberg Live TV</span>
            </a>

            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono tabular-nums">
              <span>Sync {lastUpdated}</span>
            </div>

            <button
              onClick={onSimulateRelease}
              disabled={isSimulating}
              title="Simular publicación de dato macroeconómico en tiempo real"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-sm active:scale-95 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Simular Dato En Vivo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-900 px-2 py-1.5 bg-slate-950">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded ${
            activeTab === 'calendar' ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Calendario</span>
        </button>
        <button
          onClick={() => setActiveTab('banks')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded ${
            activeTab === 'banks' ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Bancos</span>
        </button>
        <button
          onClick={() => setActiveTab('aggregator')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded ${
            activeTab === 'aggregator' ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Fuentes</span>
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded ${
            activeTab === 'tools' ? 'text-cyan-400 bg-slate-900' : 'text-slate-400'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Riesgo</span>
        </button>
      </div>
    </header>
  );
};
