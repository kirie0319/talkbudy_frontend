import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TranslationMessage } from '../types';

interface TranslationState {
  // Translation State
  messages: TranslationMessage[];
  isTranslating: boolean;
  
  // Actions
  setMessages: (messages: TranslationMessage[]) => void;
  addMessage: (message: TranslationMessage) => void;
  setIsTranslating: (isTranslating: boolean) => void;
  clearMessages: () => void;
}

export const useTranslationStore = create<TranslationState>()(
  devtools(
    (set, get) => ({
      // Initial State
      messages: [],
      isTranslating: false,
      
      // Actions
      setMessages: (messages: TranslationMessage[]) => {
        console.log(`[TranslationStore] Setting ${messages.length} messages`);
        set({ messages }, false, 'setMessages');
      },
      
      addMessage: (message: TranslationMessage) => {
        console.log(`[TranslationStore] Adding new message:`, message);
        const { messages } = get();
        set({ messages: [...messages, message] }, false, 'addMessage');
      },
      
      setIsTranslating: (isTranslating: boolean) => {
        console.log(`[TranslationStore] Translation status: ${isTranslating}`);
        set({ isTranslating }, false, 'setIsTranslating');
      },
      
      clearMessages: () => {
        console.log(`[TranslationStore] Clearing all messages`);
        set({ messages: [] }, false, 'clearMessages');
      },
    }),
    {
      name: 'translation-store',
    }
  )
); 