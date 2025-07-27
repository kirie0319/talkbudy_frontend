export interface Language {
  code: string;
  label: string;
  shortName: string;
  voiceCode: string;
  enabled: boolean;  // UI表示制御
}

export const languages: Language[] = [
  { 
    code: 'ja', 
    label: '🇯🇵 日本語', 
    shortName: '日本語', 
    voiceCode: 'ja-JP',
    enabled: true 
  },
  { 
    code: 'en', 
    label: '🇺🇸 English', 
    shortName: 'English', 
    voiceCode: 'en-US',
    enabled: true 
  },
  { 
    code: 'ko', 
    label: '🇰🇷 한국어', 
    shortName: '한국어', 
    voiceCode: 'ko-KR',
    enabled: true 
  },
  { 
    code: 'zh', 
    label: '🇨🇳 中文', 
    shortName: '中文', 
    voiceCode: 'zh-CN',
    enabled: true 
  },
  { 
    code: 'es', 
    label: '🇪🇸 Español', 
    shortName: 'Español', 
    voiceCode: 'es-ES',
    enabled: true 
  },
  { 
    code: 'fr', 
    label: '🇫🇷 Français', 
    shortName: 'Français', 
    voiceCode: 'fr-FR',
    enabled: true 
  },
  { 
    code: 'de', 
    label: '🇩🇪 Deutsch', 
    shortName: 'Deutsch', 
    voiceCode: 'de-DE',
    enabled: true 
  },
  { 
    code: 'it', 
    label: '🇮🇹 Italiano', 
    shortName: 'Italiano', 
    voiceCode: 'it-IT',
    enabled: true 
  },
  { 
    code: 'pt', 
    label: '🇵🇹 Português', 
    shortName: 'Português', 
    voiceCode: 'pt-BR',
    enabled: true 
  },
  { 
    code: 'ru', 
    label: '🇷🇺 Русский', 
    shortName: 'Русский', 
    voiceCode: 'ru-RU',
    enabled: true 
  },
  // 音声認識のみサポート（UI非表示）
  { 
    code: 'ar', 
    label: '🇸🇦 العربية', 
    shortName: 'العربية', 
    voiceCode: 'ar-SA',
    enabled: false 
  },
  { 
    code: 'hi', 
    label: '🇮🇳 हिन्दी', 
    shortName: 'हिन्दी', 
    voiceCode: 'hi-IN',
    enabled: false 
  },
  { 
    code: 'th', 
    label: '🇹🇭 ไทย', 
    shortName: 'ไทย', 
    voiceCode: 'th-TH',
    enabled: false 
  },
  { 
    code: 'vi', 
    label: '🇻🇳 Tiếng Việt', 
    shortName: 'Tiếng Việt', 
    voiceCode: 'vi-VN',
    enabled: false 
  },
  { 
    code: 'id', 
    label: '🇮🇩 Bahasa Indonesia', 
    shortName: 'Bahasa Indonesia', 
    voiceCode: 'id-ID',
    enabled: false 
  },
  { 
    code: 'ms', 
    label: '🇲🇾 Bahasa Melayu', 
    shortName: 'Bahasa Melayu', 
    voiceCode: 'ms-MY',
    enabled: false 
  },
  { 
    code: 'tr', 
    label: '🇹🇷 Türkçe', 
    shortName: 'Türkçe', 
    voiceCode: 'tr-TR',
    enabled: false 
  },
  { 
    code: 'pl', 
    label: '🇵🇱 Polski', 
    shortName: 'Polski', 
    voiceCode: 'pl-PL',
    enabled: false 
  },
  { 
    code: 'nl', 
    label: '🇳🇱 Nederlands', 
    shortName: 'Nederlands', 
    voiceCode: 'nl-NL',
    enabled: false 
  },
  { 
    code: 'sv', 
    label: '🇸🇪 Svenska', 
    shortName: 'Svenska', 
    voiceCode: 'sv-SE',
    enabled: false 
  },
];

// DropdownコンポーネントのAPIとの互換性のための型定義
export interface LanguageOption {
  code: string;
  label: string;
  value: string;
  shortName: string;
}

/**
 * UI表示用の言語一覧を取得
 */
export const getDisplayLanguages = (): LanguageOption[] => {
  return languages
    .filter(lang => lang.enabled)
    .map(lang => ({
      code: lang.code,
      label: lang.label,
      value: lang.code,  // Dropdownコンポーネントとの互換性
      shortName: lang.shortName,
    }));
};

/**
 * 言語コードから表示名を取得
 */
export const getLanguageName = (code: string): string => {
  const language = languages.find(lang => lang.code === code);
  return language?.shortName || code.toUpperCase();
};

/**
 * 言語コードから音声認識用の言語コードを取得
 */
export const getVoiceLanguageCode = (code: string): string => {
  const language = languages.find(lang => lang.code === code);
  return language?.voiceCode || 'en-US';
};

/**
 * 全言語（有効・無効問わず）の一覧を取得
 */
export const getAllLanguages = (): Language[] => {
  return languages;
};

/**
 * 特定の言語が音声認識に対応しているかチェック
 */
export const isVoiceSupported = (code: string): boolean => {
  return languages.some(lang => lang.code === code);
};

/**
 * 特定の言語がUI表示対象かチェック
 */
export const isUILanguage = (code: string): boolean => {
  const language = languages.find(lang => lang.code === code);
  return language ? language.enabled : false;
}; 