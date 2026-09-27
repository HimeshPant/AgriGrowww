// Unified Voice Service Abstraction for AgriGrow
// Supports Browser Web Speech API now and allows seamless drop-in of BHASHINI API later

import { browserSpeak, browserStop, createBrowserRecognizer, playAudioBeep } from './browserVoice';

class VoiceService {
  constructor() {
    this.provider = 'browser'; // 'browser' | 'bhashini'
  }

  setProvider(providerName) {
    this.provider = providerName;
  }

  async speak(text, language = 'hi', onStart, onEnd) {
    if (this.provider === 'bhashini') {
      // Future Bhashini API integration hook
      console.log(`[Bhashini Voice Stub] Speaking: "${text}" in ${language}`);
    }
    return browserSpeak(text, language, onStart, onEnd);
  }

  stop() {
    return browserStop();
  }

  playChime(frequency, duration) {
    return playAudioBeep(frequency, duration);
  }

  createRecognizer(language = 'hi', onResult, onError, onEnd) {
    return createBrowserRecognizer(language, onResult, onError, onEnd);
  }
}

export const voiceService = new VoiceService();
export default voiceService;
