import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Target, 
  BarChart3, 
  Clock, 
  ChevronRight,
  Landmark,
  Scale
} from 'lucide-react';
import { CentralBank, PairLevelData } from '../types/forex';

interface CentralBanksViewProps {
  centralBanks: CentralBank[];
  onSelectPairToCalculate?: (pair: string, price: number) => void;
}

export const CentralBanksView: React.FC<CentralBanksViewProps> = ({
  centralBanks,
  onSelectPairToCalculate,
}) => {
  const [selectedBankId, setSelectedBankId] = useState<string>('FED');
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);

  const activeBank = centralBanks.find((b) => b.id === selectedBankId) || centralBanks[0];
  const activePairData: PairLevelData = activeBank.keyLevels[selectedPairIndex] || activeBank.keyLevels[0];

  // Helper for stance color
  const getStanceBadge = (stance: string) => {
    switch (stance) {
      case 'Hawkish':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Dovish':
      case 'Dovish-Pivot':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-5">
      {/* Central Banks Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                INSTITUTIONAL DESK & CENTRAL BANKS
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-400">Flujo de Órdenes & Política Monetaria</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Niveles Clave e Interés de Bancos Centrales
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Análisis comparativo de tasas de interés de los principales bancos centrales (FED, BCE, BOE, BOJ, BOC, RBA, SNB), probabilidades de mercado y mapas de liquidez institucional bancaria.
            </p>
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-slate-300">
              <span className="text-slate-500">Mayor diferencial Carry Trade: </span>
              <span className="font-mono font-bold text-emerald-400">USD/JPY (+4.63% anual)</span>
            </div>
          </div>
        </div>

        {/* Central Banks Selector Strip */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {centralBanks.map((bank) => {
            const isSelected = bank.id === selectedBankId;
            return (
              <button
                key={bank.id}
                onClick={() => {
                  setSelectedBankId(bank.id);
                  setSelectedPairIndex(0);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{bank.flag}</span>
                    <span className="font-bold text-xs text-slate-200">{bank.id}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${getStanceBadge(bank.stance)}`}>
                    {bank.stance}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="text-sm font-bold font-mono text-cyan-400 tabular-nums">
                    {bank.currentRate}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {bank.economy}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive View for Selected Central Bank */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Bank Overview & Meeting Probabilities */}
        <div className="space-y-4 lg:col-span-1">
          {/* Bank Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeBank.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{activeBank.fullName}</h3>
                  <div className="text-xs text-slate-400">Gobernador / Chair: <span className="text-slate-200 font-medium">{activeBank.chair}</span></div>
                </div>
              </div>
            </div>

            {/* Interest Rate & Meeting Countdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">TASA ACTUAL</div>
                <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums mt-0.5">
                  {activeBank.currentRate}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Postura {activeBank.stance}</div>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">PRÓXIMA REUNIÓN</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {activeBank.nextMeetingDate}
                </div>
                <div className="text-[10px] text-amber-400 flex items-center gap-1 mt-1 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>En {activeBank.daysToMeeting} días</span>
                </div>
              </div>
            </div>

            {/* Probability Breakdown Bar */}
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Expectativa de Mercado:</span>
                <span className="text-cyan-400 font-semibold font-mono text-[11px]">{activeBank.probabilities.expectedBps}</span>
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {activeBank.marketExpectation}
              </div>

              {/* Progress bar visualizer */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 transition-all duration-300"
                  style={{ width: `${activeBank.probabilities.cut}%` }}
                  title={`Recorte: ${activeBank.probabilities.cut}%`}
                />
                <div
                  className="bg-amber-500 transition-all duration-300"
                  style={{ width: `${activeBank.probabilities.hold}%` }}
                  title={`Mantener: ${activeBank.probabilities.hold}%`}
                />
                <div
                  className="bg-rose-500 transition-all duration-300"
                  style={{ width: `${activeBank.probabilities.hike}%` }}
                  title={`Alza: ${activeBank.probabilities.hike}%`}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span className="text-emerald-400">Recorte: {activeBank.probabilities.cut}%</span>
                <span className="text-amber-400">Mantener: {activeBank.probabilities.hold}%</span>
                <span className="text-rose-400">Alza: {activeBank.probabilities.hike}%</span>
              </div>
            </div>

            {/* Latest Official Guidance */}
            <div className="p-3 rounded bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" />
                Declaración Reciente del Directorio
              </span>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {activeBank.latestGuidance}
              </p>
            </div>

            {/* Drivers list */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Factores Clave de Decisión:
              </span>
              <ul className="space-y-1">
                {activeBank.monetaryDrivers.map((driver, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Columns: Institutional Price Levels & Order Flow Visualizer */}
        <div className="space-y-4 lg:col-span-2">
          {/* Pair Selector for this Bank */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Zonas de Liquidez & Niveles Institucionales
                  </h3>
                  <div className="text-xs text-slate-400">
                    Grandes mesas de dinero bancarias (Tier 1 Banks) & Defensa de Bancos Centrales
                  </div>
                </div>
              </div>

              {/* Pair tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {activeBank.keyLevels.map((lvl, idx) => (
                  <button
                    key={lvl.pair}
                    onClick={() => setSelectedPairIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-colors ${
                      selectedPairIndex === idx
                        ? 'bg-slate-800 text-cyan-400 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl.pair}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Selected Pair Status Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">PRECIO SPOT ACTUAL</div>
                <div className="text-lg font-bold font-mono text-white tabular-nums">
                  {activePairData.spotPrice}
                </div>
                <div className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${
                  activePairData.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {activePairData.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{activePairData.change24h >= 0 ? '+' : ''}{activePairData.change24h}% (24h)</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">TENDENCIA ESTRUCTURAL</div>
                <div className="text-sm font-bold capitalize text-slate-200 mt-1">
                  {activePairData.trend === 'bullish' ? '🟢 Alcista (Bullish)' : activePairData.trend === 'bearish' ? '🔴 Bajista (Bearish)' : '🟡 Lateral (Rango)'}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Rango diario: ~{activePairData.impliedDailyRangePips} pips
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">PISCINA DE VENTA (ASK POOL)</div>
                <div className="text-sm font-bold font-mono text-rose-400 tabular-nums mt-1">
                  {activePairData.institutionalAsk}
                </div>
                <div className="text-[10px] text-slate-400">Resistencia institucional</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">PISCINA DE COMPRA (BID POOL)</div>
                <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums mt-1">
                  {activePairData.institutionalBid}
                </div>
                <div className="text-[10px] text-slate-400">Soporte institucional</div>
              </div>
            </div>

            {/* Visual Interactive Order Flow & Institutional Ladder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Mapa de Niveles & Puntos de Reversión (Order Flow Ladder)
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Valores en cotización exacta
                </span>
              </div>

              {/* Ladder Stack */}
              <div className="space-y-1.5 font-mono text-xs tabular-nums">
                {/* Institutional Ask Pool */}
                <div className="flex items-center justify-between p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[10px] bg-rose-500/20 px-1.5 py-0.5 rounded">VENTA INSTITUCIONAL</span>
                    <span className="text-slate-300">Piscina de Liquidez Superior (Take-Profit de Compradores)</span>
                  </div>
                  <span className="font-bold">{activePairData.institutionalAsk}</span>
                </div>

                {/* Resistance 2 */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">RESISTENCIA 2 (R2)</span>
                    <span className="text-slate-400 text-[11px]">Nivel de expansión de volatilidad</span>
                  </div>
                  <span className="font-semibold text-slate-200">{activePairData.resistance2}</span>
                </div>

                {/* Resistance 1 */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">RESISTENCIA 1 (R1)</span>
                    <span className="text-slate-400 text-[11px]">Techo intradiario</span>
                  </div>
                  <span className="font-semibold text-slate-200">{activePairData.resistance1}</span>
                </div>

                {/* SPOT PRICE HIGHLIGHT */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[11px] bg-cyan-400 text-slate-950 px-2 py-0.5 rounded">PRECIO ACTUAL SPOT</span>
                    <span className="text-cyan-100 font-sans font-medium text-xs">Punto de equilibrio en tiempo real</span>
                  </div>
                  <span className="font-extrabold text-base text-cyan-300">{activePairData.spotPrice}</span>
                </div>

                {/* Support 1 */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">SOPORTE 1 (S1)</span>
                    <span className="text-slate-400 text-[11px]">Suelo intradiario</span>
                  </div>
                  <span className="font-semibold text-slate-200">{activePairData.support1}</span>
                </div>

                {/* Support 2 */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">SOPORTE 2 (S2)</span>
                    <span className="text-slate-400 text-[11px]">Zona de rebote macro</span>
                  </div>
                  <span className="font-semibold text-slate-200">{activePairData.support2}</span>
                </div>

                {/* Institutional Bid Pool */}
                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">COMPRA INSTITUCIONAL</span>
                    <span className="text-slate-300">Piscina de Liquidez Inferior (Bloque de órdenes comprador)</span>
                  </div>
                  <span className="font-bold">{activePairData.institutionalBid}</span>
                </div>
              </div>
            </div>

            {/* Smart Money Concepts & Central Bank Defense Commentary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Defensa & Barrera del Banco Central
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePairData.defenseZoneComment}
                </p>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Fair Value Gap (FVG) & Order Block
                </span>
                <div className="text-xs space-y-1">
                  <div className="text-slate-300">
                    <span className="text-slate-500">FVG / Desbalance: </span>
                    <span className="font-mono text-cyan-300">{activePairData.fairValueGap}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Order Block Bancario: </span>
                    <span className="font-mono text-emerald-300">{activePairData.orderBlockRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
