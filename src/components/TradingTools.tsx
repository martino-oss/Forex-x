import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Percent, ShieldCheck, DollarSign, TrendingUp, Info } from 'lucide-react';

export const TradingTools: React.FC = () => {
  // Calculator state
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [selectedPair, setSelectedPair] = useState<string>('EUR/USD');

  // Calculation logic
  const isJpyPair = selectedPair.includes('JPY');
  const isGold = selectedPair.includes('XAU');

  // Pip value standard estimates for $100k lot
  const pipValuePerStandardLot = isJpyPair ? 6.55 : isGold ? 10.0 : 10.0;
  
  const riskAmount = (accountBalance * riskPercent) / 100;
  const standardLots = stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerStandardLot) : 0;
  const miniLots = standardLots * 10;
  const microLots = standardLots * 100;

  // Currency correlation matrix data
  const correlationMatrix = [
    { pair: 'EUR/USD', eurusd: 1.00, gbpusd: 0.86, usdjpy: -0.68, audusd: 0.74, usdcad: -0.71, xauusd: 0.65, dxy: -0.96 },
    { pair: 'GBP/USD', eurusd: 0.86, gbpusd: 1.00, usdjpy: -0.52, audusd: 0.69, usdcad: -0.65, xauusd: 0.58, dxy: -0.88 },
    { pair: 'USD/JPY', eurusd: -0.68, gbpusd: -0.52, usdjpy: 1.00, audusd: -0.45, usdcad: 0.78, xauusd: -0.32, dxy: 0.76 },
    { pair: 'AUD/USD', eurusd: 0.74, gbpusd: 0.69, usdjpy: -0.45, audusd: 1.00, usdcad: -0.82, xauusd: 0.78, dxy: -0.81 },
    { pair: 'USD/CAD', eurusd: -0.71, gbpusd: -0.65, usdjpy: 0.78, audusd: -0.82, usdcad: 1.00, xauusd: -0.62, dxy: 0.84 },
    { pair: 'XAU/USD', eurusd: 0.65, gbpusd: 0.58, usdjpy: -0.32, audusd: 0.78, usdcad: -0.62, xauusd: 1.00, dxy: -0.72 },
    { pair: 'DXY',     eurusd: -0.96, gbpusd: -0.88, usdjpy: 0.76, audusd: -0.81, usdcad: 0.84, xauusd: -0.72, dxy: 1.00 }
  ];

  const getCorrColor = (val: number) => {
    if (val === 1.0) return 'bg-slate-800 text-slate-400';
    if (val >= 0.7) return 'bg-emerald-500/20 text-emerald-300 font-bold';
    if (val >= 0.3) return 'bg-emerald-500/10 text-emerald-400';
    if (val <= -0.7) return 'bg-rose-500/20 text-rose-300 font-bold';
    if (val <= -0.3) return 'bg-rose-500/10 text-rose-400';
    return 'bg-slate-950 text-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
            RISK MANAGEMENT & CORRELATIONS
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">Herramientas Cuantitativas de Ejecución</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Calculadora de Lotes & Matriz de Correlación
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
          Calcule con precisión matemática el tamaño de lote adecuado para proteger el capital institucional durante publicaciones del calendario y evite sobreexposición por pares correlacionados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Position Size & Risk Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Calculadora de Tamaño de Posición</h2>
          </div>

          <div className="space-y-3.5">
            {/* Par selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Instrumento / Par de Divisas
              </label>
              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
              >
                <option value="EUR/USD">EUR/USD (Euro / US Dollar)</option>
                <option value="GBP/USD">GBP/USD (British Pound / US Dollar)</option>
                <option value="USD/JPY">USD/JPY (US Dollar / Japanese Yen)</option>
                <option value="AUD/USD">AUD/USD (Australian Dollar / US Dollar)</option>
                <option value="USD/CAD">USD/CAD (US Dollar / Canadian Dollar)</option>
                <option value="USD/CHF">USD/CHF (US Dollar / Swiss Franc)</option>
                <option value="XAU/USD">XAU/USD (Oro al contado en USD)</option>
              </select>
            </div>

            {/* Account Balance */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Balance de la Cuenta (USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="100"
                  step="500"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono tabular-nums"
                />
              </div>
            </div>

            {/* Risk Percentage */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Riesgo Máximo (%)
                </label>
                <div className="relative">
                  <Percent className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.25"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Stop Loss (Pips)
                </label>
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono tabular-nums"
                />
              </div>
            </div>

            {/* Quick Risk Buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500">Preset Riesgo:</span>
              {[0.5, 1.0, 1.5, 2.0].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRiskPercent(preset)}
                  className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                    riskPercent === preset
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-cyan-500/30 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-sans">Monto en Riesgo:</span>
              <span className="font-bold text-rose-400 text-sm">
                ${riskAmount.toFixed(2)} USD
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-sans">Lotes Estándar (100k):</span>
                <span className="font-extrabold text-cyan-400 text-base">
                  {standardLots.toFixed(2)} Lots
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-sans">Mini Lotes (10k):</span>
                <span className="font-semibold text-slate-200">
                  {miniLots.toFixed(1)} Mini
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-sans">Micro Lotes (1k):</span>
                <span className="font-semibold text-slate-300">
                  {microLots.toFixed(0)} Micro
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 font-sans flex items-center gap-1.5 border-t border-slate-850">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Protege tu cuenta nunca arriesgando más del 1-2% por operación.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Currency Correlation Heatmap Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-base font-bold text-white">Matriz de Correlación Macroeconómica</h2>
                <div className="text-xs text-slate-400">
                  Correlaciones calculadas a 90 días entre pares G10, Oro y Dólar (DXY)
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-emerald-500/30 rounded" /> Positiva (&gt;0.70)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-rose-500/30 rounded" /> Inversa (&lt;-0.70)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs font-mono tabular-nums">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400">
                  <th className="py-2 px-2 text-left">PAR</th>
                  <th className="py-2 px-2">EUR/USD</th>
                  <th className="py-2 px-2">GBP/USD</th>
                  <th className="py-2 px-2">USD/JPY</th>
                  <th className="py-2 px-2">AUD/USD</th>
                  <th className="py-2 px-2">USD/CAD</th>
                  <th className="py-2 px-2">XAU/USD</th>
                  <th className="py-2 px-2">DXY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {correlationMatrix.map((row) => (
                  <tr key={row.pair} className="hover:bg-slate-800/40">
                    <td className="py-2 px-2 text-left font-bold text-slate-200">
                      {row.pair}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.eurusd)}`}>
                      {row.eurusd.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.gbpusd)}`}>
                      {row.gbpusd.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.usdjpy)}`}>
                      {row.usdjpy.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.audusd)}`}>
                      {row.audusd.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.usdcad)}`}>
                      {row.usdcad.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.xauusd)}`}>
                      {row.xauusd.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 ${getCorrColor(row.dxy)}`}>
                      {row.dxy.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Regla de Oro en Macro Trading:
            </div>
            <p className="text-[11px] leading-relaxed">
              Comprar simultáneamente EUR/USD y vender USD/CHF representa esencialmente doblar el riesgo en la misma dirección debido a su correlación inversa cercana al -0.95. Utilice la matriz para diversificar exposiciones reales en lugar de apilar operaciones duplicadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
