import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { TranslationMessage } from '../types';
import { getLanguageName } from '../utils/languageManager';
import { styles } from '../styles/AppStyles';
import { useTranslationStore } from '../stores/translationStore';
import { getLocalizedText } from '../utils/localization';

export default function ChatArea() {
  const { messages } = useTranslationStore();
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);
  const renderMessage = (message: TranslationMessage) => {
    const timestamp = message.timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          message.isLangA ? styles.messageLeft : styles.messageRight,
        ]}
      >
        <View style={[
          styles.messageBubble,
          message.isLangA ? styles.bubbleLeft : styles.bubbleRight,
        ]}>
          <View style={styles.messageHeader}>
            <Text style={[
              styles.senderName,
              !message.isLangA && styles.senderNameRight
            ]}>
              {getLanguageName(message.sourceLang)}
            </Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          
          <Text style={[
            styles.messageText,
            !message.isLangA && styles.messageTextRight
          ]}>
            {message.original}
          </Text>
          
          <View style={styles.translationContainer}>
            <Text style={[
              styles.translatedText,
              !message.isLangA && styles.translatedTextRight
            ]}>
              {message.translated}
            </Text>
            <Text style={[
              styles.translationLabel,
              !message.isLangA && styles.translationLabelRight
            ]}>
              → {getLanguageName(message.targetLang)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.chatArea}
      contentContainerStyle={styles.chatContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>💬</Text>
          <Text style={styles.emptyStateTitle}>{getLocalizedText('startConversation')}</Text>
          <Text style={styles.emptyStateText}>
            {getLocalizedText('typeToTranslate')}{'\n'}{getLocalizedText('voiceInputAvailable')}
          </Text>
        </View>
      ) : (
        messages.map(renderMessage)
      )}
    </ScrollView>
  );
} 