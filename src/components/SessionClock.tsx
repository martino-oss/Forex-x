import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { TRADING_SESSIONS } from '../data/mockForexData';

interface SessionClockProps {
  currentUtcTime: string;
}

export const SessionClock: React.FC<SessionClockProps> = ({ currentUtcTime }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
            Sesiones de Mercado Forex & Ventana de Liquidez
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono tabular-nums">
            <span className="text-slate-500">Hora UTC:</span>
            <span className="font-semibold text-cyan-300">{currentUtcTime}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
            <Zap className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="font-medium">Ventana Dorada: Solapamiento Londres / NY</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-3">
        {TRADING_SESSIONS.map((session) => (
          <div
            key={session.city}
            className={`p-2.5 rounded border transition-colors ${
              session.isActive
                ? 'bg-slate-850 border-cyan-500/30 ring-1 ring-cyan-500/20'
                : 'bg-slate-950/40 border-slate-800/60 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-200">{session.city}</span>
              <span className={`text-[10px] font-mono font-medium ${session.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                {session.isActive ? 'ABIERTA' : 'CERRADA'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono tabular-nums">
              <span>{session.openUtc}:00 - {session.closeUtc}:00 UTC</span>
              <span className="text-slate-500">{session.volumeShare} vol</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
