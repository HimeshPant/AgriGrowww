// Browser Web Speech API Implementation (TTS & ASR) with Fail-Safe Chimes

let cachedVoices = [];

// Pre-load voices
export const loadBrowserVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }
  if (cachedVoices.length > 0) return Promise.resolve(cachedVoices);

  return new Promise((resolve) => {
    const update = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
        resolve(v);
        return true;
      }
      return false;
    };

    if (!update()) {
      window.speechSynthesis.onvoiceschanged = () => update();
      setTimeout(() => resolve(window.speechSynthesis.getVoices() || []), 400);
    }
  });
};

// Play pleasant auditory chime before speech
export const playAudioBeep = (freq = 520, duration = 0.2) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

let activeUtterance = null;

export const browserSpeak = async (text, language = 'hi', onStart, onEnd) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis unavailable in this environment.');
    playAudioBeep(660, 0.2);
    return;
  }

  if (!text) return;

  playAudioBeep(520, 0.15);

  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
  } catch (e) {}

  const voices = await loadBrowserVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterance = utterance;

  // Language mapping
  let chosenVoice = null;
  if (language === 'hi') {
    chosenVoice = voices.find(v => 
      v.lang === 'hi-IN' || 
      v.lang === 'hi_IN' ||
      v.name.toLowerCase().includes('hindi') || 
      v.name.includes('हिन्दी') ||
      v.name.toLowerCase().includes('hemant') ||
      v.name.toLowerCase().includes('kalpana')
    );

    // Fallback to Indian English voice if Windows lacks Hindi pack
    if (!chosenVoice) {
      chosenVoice = voices.find(v => 
        v.lang === 'en-IN' || 
        v.name.toLowerCase().includes('india') ||
        v.name.toLowerCase().includes('heera') ||
        v.name.toLowerCase().includes('neerja')
      );
    }
    utterance.lang = chosenVoice ? chosenVoice.lang : 'hi-IN';
  } else {
    chosenVoice = voices.find(v => v.lang === 'en-IN' || v.lang.startsWith('en'));
    utterance.lang = chosenVoice ? chosenVoice.lang : 'en-IN';
  }

  if (chosenVoice) {
    utterance.voice = chosenVoice;
  }

  utterance.rate = language === 'hi' ? 0.90 : 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech error:', e);
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  setTimeout(() => {
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('browserSpeak failed:', err);
      if (onEnd) onEnd();
    }
  }, 60);
};

export const browserStop = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch (e) {}
  }
};

export const createBrowserRecognizer = (language = 'hi', onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onresult = (event) => {
    let transcript = '';
    let isFinal = false;

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
      if (event.results[i].isFinal) isFinal = true;
    }

    if (onResult && transcript.trim()) {
      onResult(transcript, isFinal);
    }
  };

  recognition.onerror = (e) => {
    if (onError) onError(e.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};
