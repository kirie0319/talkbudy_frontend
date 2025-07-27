export interface TranslationMessage {
  id: string;
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  isLangA: boolean;
  timestamp: Date;
} 