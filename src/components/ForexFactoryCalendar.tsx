import React, { useState, useMemo } from 'react';
import { 
  Folder, 
  ExternalLink, 
  Search, 
  Filter, 
  Info, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Volume2,
  CalendarDays
} from 'lucide-react';
import { EconomicEvent, ImpactLevel, CurrencyCode } from '../types/forex';

interface ForexFactoryCalendarProps {
  events: EconomicEvent[];
  onSelectEvent: (event: EconomicEvent) => void;
  selectedEvent: EconomicEvent | null;
  onSimulateRelease: () => void;
  isSimulating: boolean;
}

export const ForexFactoryCalendar: React.FC<ForexFactoryCalendarProps> = ({
  events,
  onSelectEvent,
  selectedEvent,
  onSimulateRelease,
  isSimulating,
}) => {
  const [impactFilter, setImpactFilter] = useState<ImpactLevel | 'all'>('all');
  const [currencyFilter, setCurrencyFilter] = useState<CurrencyCode | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'tomorrow' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD'];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Impact filter
      if (impactFilter !== 'all' && ev.impact !== impactFilter) return false;
      // Currency filter
      if (currencyFilter !== 'all' && ev.currency !== currencyFilter) return false;
      // Time filter
      if (timeFilter === 'today' && !ev.displayDate.includes('Hoy')) return false;
      if (timeFilter === 'tomorrow' && !ev.displayDate.includes('Mañana')) return false;
      if (timeFilter === 'upcoming' && ev.status === 'completed') return false;
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = ev.eventName.toLowerCase().includes(query);
        const matchesCurr = ev.currency.toLowerCase().includes(query);
        const matchesCategory = ev.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCurr && !matchesCategory) return false;
      }
      return true;
    });
  }, [events, impactFilter, currencyFilter, timeFilter, searchQuery]);

  // Counts for quick badges
  const highCount = events.filter(e => e.impact === 'high').length;
  const mediumCount = events.filter(e => e.impact === 'medium').length;
  const lowCount = events.filter(e => e.impact === 'low').length;

  return (
    <div className="space-y-4">
      {/* Forex Factory Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                FOREX FACTORY ENGINE
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-400">Feed Sincronizado en Tiempo Real</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Calendario Económico Institucional
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Monitoreo de publicaciones macroeconómicas de alto impacto, datos de empleo (NFP), inflación (CPI/PCE) y decisiones de tasas de interés con clasificación oficial Forex Factory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.forexfactory.com/calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-md transition-colors"
            >
              <span>Abrir Forex Factory Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={onSimulateRelease}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Simulando...' : 'Simular Salida de Dato'}</span>
            </button>
          </div>
        </div>

        {/* Filters and Controls Strip */}
        <div className="pt-4 space-y-3">
          {/* Row 1: Time filter tabs + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1.5 font-medium rounded transition-colors ${
                  timeFilter === 'all'
                    ? 'bg-slate-800 text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todos los Días
              </button>
              <button
                onClick={() => setTimeFilter('today')}
                className={`px-3 py-1.5 font-medium rounded transition-colors ${
                  timeFilter === 'today'
                    ? 'bg-slate-800 text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hoy
              </button>
              <button
                onClick={() => setTimeFilter('tomorrow')}
                className={`px-3 py-1.5 font-medium rounded transition-colors ${
                  timeFilter === 'tomorrow'
                    ? 'bg-slate-800 text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mañana
              </button>
              <button
                onClick={() => setTimeFilter('upcoming')}
                className={`px-3 py-1.5 font-medium rounded transition-colors ${
                  timeFilter === 'upcoming'
                    ? 'bg-slate-800 text-cyan-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pendientes
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar evento (NFP, CPI, Fed, BCE)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Impact folders filter + Currency selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Impact Filter Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                Impacto:
              </span>
              <button
                onClick={() => setImpactFilter('all')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  impactFilter === 'all'
                    ? 'bg-slate-800 text-white border-slate-700'
                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200'
                }`}
              >
                Todos ({events.length})
              </button>
              <button
                onClick={() => setImpactFilter('high')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
                  impactFilter === 'high'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-rose-400'
                }`}
              >
                <Folder className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Alto ({highCount})</span>
              </button>
              <button
                onClick={() => setImpactFilter('medium')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
                  impactFilter === 'medium'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-amber-400'
                }`}
              >
                <Folder className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Medio ({mediumCount})</span>
              </button>
              <button
                onClick={() => setImpactFilter('low')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
                  impactFilter === 'low'
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-yellow-400'
                }`}
              >
                <Folder className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>Bajo ({lowCount})</span>
              </button>
            </div>

            {/* Currency selector chips */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Divisa:</span>
              <button
                onClick={() => setCurrencyFilter('all')}
                className={`px-2 py-0.5 text-xs rounded font-mono ${
                  currencyFilter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ALL
              </button>
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrencyFilter(curr)}
                  className={`px-2 py-0.5 text-xs rounded font-mono font-medium transition-colors ${
                    currencyFilter === curr
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-950/60'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Economic Calendar Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 tracking-wider">
                <th className="py-2.5 px-3 sm:px-4 w-24">HORA (UTC)</th>
                <th className="py-2.5 px-2 w-16">DIVISA</th>
                <th className="py-2.5 px-2 w-16 text-center">IMPACTO</th>
                <th className="py-2.5 px-3">EVENTO ECONÓMICO</th>
                <th className="py-2.5 px-3 text-right w-24">ACTUAL</th>
                <th className="py-2.5 px-3 text-right w-24">PRONÓSTICO</th>
                <th className="py-2.5 px-3 text-right w-24">PREVIO</th>
                <th className="py-2.5 px-2 text-center w-12">INFO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No se encontraron eventos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((ev) => {
                  const isSelected = selectedEvent?.id === ev.id;
                  
                  // Impact folder color mapping
                  let folderColor = 'fill-slate-500 text-slate-500';
                  let impactBadge = 'Bajo';
                  if (ev.impact === 'high') {
                    folderColor = 'fill-rose-500 text-rose-500';
                    impactBadge = 'Alto';
                  } else if (ev.impact === 'medium') {
                    folderColor = 'fill-amber-500 text-amber-500';
                    impactBadge = 'Medio';
                  } else if (ev.impact === 'low') {
                    folderColor = 'fill-yellow-400 text-yellow-400';
                    impactBadge = 'Bajo';
                  }

                  // Actual value comparison styling
                  let actualStyle = 'text-slate-200';
                  if (ev.status === 'completed' && ev.actual) {
                    if (ev.sentiment === 'better') {
                      actualStyle = 'text-emerald-400 font-bold';
                    } else if (ev.sentiment === 'worse') {
                      actualStyle = 'text-rose-400 font-bold';
                    }
                  } else {
                    actualStyle = 'text-slate-500 italic';
                  }

                  return (
                    <tr
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className={`hover:bg-slate-800/60 transition-colors cursor-pointer ${
                        isSelected ? 'bg-slate-800/90 ring-1 ring-cyan-500/40' : ''
                      }`}
                    >
                      {/* Time */}
                      <td className="py-3 px-3 sm:px-4 font-mono tabular-nums text-slate-300">
                        <div className="font-semibold">{ev.time}</div>
                        <div className="text-[10px] text-slate-500">{ev.timeUtc}</div>
                      </td>

                      {/* Currency */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base" title={ev.countryName}>{ev.countryFlag}</span>
                          <span className="font-mono font-bold text-slate-200">{ev.currency}</span>
                        </div>
                      </td>

                      {/* Impact Folder */}
                      <td className="py-3 px-2 text-center">
                        <div className="inline-flex items-center justify-center" title={`Impacto: ${impactBadge}`}>
                          <Folder className={`w-4 h-4 ${folderColor}`} />
                        </div>
                      </td>

                      {/* Event Name & Category */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {ev.eventName}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{ev.displayDate}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-cyan-400/90 font-mono">Volatilidad: ~{ev.historicalVolatilityPips} pips</span>
                          {ev.speechSpeaker && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-400">🎙️ {ev.speechSpeaker}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actual */}
                      <td className={`py-3 px-3 text-right font-mono tabular-nums text-sm ${actualStyle}`}>
                        {ev.actual || '—'}
                      </td>

                      {/* Forecast */}
                      <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                        {ev.forecast}
                      </td>

                      {/* Previous */}
                      <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-400">
                        {ev.previous}
                      </td>

                      {/* Info Arrow */}
                      <td className="py-3 px-2 text-center text-slate-500 hover:text-cyan-400">
                        <ChevronRight className="w-4 h-4 inline" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Event Institutional Deep-Dive Drawer */}
      {selectedEvent && (
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-5 shadow-lg relative animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedEvent.countryFlag}</span>
                <span className="font-mono font-bold text-cyan-400">{selectedEvent.currency}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-medium">{selectedEvent.displayDate} a las {selectedEvent.time}</span>
                <span className="text-slate-500">·</span>
                <div className="flex items-center gap-1 text-xs">
                  <Folder className={`w-3.5 h-3.5 ${
                    selectedEvent.impact === 'high' ? 'fill-rose-500 text-rose-500' :
                    selectedEvent.impact === 'medium' ? 'fill-amber-500 text-amber-500' : 'fill-yellow-400 text-yellow-400'
                  }`} />
                  <span className="font-semibold capitalize text-slate-300">Impacto {selectedEvent.impact}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">
                {selectedEvent.eventName}
              </h3>
            </div>

            <button
              onClick={() => onSelectEvent(null as any)}
              className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Column 1: Numbers breakdown */}
            <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Métricas del Dato
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono tabular-nums text-center pt-1">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">ACTUAL</div>
                  <div className={`text-base font-bold ${
                    selectedEvent.sentiment === 'better' ? 'text-emerald-400' :
                    selectedEvent.sentiment === 'worse' ? 'text-rose-400' : 'text-slate-200'
                  }`}>
                    {selectedEvent.actual || 'Pendiente'}
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">PREVISTO</div>
                  <div className="text-base font-semibold text-slate-300">{selectedEvent.forecast}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">PREVIO</div>
                  <div className="text-base font-semibold text-slate-400">{selectedEvent.previous}</div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-300">
                <span className="text-slate-500">Rango de volatilidad típico: </span>
                <span className="font-mono font-semibold text-amber-400">±{selectedEvent.historicalVolatilityPips} pips</span>
              </div>
            </div>

            {/* Column 2: Institutional Analysis */}
            <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800 space-y-2 md:col-span-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Análisis Institucional & Ordenes Bancarias
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedEvent.institutionalAnalysis}
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Pares directamente impactados:</span>
                {selectedEvent.affectedPairs.map((pair) => (
                  <span
                    key={pair}
                    className="px-2 py-0.5 text-xs font-mono font-semibold bg-slate-800 text-cyan-300 rounded border border-slate-700"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
