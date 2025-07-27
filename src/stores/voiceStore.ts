import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface VoiceState {
  // Voice Recording States
  isRecording: boolean;
  recordingLanguage: string | null;
  recordingText: string;
  isVoiceAvailable: boolean;
  voiceResults: string[];
  voiceError: string;
  activeInput: 'A' | 'B' | null;
  
  // Actions
  setIsRecording: (isRecording: boolean) => void;
  setRecordingLanguage: (language: string | null) => void;
  setRecordingText: (text: string) => void;
  setIsVoiceAvailable: (available: boolean) => void;
  setVoiceResults: (results: string[]) => void;
  setVoiceError: (error: string) => void;
  setActiveInput: (input: 'A' | 'B' | null) => void;
  resetVoiceState: () => void;
}

export const useVoiceStore = create<VoiceState>()(
  devtools(
    (set) => ({
      // Initial State
      isRecording: false,
      recordingLanguage: null,
      recordingText: '',
      isVoiceAvailable: false,
      voiceResults: [],
      voiceError: '',
      activeInput: null,
      
      // Actions
      setIsRecording: (isRecording: boolean) => {
        console.log(`[VoiceStore] Recording status: ${isRecording}`);
        set({ isRecording }, false, 'setIsRecording');
      },
      
      setRecordingLanguage: (language: string | null) => {
        console.log(`[VoiceStore] Recording language: ${language}`);
        set({ recordingLanguage: language }, false, 'setRecordingLanguage');
      },
      
      setRecordingText: (text: string) => {
        set({ recordingText: text }, false, 'setRecordingText');
      },
      
      setIsVoiceAvailable: (available: boolean) => {
        console.log(`[VoiceStore] Voice available: ${available}`);
        set({ isVoiceAvailable: available }, false, 'setIsVoiceAvailable');
      },
      
      setVoiceResults: (results: string[]) => {
        console.log(`[VoiceStore] Voice results:`, results);
        set({ voiceResults: results }, false, 'setVoiceResults');
      },
      
      setVoiceError: (error: string) => {
        if (error) {
          console.error(`[VoiceStore] Voice error: ${error}`);
        }
        set({ voiceError: error }, false, 'setVoiceError');
      },
      
      setActiveInput: (input: 'A' | 'B' | null) => {
        console.log(`[VoiceStore] Active input: ${input}`);
        set({ activeInput: input }, false, 'setActiveInput');
      },
      
      resetVoiceState: () => {
        console.log(`[VoiceStore] Resetting voice state`);
        set({
          isRecording: false,
          recordingLanguage: null,
          recordingText: '',
          voiceResults: [],
          voiceError: '',
          activeInput: null,
        }, false, 'resetVoiceState');
      },
    }),
    {
      name: 'voice-store',
    }
  )
); 