import { API_BASE_URL } from '../../config';

const TIMEOUT_MS = 10000; // 10 seconds timeout

// Helper function for fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number = TIMEOUT_MS): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log(`[API] ⏰ Request timeout after ${timeout}ms`);
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log(`[API] ⏰ Request was aborted due to timeout`);
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      console.log(`[API] 🔌 Network error:`, error.message);
    }
    throw error;
  }
};

// API request interfaces
interface DetectLanguageRequest {
  text: string;
}

interface DetectLanguageResponse {
  detected_language: string;
}

interface TranslateRequest {
  text: string;
  source_lang: string;
  target_lang: string;
}

interface TranslateResponse {
  translated_text: string;
  source_lang: string;
  target_lang: string;
}

interface TestResponse {
  status: string;
  message: string;
  timestamp: string;
  openai_api_key: string;
}

// API service class
class TranslationAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async detectLanguage(request: DetectLanguageRequest): Promise<DetectLanguageResponse> {
    const url = `${this.baseUrl}/api/detect-language`;
    console.log(`[API] 🚀 Calling detectLanguage API:`, url);
    console.log(`[API] 📤 Request:`, request);

    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log(`[API] 📶 Response status:`, response.status);
      console.log(`[API] 📶 Response ok:`, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`[API] ❌ Error response:`, errorText);
        throw new Error(`Language detection failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`[API] ✅ Success response:`, result);
      return result;
    } catch (error) {
      console.log(`[API] 💥 Error in detectLanguage:`, error);
      throw error;
    }
  }

  async translateText(request: TranslateRequest): Promise<TranslateResponse> {
    const url = `${this.baseUrl}/api/translate`;
    console.log(`[API] 🚀 Calling translateText API:`, url);
    console.log(`[API] 📤 Request:`, request);

    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log(`[API] 📶 Response status:`, response.status);
      console.log(`[API] 📶 Response ok:`, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`[API] ❌ Error response:`, errorText);
        throw new Error(`Translation failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`[API] ✅ Success response:`, result);
      return result;
    } catch (error) {
      console.log(`[API] 💥 Error in translateText:`, error);
      throw error;
    }
  }

  async testConnection(): Promise<TestResponse> {
    const url = `${this.baseUrl}/api/test`;
    console.log(`[API] 🚀 Calling testConnection API:`, url);

    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
      });

      console.log(`[API] 📶 Response status:`, response.status);
      console.log(`[API] 📶 Response ok:`, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`[API] ❌ Error response:`, errorText);
        throw new Error(`Connection test failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log(`[API] ✅ Success response:`, result);
      return result;
    } catch (error) {
      console.log(`[API] 💥 Error in testConnection:`, error);
      throw error;
    }
  }
}

export const translationAPI = new TranslationAPI();
export type { DetectLanguageRequest, DetectLanguageResponse, TranslateRequest, TranslateResponse, TestResponse }; 