import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  // Language Selection
  languageA: string;
  languageB: string;
  inputText: string;
  
  // Actions
  setLanguageA: (language: string) => void;
  setLanguageB: (language: string) => void;
  setInputText: (text: string) => void;
  swapLanguages: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial State
      languageA: 'ja',
      languageB: 'en',
      inputText: '',
      
      // Actions
      setLanguageA: (language: string) => {
        console.log(`[AppStore] Language A changed to: ${language}`);
        set({ languageA: language }, false, 'setLanguageA');
      },
      
      setLanguageB: (language: string) => {
        console.log(`[AppStore] Language B changed to: ${language}`);
        set({ languageB: language }, false, 'setLanguageB');
      },
      
      setInputText: (text: string) => {
        set({ inputText: text }, false, 'setInputText');
      },
      
      swapLanguages: () => {
        const { languageA, languageB } = get();
        console.log(`[AppStore] Swapping languages: ${languageA} ↔ ${languageB}`);
        set(
          { 
            languageA: languageB, 
            languageB: languageA 
          }, 
          false, 
          'swapLanguages'
        );
      },
    }),
    {
      name: 'app-store',
    }
  )
); 