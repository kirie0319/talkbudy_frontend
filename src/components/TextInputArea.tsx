import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors } from '../utils/theme';
import { styles } from '../styles/AppStyles';
import { useAppStore } from '../stores/appStore';
import { useTranslationStore } from '../stores/translationStore';
import { detectAndTranslate } from '../utils/translationService';
import { getLocalizedText } from '../utils/localization';

export default function TextInputArea() {
  const { inputText, setInputText } = useAppStore();
  const { isTranslating } = useTranslationStore();

  const handleSend = () => {
    console.log(`[TextInputArea] 📤 Send button pressed with text: "${inputText}"`);
    detectAndTranslate(inputText, true);
  };
  return (
    <View style={styles.textInputWrapper}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={setInputText}
        placeholder={getLocalizedText('typeOrSpeak')}
        placeholderTextColor={colors.textMuted}
        multiline
      />
      {inputText.trim() && !isTranslating && (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      )}
      {isTranslating && (
        <View style={styles.sendButton}>
          <ActivityIndicator size="small" color={colors.white} />
        </View>
      )}
    </View>
  );
} 