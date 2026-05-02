// Shared types used across screens.

import type { RiskLevel } from '@/theme';

export type ScreenName =
  | 'welcome'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'reading1'
  | 'reading2'
  | 'reading3'
  | 'reading4'
  | 'history'
  | 'alert'
  | 'alert-critical'
  | 'profile'
  | 'chat'
  | 'tips'
  | 'fab';

export type Go = (s: ScreenName | string) => void;

export type ProteinuriaValue = 'neg' | 'trace' | 'plus1' | 'plus2' | 'plus3';

export interface ReadingData {
  sys: number;
  dia: number;
  hr: number;
  weight: number;
  temp: number;
  glu: number;
  head: number;
  epi: number;
  edema: number;
  visual: boolean;
  proteinuria: ProteinuriaValue;
}

export type SetReadingData = React.Dispatch<React.SetStateAction<ReadingData>>;

export type IndicatorStyle = 'bold' | 'editorial' | 'banner' | 'thermo' | 'gauge' | 'ring' | 'breath';

export type { RiskLevel };
