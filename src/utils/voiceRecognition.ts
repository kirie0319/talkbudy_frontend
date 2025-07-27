import Voice from '@react-native-voice/voice';
import { Animated, Alert } from 'react-native';
import { getVoiceLanguageCode } from './languageManager';
import { useVoiceStore } from '../stores/voiceStore';
import { useAppStore } from '../stores/appStore';
import { detectAndTranslate } from './translationService';

export class VoiceRecognitionManager {
  private pulseAnim: Animated.Value;

  constructor(pulseAnim: Animated.Value) {
    this.pulseAnim = pulseAnim;
  }

  // Initialize Voice Recognition
  async initializeVoice(): Promise<void> {
    try {
      console.log(`[VOICE] 🎤 Initializing voice recognition...`);
      
      // 既存のイベントリスナーをクリアして重複登録を防ぐ
      Voice.removeAllListeners();
      
      // Set up event listeners
      Voice.onSpeechStart = this.onSpeechStart;
      Voice.onSpeechRecognized = this.onSpeechRecognized;
      Voice.onSpeechEnd = this.onSpeechEnd;
      Voice.onSpeechError = this.onSpeechError;
      Voice.onSpeechResults = this.onSpeechResults;
      Voice.onSpeechPartialResults = this.onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

      // Check if speech recognition is available
      const available = await Voice.isAvailable();
      useVoiceStore.getState().setIsVoiceAvailable(Boolean(available));
      console.log(`[VOICE] 🎤 Voice recognition available: ${available}`);
      
    } catch (error) {
      console.error(`[VOICE] ❌ Voice initialization failed:`, error);
      useVoiceStore.getState().setVoiceError(`Voice initialization failed: ${error}`);
      useVoiceStore.getState().setIsVoiceAvailable(false);
    }
  }

  // Cleanup Voice Recognition
  async cleanupVoice(): Promise<void> {
    try {
      console.log(`[VOICE] 🧹 Cleaning up voice recognition...`);
      await Voice.destroy();
      Voice.removeAllListeners();
    } catch (error) {
      console.error(`[VOICE] ❌ Voice cleanup failed:`, error);
    }
  }

  // Voice Event Handlers
  private onSpeechStart = (e: any) => {
    console.log(`[VOICE] 🎤 Speech recognition started`, e);
    const { setIsRecording, setVoiceError, setRecordingText } = useVoiceStore.getState();
    const { setInputText } = useAppStore.getState();
    
    setIsRecording(true);
    setVoiceError('');
    setRecordingText('Listening...');
    setInputText(''); // 音声認識開始時にテキストエリアをクリア
    
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(this.pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  private onSpeechRecognized = (e: any) => {
    console.log(`[VOICE] 🎤 Speech recognized`, e);
  };

  private onSpeechResults = (e: any) => {
    console.log(`[VOICE] 🎤 Final speech results:`, e);
    const results = e.value || [];
    const { recordingLanguage, setVoiceResults, setRecordingText } = useVoiceStore.getState();
    const { languageA, setInputText } = useAppStore.getState();
    
    setVoiceResults(results);
    
    if (results.length > 0) {
      const finalText = results[0];
      console.log(`[VOICE] 📝 Final recognized text: "${finalText}"`);
      
      // テキストエリアに表示するが、まだ翻訳は実行しない
      setInputText(finalText);
      console.log(`[VOICE] 📝 Text set to input area: "${finalText}"`);
    }
    
    setRecordingText('');
  };

  private onSpeechPartialResults = (e: any) => {
    console.log(`[VOICE] 🎤 Partial speech results:`, e);
    const partialResults = e.value || [];
    
    if (partialResults.length > 0) {
      const currentText = partialResults[0];
      useVoiceStore.getState().setRecordingText(currentText);
      console.log(`[VOICE] 📝 Current recognition (partial): "${currentText}"`);
    }
  };

  private onSpeechVolumeChanged = (e: any) => {
    // Volume level can be used for visual feedback
    // console.log(`[VOICE] 🔊 Volume changed:`, e.value);
  };

  private onSpeechEnd = (e: any) => {
    console.log(`[VOICE] 🎤 Speech recognition ended`, e);
    const { setIsRecording, setActiveInput, setRecordingText, recordingLanguage } = useVoiceStore.getState();
    const { languageA, inputText } = useAppStore.getState();
    
    setIsRecording(false);
    setActiveInput(null);
    setRecordingText('');
    this.pulseAnim.stopAnimation();
    this.pulseAnim.setValue(0);

    // 音声認識完了時に翻訳を実行
    if (inputText.trim()) {
      const isFromLangA = recordingLanguage === languageA;
      console.log(`[VOICE] 🔄 Speech ended - triggering translation for: "${inputText}"`);
      detectAndTranslate(inputText, isFromLangA);
    }
  };

  private onSpeechError = (e: any) => {
    console.error(`[VOICE] ❌ Speech recognition error:`, e);
    const { setIsRecording, setActiveInput, setVoiceError, setRecordingText } = useVoiceStore.getState();
    
    setIsRecording(false);
    setActiveInput(null);
    setVoiceError(`Speech recognition error: ${e.error}`);
    setRecordingText('');
    this.pulseAnim.stopAnimation();
    this.pulseAnim.setValue(0);
  };

  // 音声認識開始
  async startRecording(language: string): Promise<void> {
    console.log(`[VoiceManager] 🎤 Starting recording for language: ${language}`);
    
    const { isVoiceAvailable } = useVoiceStore.getState();
    const { languageA, setInputText } = useAppStore.getState();
    
    if (!isVoiceAvailable) {
      Alert.alert(
        'Voice Recognition Unavailable',
        'Speech recognition is not available on this device.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const {
        setVoiceError,
        setVoiceResults,
        setRecordingText,
        setRecordingLanguage,
        setActiveInput
      } = useVoiceStore.getState();
      
      // Reset states and clear input text
      setVoiceError('');
      setVoiceResults([]);
      setRecordingText('');
      setInputText(''); // 前回の認識結果をクリア
      
      // Set recording language and active input
      setRecordingLanguage(language);
      const isLanguageA = language === languageA;
      setActiveInput(isLanguageA ? 'A' : 'B');
      
      // Convert language code to the format expected by Voice API
      const voiceLanguage = getVoiceLanguageCode(language);
      console.log(`[VOICE] 🌍 Starting recognition for language: ${language} (${voiceLanguage})`);
      
      // Start voice recognition
      await Voice.start(voiceLanguage);
      console.log(`[VOICE] 🎤 Voice recognition started for ${voiceLanguage}`);
      
    } catch (error) {
      console.error(`[VOICE] ❌ Failed to start voice recognition:`, error);
      const { setVoiceError, setActiveInput } = useVoiceStore.getState();
      
      setVoiceError(`Failed to start recording: ${error}`);
      setActiveInput(null);
      Alert.alert(
        'Recording Error',
        `Failed to start voice recognition: ${error}`,
        [{ text: 'OK' }]
      );
    }
  }

  // 音声認識停止
  async stopRecording(): Promise<void> {
    console.log(`[VoiceManager] 🎤 Stopping recording`);
    
    try {
      await Voice.stop();
      console.log(`[VOICE] 🛑 Voice recognition stopped`);
    } catch (error) {
      console.error(`[VOICE] ❌ Failed to stop voice recognition:`, error);
    }
    
    // Reset states
    const { setActiveInput, setRecordingLanguage } = useVoiceStore.getState();
    setActiveInput(null);
    setRecordingLanguage(null);
  }
} 