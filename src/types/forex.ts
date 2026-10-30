export type ImpactLevel = 'high' | 'medium' | 'low' | 'non-economic';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'NZD' | 'CNY';

export interface EconomicEvent {
  id: string;
  date: string; // e.g. "2026-10-30"
  displayDate: string; // e.g. "Viernes, 30 Oct"
  time: string; // e.g. "08:30"
  timeUtc: string;
  currency: CurrencyCode;
  countryName: string;
  countryFlag: string;
  impact: ImpactLevel;
  eventName: string;
  actual?: string;
  forecast: string;
  previous: string;
  status: 'completed' | 'upcoming' | 'live';
  sentiment?: 'better' | 'worse' | 'neutral' | 'pending';
  affectedPairs: string[];
  category: 'interest_rate' | 'inflation' | 'employment' | 'gdp' | 'central_bank' | 'trade' | 'pmi';
  historicalVolatilityPips: number;
  description: string;
  institutionalAnalysis: string;
  speechSpeaker?: string;
}

export interface PairLevelData {
  pair: string;
  spotPrice: number;
  change24h: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  institutionalBid: number; // Institutional liquidity buy pool
  institutionalAsk: number; // Institutional liquidity sell pool
  support1: number;
  support2: number;
  resistance1: number;
  resistance2: number;
  fairValueGap: string;
  defenseZoneComment: string;
  orderBlockRange: string;
  sentimentPercentLong: number;
  impliedDailyRangePips: number;
}

export interface CentralBank {
  id: 'FED' | 'ECB' | 'BOE' | 'BOJ' | 'SNB' | 'BOC' | 'RBA';
  fullName: string;
  economy: string;
  currency: CurrencyCode;
  flag: string;
  currentRate: string;
  rateValue: number;
  stance: 'Hawkish' | 'Dovish' | 'Neutral' | 'Dovish-Pivot';
  chair: string;
  nextMeetingDate: string;
  daysToMeeting: number;
  marketExpectation: string;
  probabilities: {
    cut: number;
    hold: number;
    hike: number;
    expectedBps: string;
  };
  policySummary: string;
  latestGuidance: string;
  monetaryDrivers: string[];
  keyLevels: PairLevelData[];
}

export interface MacroSource {
  id: string;
  name: string;
  url: string;
  domain: string;
  logoText: string;
  badgeColor: string;
  category: 'calendar' | 'macro_news' | 'statistics' | 'sentiment' | 'central_bank';
  description: string;
  keyFeatures: string[];
  coverage: string;
  recommendedFor: string;
  isDirectLink: boolean;
}

export interface MacroNewsFeedItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  timeAgo: string;
  timestamp: string;
  currencyImpact: CurrencyCode[];
  impactLevel: ImpactLevel;
  summary: string;
  keyTakeaway: string;
  marketReaction: string;
}

export interface TradingSession {
  name: string;
  city: string;
  currency: CurrencyCode;
  openUtc: number; // hour 0-23
  closeUtc: number;
  isActive: boolean;
  overlapWith?: string;
  volumeShare: string;
  averagePipVolatility: number;
}
