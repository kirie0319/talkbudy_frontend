/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  SafeAreaView,
} from 'react-native';

import LanguageSelector from './src/components/LanguageSelector';
import VoiceButton from './src/components/VoiceButton';
import TextInputArea from './src/components/TextInputArea';
import ChatArea from './src/components/ChatArea';
import { API_BASE_URL } from './config';
import { styles } from './src/styles/AppStyles';
import { VoiceRecognitionManager } from './src/utils/voiceRecognition';
import { useAppStore, useTranslationStore, useVoiceStore } from './src/stores';



export default function App() {
  // Zustand Stores
  const { languageA, languageB } = useAppStore();
  const { isRecording, recordingText } = useVoiceStore();
  
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Voice Recognition Manager
  const voiceManager = useRef(new VoiceRecognitionManager(pulseAnim)).current;

  




  // Debug: Log API base URL on component mount
  useEffect(() => {
    console.log(`[APP] 🚀 TalkBuddy App initialized`);
    console.log(`[APP] 🌐 API Base URL: ${API_BASE_URL}`);
    
    // Initialize voice recognition
    voiceManager.initializeVoice();
    
    // Cleanup on unmount
    return () => {
      voiceManager.cleanupVoice();
    };
  }, []); // 依存配列を空にして重複登録を防ぐ


  return (
    <SafeAreaView style={styles.container}>
      {/* Language Selector */}
      <LanguageSelector />

      {/* Chat Area */}
      <ChatArea />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.inputArea}>
          {/* Recording Status */}
          {(isRecording || recordingText) && (
            <Animated.View
              style={[
                styles.recordingStatus,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                  }),
                  transform: [{
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02],
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.recordingIndicatorRow}>
                <Animated.View 
                  style={[
                    styles.recordingIndicator,
                    {
                      transform: [{
                        scale: pulseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      }],
                    },
                  ]}
                />
                <Text style={styles.recordingText}>
                  {recordingText || '🎧 Ready to listen...'}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Input Controls */}
          <View style={styles.inputControls}>
            {/* Language A Voice Button */}
            <VoiceButton
              language={languageA}
              onStartRecording={(language) => voiceManager.startRecording(language)}
              onStopRecording={() => voiceManager.stopRecording()}
            />

            {/* Text Input */}
            <TextInputArea />

            {/* Language B Voice Button */}
            <VoiceButton
              language={languageB}
              onStartRecording={(language) => voiceManager.startRecording(language)}
              onStopRecording={() => voiceManager.stopRecording()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>




    </SafeAreaView>
  );
}


