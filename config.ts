import { Platform } from 'react-native';

// ローカル開発時の設定
const LOCAL_DEV_CONFIG = {
  // 現在のローカルIPアドレス（Wi-Fi環境に応じて更新）
  LOCAL_IP: '172.22.1.49',
  PORT: '8000',
};

// 環境切り替えフラグ（true: Railway本番環境, false: ローカル環境）
const PRODUCTION = true;

// API設定
export const API_BASE_URL = PRODUCTION
  ? 'https://talkbuddy-production.up.railway.app' // Railway本番環境
  : Platform.select({
      ios: `http://${LOCAL_DEV_CONFIG.LOCAL_IP}:${LOCAL_DEV_CONFIG.PORT}`,
      android: 'http://10.0.2.2:8000',  // Android Emulator用
      default: 'http://localhost:8000'
    }) || 'http://localhost:8000';

export const WS_BASE_URL = PRODUCTION
  ? 'wss://talkbuddy-production.up.railway.app' // Railway本番環境（WebSocket Secure）
  : Platform.select({
      ios: `ws://${LOCAL_DEV_CONFIG.LOCAL_IP}:${LOCAL_DEV_CONFIG.PORT}`,
      android: 'ws://10.0.2.2:8000',  // Android Emulator用  
      default: 'ws://localhost:8000'
    }) || 'ws://localhost:8000';

// エクスポートの互換性のため
export const API_URL = API_BASE_URL;

// デバッグ用のログ出力
console.log(`[CONFIG] 📱 Platform: ${Platform.OS}`);
console.log(`[CONFIG] 🌐 API Base URL: ${API_BASE_URL}`);
console.log(`[CONFIG] 🔌 WebSocket URL: ${WS_BASE_URL}`);

if (PRODUCTION) {
  console.log(`[CONFIG] 🚀 Using Railway Production Server`);
} else {
  console.log(`[CONFIG] 🔧 Using Local Development Server`);
  console.log(`[CONFIG] 🏠 Local IP: ${LOCAL_DEV_CONFIG.LOCAL_IP}:${LOCAL_DEV_CONFIG.PORT}`);
} 