import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  pair: string;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  high: number;
  low: number;
  sparkline: number[];
}

interface MarketTickerProps {
  items: TickerItem[];
  selectedPair: string;
  onSelectPair: (pair: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  items,
  selectedPair,
  onSelectPair,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 overflow-x-auto scrollbar-none py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2 border-r border-slate-800">
          FX SPOT
        </span>

        {items.map((item) => {
          const isSelected = selectedPair === item.pair;
          const isPositive = item.change >= 0;
          
          // Calculate mini sparkline SVG points
          const minVal = Math.min(...item.sparkline);
          const maxVal = Math.max(...item.sparkline);
          const range = maxVal - minVal || 1;
          const points = item.sparkline
            .map((val, idx) => {
              const x = (idx / (item.sparkline.length - 1)) * 36;
              const y = 14 - ((val - minVal) / range) * 12;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <button
              key={item.pair}
              onClick={() => onSelectPair(item.pair)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded transition-all cursor-pointer text-left ${
                isSelected
                  ? 'bg-slate-800 ring-1 ring-cyan-500/50 shadow-sm'
                  : 'bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-200">{item.pair}</span>
                  <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                    {item.spread}p
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] tabular-nums">
                  <span className="text-slate-100 font-semibold">{item.bid.toFixed(item.pair.includes('JPY') ? 2 : item.pair.includes('XAU') ? 2 : 4)}</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="w-9 h-4 flex items-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 36 14">
                  <polyline
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>

              {/* Change % */}
              <div className={`flex items-center text-[10px] font-mono font-semibold tabular-nums ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 shrink-0" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 shrink-0" />
                )}
                <span>{isPositive ? '+' : ''}{item.change.toFixed(2)}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
