import { Alert } from 'react-native';
import { translationAPI } from '../services/api';
import { TranslationMessage } from '../types';
import { useTranslationStore } from '../stores/translationStore';
import { useAppStore } from '../stores/appStore';
import { useVoiceStore } from '../stores/voiceStore';

export const detectAndTranslate = async (
  text: string,
  isFromLangA: boolean = true
): Promise<void> => {
  if (!text.trim()) return;

  const { languageA, languageB, setInputText } = useAppStore.getState();
  const { messages, setIsTranslating, addMessage, isTranslating } = useTranslationStore.getState();
  const { isRecording } = useVoiceStore.getState();

  // 音声認識中または既に翻訳中の場合はスキップ
  if (isTranslating) {
    console.log(`[TranslationService] ⏭️ Skipping - translation already in progress for: "${text}"`);
    return;
  }

  if (isRecording) {
    console.log(`[TranslationService] 🎤 Skipping - voice recording in progress for: "${text}"`);
    return;
  }

  console.log(`[TranslationService] 🔄 Starting translation process...`);
  console.log(`[TranslationService] 📝 Text: "${text}", isFromLangA: ${isFromLangA}`);
  console.log(`[TranslationService] 🌐 Language settings - A: ${languageA}, B: ${languageB}`);

  setIsTranslating(true);
  setInputText('');

  try {
    // ユーザーが選択した言語設定を使用
    let sourceLang = isFromLangA ? languageA : languageB;
    let targetLang = isFromLangA ? languageB : languageA;
    let isLangA = isFromLangA;

    console.log(`[TranslationService] 🎯 Initial language pair - source: ${sourceLang}, target: ${targetLang}`);

    // 言語検出API呼び出し
    console.log(`[TranslationService] 🔍 Detecting language...`);
    const detectResponse = await translationAPI.detectLanguage({ text });
    let detectedLang = detectResponse.detected_language;
    console.log(`[TranslationService] 🔍 Detected language: ${detectedLang}`);

    // 検出された言語がユーザー選択と大きく異なる場合のみ調整
    if (detectedLang === languageB && isFromLangA) {
      // 検出言語がlanguageBで、languageA側から入力された場合は反転
      sourceLang = languageB;
      targetLang = languageA;
      isLangA = false;
      console.log(`[TranslationService] 🔄 Adjusted for detected language - source: ${sourceLang}, target: ${targetLang}`);
    } else if (detectedLang === languageA && !isFromLangA) {
      // 検出言語がlanguageAで、languageB側から入力された場合は反転
      sourceLang = languageA;
      targetLang = languageB;
      isLangA = true;
      console.log(`[TranslationService] 🔄 Adjusted for detected language - source: ${sourceLang}, target: ${targetLang}`);
    }

    // 翻訳API呼び出し
    console.log(`[TranslationService] 🌍 Translating "${text}" from ${sourceLang} to ${targetLang}...`);
    const translateResponse = await translationAPI.translateText({
      text,
      source_lang: sourceLang,
      target_lang: targetLang,
    });

    console.log(`[TranslationService] ✅ Translation completed - result: "${translateResponse.translated_text}"`);

    // Add to messages via store
    const newMessage: TranslationMessage = {
      id: Date.now().toString(),
      original: text,
      translated: translateResponse.translated_text,
      sourceLang,
      targetLang,
      isLangA,
      timestamp: new Date(),
    };

    console.log(`[TranslationService] 💬 Adding message to store:`, newMessage);
    addMessage(newMessage);
    console.log(`[TranslationService] ✅ Translation process completed successfully!`);
  } catch (error) {
    console.error(`[TranslationService] ❌ Translation error:`, error);
    Alert.alert('Error', `Failed to translate message: ${error}`);
  } finally {
    setIsTranslating(false);
  }
}; 