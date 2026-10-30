import React, { useState, useMemo } from 'react';
import { 
  Globe2, 
  ExternalLink, 
  Search, 
  BookmarkCheck, 
  Newspaper, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GLOBAL_MACRO_SOURCES, MACRO_NEWS_FEED } from '../data/mockForexData';
import { MacroSource, MacroNewsFeedItem } from '../types/forex';

export const EconomicAggregator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNews, setSelectedNews] = useState<MacroNewsFeedItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Fuentes' },
    { id: 'calendar', label: 'Calendarios FX' },
    { id: 'macro_news', label: 'Noticias & Medios Tier-1' },
    { id: 'statistics', label: 'Bases de Datos & Estadísticas' },
    { id: 'sentiment', label: 'Sentimiento & Posicionamiento COT' },
    { id: 'central_bank', label: 'Bancos Centrales & BIS' },
  ];

  const filteredSources = useMemo(() => {
    return GLOBAL_MACRO_SOURCES.filter((source) => {
      if (selectedCategory !== 'all' && source.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = source.name.toLowerCase().includes(query);
        const matchesDesc = source.description.toLowerCase().includes(query);
        const matchesCoverage = source.coverage.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCoverage) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Aggregator Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded">
                MACRO PORTAL DIRECTORY
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-400">Las Mejores Fuentes Globales Centralizadas</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Agregador Económico Global
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Acceso directo y organizado a las fuentes de datos económicos y medios de mayor prestigio para traders institucionales: Trading Economics, Investing.com, Bloomberg, Reuters, FRED y CFTC COT.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Sources Counter */}
            <div className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="text-slate-500">Fuentes Verificadas: </span>
              <span className="font-mono font-bold text-cyan-400">{GLOBAL_MACRO_SOURCES.length} Portales</span>
            </div>
          </div>
        </div>

        {/* Filter categories & Search bar */}
        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar fuente por nombre o tema..."
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
      </div>

      {/* Featured Bloomberg Live Broadcast Card */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-rose-500/30 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold text-xs shrink-0 font-mono">
            LIVE
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                Transmisión Oficial en Vivo
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300">Bloomberg Television & Radio</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Sigue la apertura de mercados, conferencias de la Fed y datos de empleo en directo
            </h2>
            <p className="text-xs text-slate-400">
              Cobertura 24/7 con análisis de mesas de inversión institucionales, entrevistas a gobernadores y comentarios de mercado al instante.
            </p>
          </div>
        </div>

        <a
          href="https://www.bloomberg.com/live"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <span>Ver Bloomberg Live TV</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Grid of Global Economic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              {/* Header with Logo Badge & Link */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm border ${source.badgeColor}`}>
                    {source.logoText}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {source.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {source.domain}
                    </div>
                  </div>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition-colors"
                  title={`Abrir ${source.name} en una nueva pestaña`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {source.description}
              </p>

              {/* Key Features Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  Características Destacadas:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {source.keyFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] bg-slate-950 text-slate-300 rounded border border-slate-850"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom info strip + CTA */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] truncate max-w-[180px]">
                {source.coverage}
              </span>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                <span>Acceder al Sitio</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Live Aggregated Macro News Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                Titulares y Flujo de Noticias Macroeconómicas en Tiempo Real
              </h2>
              <div className="text-xs text-slate-400">
                Sondeo de Bloomberg, Reuters, Forex Factory y comunicados de Bancos Centrales
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono tabular-nums">
            Última actualización: hace instantes
          </div>
        </div>

        {/* News Cards List */}
        <div className="space-y-3">
          {MACRO_NEWS_FEED.map((news) => {
            const isSelected = selectedNews?.id === news.id;
            return (
              <div
                key={news.id}
                onClick={() => setSelectedNews(isSelected ? null : news)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-850 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-850/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-cyan-400">{news.source}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-mono tabular-nums">{news.timeAgo} ({news.timestamp})</span>
                      <span className="text-slate-500">·</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">Divisas:</span>
                        {news.currencyImpact.map((curr) => (
                          <span
                            key={curr}
                            className="px-1.5 py-0.2 rounded font-mono font-bold text-[10px] bg-slate-800 text-slate-200 border border-slate-700"
                          >
                            {curr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                      {news.title}
                    </h3>
                  </div>

                  <a
                    href={news.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-slate-400 hover:text-cyan-400 rounded shrink-0"
                    title="Ver fuente original"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {news.summary}
                </p>

                {/* Expanded Details when selected */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <div className="font-semibold text-cyan-400 mb-1">
                        💡 Conclusión Clave para Traders:
                      </div>
                      <div className="text-slate-300">
                        {news.keyTakeaway}
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <div className="font-semibold text-emerald-400 mb-1">
                        📊 Reacción en los Gráficos:
                      </div>
                      <div className="text-slate-300">
                        {news.marketReaction}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
