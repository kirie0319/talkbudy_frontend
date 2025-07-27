import { Platform, NativeModules } from 'react-native';

// サポートする言語
export type SupportedLocale = 'ja' | 'en' | 'ko' | 'zh' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru';

// UIテキスト定義
export interface LocalizedTexts {
  startConversation: string;
  typeToTranslate: string;
  voiceInputAvailable: string;
  typeOrSpeak: string;
}

// 多言語テキスト辞書
const localizationData: Record<SupportedLocale, LocalizedTexts> = {
  ja: {
    startConversation: '会話を始める',
    typeToTranslate: 'テキストを入力して翻訳',
    voiceInputAvailable: 'チャットルームで音声入力が利用可能',
    typeOrSpeak: '入力または音声...',
  },
  en: {
    startConversation: 'Start a conversation',
    typeToTranslate: 'Type text to translate',
    voiceInputAvailable: 'Voice input available in chat rooms',
    typeOrSpeak: 'Type or speak...',
  },
  ko: {
    startConversation: '대화 시작하기',
    typeToTranslate: '번역할 텍스트를 입력하세요',
    voiceInputAvailable: '채팅방에서 음성 입력 사용 가능',
    typeOrSpeak: '입력 또는 음성...',
  },
  zh: {
    startConversation: '开始对话',
    typeToTranslate: '输入要翻译的文本',
    voiceInputAvailable: '聊天室可使用语音输入',
    typeOrSpeak: '输入或语音...',
  },
  es: {
    startConversation: 'Iniciar conversación',
    typeToTranslate: 'Escribe texto para traducir',
    voiceInputAvailable: 'Entrada de voz disponible en salas de chat',
    typeOrSpeak: 'Escribir o hablar...',
  },
  fr: {
    startConversation: 'Commencer une conversation',
    typeToTranslate: 'Tapez le texte à traduire',
    voiceInputAvailable: 'Saisie vocale disponible dans les salles de chat',
    typeOrSpeak: 'Taper ou parler...',
  },
  de: {
    startConversation: 'Gespräch beginnen',
    typeToTranslate: 'Text zum Übersetzen eingeben',
    voiceInputAvailable: 'Spracheingabe in Chatrooms verfügbar',
    typeOrSpeak: 'Tippen oder sprechen...',
  },
  it: {
    startConversation: 'Inizia una conversazione',
    typeToTranslate: 'Digita il testo da tradurre',
    voiceInputAvailable: 'Input vocale disponibile nelle chat room',
    typeOrSpeak: 'Digita o parla...',
  },
  pt: {
    startConversation: 'Iniciar conversa',
    typeToTranslate: 'Digite o texto para traduzir',
    voiceInputAvailable: 'Entrada de voz disponível em salas de chat',
    typeOrSpeak: 'Digite ou fale...',
  },
  ru: {
    startConversation: 'Начать разговор',
    typeToTranslate: 'Введите текст для перевода',
    voiceInputAvailable: 'Голосовой ввод доступен в чат-комнатах',
    typeOrSpeak: 'Ввести или говорить...',
  },
};

/**
 * デバイスの言語設定を取得
 */
const getDeviceLocale = (): SupportedLocale => {
  try {
    let locale = 'en';
    
    if (Platform.OS === 'ios') {
      // iOS の場合
      locale = NativeModules.SettingsManager?.settings?.AppleLocale || 
               NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
               'en';
    } else {
      // Android の場合（将来対応用）
      locale = NativeModules.I18nManager?.localeIdentifier || 'en';
    }

    // 言語コードを抽出（例：ja-JP -> ja）
    const langCode = locale.split('-')[0].split('_')[0].toLowerCase();
    
    // サポートしている言語かチェック
    if (Object.keys(localizationData).includes(langCode)) {
      return langCode as SupportedLocale;
    }
    
    return 'en'; // デフォルトは英語
  } catch (error) {
    console.log('[Localization] Error getting device locale:', error);
    return 'en';
  }
};

// 現在のロケール
let currentLocale: SupportedLocale = getDeviceLocale();

/**
 * 現在のロケールを取得
 */
export const getCurrentLocale = (): SupportedLocale => {
  return currentLocale;
};

/**
 * ロケールを設定
 */
export const setLocale = (locale: SupportedLocale): void => {
  currentLocale = locale;
};

/**
 * ローカライズされたテキストを取得
 */
export const getLocalizedText = (key: keyof LocalizedTexts): string => {
  return localizationData[currentLocale][key] || localizationData.en[key];
};

/**
 * すべてのローカライズされたテキストを取得
 */
export const getLocalizedTexts = (): LocalizedTexts => {
  return localizationData[currentLocale] || localizationData.en;
}; 