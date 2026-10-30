import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { SessionClock } from './components/SessionClock';
import { ForexFactoryCalendar } from './components/ForexFactoryCalendar';
import { CentralBanksView } from './components/CentralBanksView';
import { EconomicAggregator } from './components/EconomicAggregator';
import { TradingTools } from './components/TradingTools';
import { 
  INITIAL_ECONOMIC_EVENTS, 
  CENTRAL_BANKS_DATA, 
  MAJOR_PAIRS_TICKER 
} from './data/mockForexData';
import { EconomicEvent } from './types/forex';
import { Bell, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'banks' | 'aggregator' | 'tools'>('calendar');
  const [events, setEvents] = useState<EconomicEvent[]>(INITIAL_ECONOMIC_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [tickerItems, setTickerItems] = useState(MAJOR_PAIRS_TICKER);
  const [selectedPair, setSelectedPair] = useState<string>('EUR/USD');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationToast, setSimulationToast] = useState<{
    title: string;
    message: string;
    type: 'success' | 'alert';
  } | null>(null);

  // Live UTC Clock
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Periodic subtle price flutter to give authentic live terminal sensation
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setTickerItems((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.49) * (item.pair.includes('JPY') ? 0.04 : item.pair.includes('XAU') ? 0.8 : 0.0004);
          const newBid = Number((item.bid + delta).toFixed(item.pair.includes('JPY') ? 2 : item.pair.includes('XAU') ? 2 : 4));
          const newAsk = Number((newBid + (item.spread * (item.pair.includes('JPY') ? 0.01 : 0.0001))).toFixed(item.pair.includes('JPY') ? 2 : item.pair.includes('XAU') ? 2 : 4));
          const updatedSpark = [...item.sparkline.slice(1), newBid];
          return {
            ...item,
            bid: newBid,
            ask: newAsk,
            sparkline: updatedSpark
          };
        })
      );
    }, 4000);

    return () => clearInterval(priceInterval);
  }, []);

  // Interactive Live Release Simulation Handler
  const handleSimulateRelease = () => {
    setIsSimulating(true);

    // Pick an upcoming event or re-simulate
    setTimeout(() => {
      // Simulate release of flash European CPI or US PCE
      const updatedEvent: EconomicEvent = {
        id: `ff-sim-${Date.now()}`,
        date: '2026-10-30',
        displayDate: 'Hoy, 30 Octubre',
        time: '14:30',
        timeUtc: '18:30 UTC',
        currency: 'USD',
        countryName: 'Estados Unidos',
        countryFlag: '🇺🇸',
        impact: 'high',
        eventName: 'Índice de Precios del Gasto en Consumo Personal Subyacente (Core PCE m/m)',
        actual: '0.3%',
        forecast: '0.2%',
        previous: '0.1%',
        status: 'completed',
        sentiment: 'better', // USD positive
        affectedPairs: ['EUR/USD', 'USD/JPY', 'XAU/USD', 'DXY'],
        category: 'inflation',
        historicalVolatilityPips: 48,
        description: 'El indicador de inflación preferido por la Reserva Federal superó levemente el pronóstico en +0.1%, mostrando resiliencia en la inflación de servicios.',
        institutionalAnalysis: 'Publicación en vivo: Inflación pegajosa en EE.UU. Eleva los rendimientos del Tesoro y genera presión vendedora sobre EUR/USD y Oro al contado.'
      };

      setEvents((prev) => [updatedEvent, ...prev]);
      setSelectedEvent(updatedEvent);

      // React ticker prices instantly!
      setTickerItems((prev) =>
        prev.map((item) => {
          if (item.pair === 'EUR/USD') {
            return { ...item, bid: 1.0820, ask: 1.0821, change: -0.52 };
          }
          if (item.pair === 'USD/JPY') {
            return { ...item, bid: 153.75, ask: 153.77, change: +0.78 };
          }
          if (item.pair === 'DXY') {
            return { ...item, bid: 104.65, ask: 104.67, change: +0.55 };
          }
          if (item.pair === 'XAU/USD') {
            return { ...item, bid: 2736.00, ask: 2736.60, change: -0.90 };
          }
          return item;
        })
      );

      setIsSimulating(false);
      setSimulationToast({
        title: '¡DATO ECONÓMICO PUBLICADO EN VIVO!',
        message: 'Core PCE de EE.UU. subió a 0.3% vs 0.2% esperado. Reacción alcista en USD (EUR/USD -22 pips, USD/JPY +50 pips).',
        type: 'alert'
      });

      // Auto-hide toast after 7s
      setTimeout(() => {
        setSimulationToast(null);
      }, 7000);
    }, 1200);
  };

  const handleSelectPairFromTicker = (pair: string) => {
    setSelectedPair(pair);
    // Switch to Central Banks tab to inspect that pair's institutional levels
    setActiveTab('banks');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract compliant Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSimulateRelease={handleSimulateRelease}
        isSimulating={isSimulating}
        lastUpdated="17:12 UTC"
      />

      {/* Spot Ticker Strip */}
      <MarketTicker
        items={tickerItems}
        selectedPair={selectedPair}
        onSelectPair={handleSelectPairFromTicker}
      />

      {/* Simulation Alert Toast */}
      {simulationToast && (
        <div className="bg-cyan-500/10 border-b border-cyan-500/30 px-4 py-2.5 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
                <Bell className="w-3.5 h-3.5 animate-bounce" />
              </span>
              <div>
                <span className="font-bold text-cyan-300">{simulationToast.title}: </span>
                <span className="text-slate-200">{simulationToast.message}</span>
              </div>
            </div>
            <button
              onClick={() => setSimulationToast(null)}
              className="text-slate-400 hover:text-white px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Session Market Clock */}
        <SessionClock currentUtcTime={utcTime || '17:12:00 UTC'} />

        {/* Tab 1: Forex Factory Calendar */}
        {activeTab === 'calendar' && (
          <ForexFactoryCalendar
            events={events}
            onSelectEvent={setSelectedEvent}
            selectedEvent={selectedEvent}
            onSimulateRelease={handleSimulateRelease}
            isSimulating={isSimulating}
          />
        )}

        {/* Tab 2: Central Banks & Key Levels */}
        {activeTab === 'banks' && (
          <CentralBanksView
            centralBanks={CENTRAL_BANKS_DATA}
            onSelectPairToCalculate={(pair) => {
              setSelectedPair(pair);
              setActiveTab('tools');
            }}
          />
        )}

        {/* Tab 3: Global Economic Aggregator */}
        {activeTab === 'aggregator' && (
          <EconomicAggregator />
        )}

        {/* Tab 4: Risk Calculator & Correlation */}
        {activeTab === 'tools' && (
          <TradingTools />
        )}
      </main>

      {/* Professional Dark Terminal Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">ForexPulse Terminal</span>
            <span aria-hidden="true">·</span>
            <span>Datos agregados de Forex Factory, Trading Economics, Reuters & Bloomberg</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <a
              href="https://www.bloomberg.com/live"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Bloomberg Live (TV & Audio)</span>
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Aviso de Riesgo: El trading de divisas (Forex) conlleva alto riesgo.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
