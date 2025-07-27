import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius, shadows } from '../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },


  languageSelectorCard: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    zIndex: 1000,
    ...shadows.medium,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    zIndex: 1001,
  },
  languageContainer: {
    flex: 1,
    zIndex: 10000,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapButtonText: {
    fontSize: 24,
    color: colors.primary,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl * 2,
  },
  emptyStateIcon: {
    fontSize: 64,
    color: colors.textLight,
  },
  emptyStateTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: fontSize.md * 1.5,
  },
  messageContainer: {
    marginBottom: spacing.md,
  },
  messageLeft: {
    alignItems: 'flex-start',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  bubbleLeft: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: borderRadius.sm,
    ...shadows.small,
  },
  bubbleRight: {
    backgroundColor: colors.secondary,
    borderBottomRightRadius: borderRadius.sm,
    ...shadows.small,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  senderName: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
  },
  senderNameRight: {
    color: 'rgba(255,255,255,0.8)',
  },
  timestamp: {
    fontSize: 10,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  messageText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: fontSize.md * 1.4,
    marginBottom: spacing.sm,
  },
  messageTextRight: {
    color: colors.white,
  },
  translationContainer: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    marginTop: spacing.xs,
  },
  translatedText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: fontSize.md * 1.4,
    fontStyle: 'italic',
  },
  translatedTextRight: {
    color: 'rgba(255,255,255,0.95)',
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  translationLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  translationLabelRight: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputArea: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.medium,
  },
  recordingStatus: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primary + '15',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  recordingIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  recordingText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '500',
    flex: 1,
  },
  inputControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  voiceButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  voiceButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  voiceButtonIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  voiceButtonIconActive: {
    color: colors.white,
  },
  voiceButtonIconImage: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  voiceButtonIconImageActive: {
    tintColor: colors.white,
  },
  voiceButtonLabel: {
    fontSize: 10,
    color: colors.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  voiceButtonLabelActive: {
    color: colors.white,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
    backgroundColor: colors.background,
    minHeight: 56,
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  sendButtonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '600',
  },
}); 