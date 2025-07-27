import React from 'react';
import { Pressable, Text, Image } from 'react-native';
import { getLanguageName } from '../utils/languageManager';
import { styles } from '../styles/AppStyles';
import { useVoiceStore } from '../stores/voiceStore';

interface VoiceButtonProps {
  language: string;
  onStartRecording: (language: string) => void;
  onStopRecording: () => void;
}

export default function VoiceButton({
  language,
  onStartRecording,
  onStopRecording,
}: VoiceButtonProps) {
  const { activeInput, recordingLanguage } = useVoiceStore();
  const isActive = recordingLanguage === language;
  return (
    <Pressable
      style={[
        styles.voiceButton,
        isActive && styles.voiceButtonActive,
      ]}
      onPressIn={() => onStartRecording(language)}
      onPressOut={onStopRecording}
    >
      <Image
        source={require('../assets/images/microphone.png')}
        style={[
          styles.voiceButtonIconImage,
          isActive && styles.voiceButtonIconImageActive
        ]}
        resizeMode="contain"
      />
      <Text style={[
        styles.voiceButtonLabel,
        isActive && styles.voiceButtonLabelActive
      ]}>
        {getLanguageName(language)}
      </Text>
    </Pressable>
  );
} 