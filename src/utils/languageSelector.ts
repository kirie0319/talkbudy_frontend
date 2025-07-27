import { useAppStore } from '../stores/appStore';

export const createLanguageHandlers = () => {
  const { setLanguageA, setLanguageB, swapLanguages } = useAppStore.getState();

  return {
    handleLanguageAChange: setLanguageA,
    handleLanguageBChange: setLanguageB,
    swapLanguages,
  };
}; 