export const colors = {
  primary: '#8BC34A',
  primaryDark: '#7CB342',
  primaryGradient: ['#9CCC65', '#8BC34A'] as const,
  secondary: '#00BCD4',
  secondaryLight: '#4DD0E1',
  secondaryGradient: ['#4DD0E1', '#00BCD4'] as const,
  success: '#8BC34A',
  successDark: '#7CB342',
  successGradient: ['#9CCC65', '#8BC34A'] as const,
  error: '#dc3545',
  warning: '#ffc107',
  info: '#00BCD4',
  light: '#ffffff',
  dark: '#343a40',
  white: '#ffffff',
  background: '#fafafa',
  backgroundDark: '#ffffff',
  border: '#f0f3f5',
  borderLight: '#f5f7f9',
  text: '#2c3e50',
  textLight: '#546e7a',
  textMuted: '#90a4ae',
  inputBg: '#ffffff',
  shadowColor: 'rgba(0,0,0,0.05)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 18,
  round: 24,
  circle: 50,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  title: 36,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
}; 