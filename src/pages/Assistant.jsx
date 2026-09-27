import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  User, 
  RotateCcw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { voiceService } from '../services/voice/voiceService';
import { WEATHER_FORECAST } from '../data/weather';
import { MARKET_DATA } from '../data/markets';

export function Assistant({ farmer, language, voiceEnabled }) {
  const isHi = language === 'hi';
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize initial welcome message
  useEffect(() => {
    const welcome = isHi ? {
      id: 'welcome',
      sender: 'bot',
      text: `नमस्ते ${farmer.hindiName || farmer.name}! मैं आपका एग्रीग्रो AI कृषि सहायक हूँ। मैं आपके पिथौरागढ़ खेत, मक्के की फसल, कल के बारिश अलर्ट (70%) और मंडी भाव के संदर्भ में आपकी सहायता के लिए तैयार हूँ। आप बोलकर या लिखकर प्रश्न पूछ सकते हैं।`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : {
      id: 'welcome',
      sender: 'bot',
      text: `Namaste ${farmer.name}! I am your AgriGrow AI assistant. Grounded in your Pithoragarh farm profile, vegetative maize crop, tomorrow's 70% rain alert, and current mandi trends. Ask me anything via voice or text.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([welcome]);
  }, [language, farmer]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice shortcut pills
  const quickPrompts = isHi ? [
    { label: 'कल पानी देना चाहिए?', query: 'क्या मुझे कल खेत में पानी देना चाहिए?' },
    { label: 'क्या अभी गेहूं बो सकते हैं?', query: 'क्या मैं अभी जुलाई में गेहूं की बुवाई कर सकता हूँ?' },
    { label: 'पत्तियों पर धब्बे दिख रहे हैं', query: 'मक्के की पत्तियों पर धब्बे दिख रहे हैं, क्या उपाय करें?' },
    { label: 'पिथौरागढ़ मंडी भाव क्या है?', query: 'पिथौरागढ़ मंडी में मक्के का आज का भाव क्या है?' }
  ] : [
    { label: 'Should I irrigate tomorrow?', query: 'Should I irrigate my maize field tomorrow?' },
    { label: 'Can I sow wheat right now?', query: 'Can I sow wheat right now in July Kharif?' },
    { label: 'Fungal leaf spots noticed', query: 'I noticed chlorotic spots on my maize leaves. What should I do?' },
    { label: 'What is Pithoragarh mandi price?', query: 'What is the current maize price in Pithoragarh mandi?' }
  ];

  const generateAnswer = (query) => {
    const q = query.toLowerCase();
    
    // Irrigation / Rain logic
    if (q.includes('पानी') || q.includes('सिंचाई') || q.includes('irrigate') || q.includes('water') || q.includes('rain') || q.includes('बारिश')) {
      if (isHi) {
        return `❌ **कल पानी न लगाएं!** \n\nकल पिथौरागढ़ में **70% संभावना के साथ 18 मिमी वर्षा** का पूर्वानुमान है। आपकी दोमट मिट्टी में 68% पर्याप्त नमी पहले से है। अभी अतिरिक्त सिंचाई करने से वानस्पतिक मक्के में जलभराव होगा और जड़ों में सड़न व फंगल रोग का जोखिम बढ़ेगा। खेत की जलनिकासी नालियों की जांच कर लें।`;
      } else {
        return `❌ **Do NOT irrigate today or tomorrow!** \n\nWeather forecast indicates a **70% probability of 18mm rainfall** over Pithoragarh tomorrow. Soil moisture is already optimal (68%) for vegetative Maize. Adding water now will induce waterlogging and elevate fungal root rot risks. Ensure furrow drains are clear.`;
      }
    }

    // Wheat / Out of season logic
    if (q.includes('गेहूं') || q.includes('wheat') || q.includes('rabi') || q.includes('रबी')) {
      if (isHi) {
        return `⚠️ **वर्तमान में गेहूं बोने की सिफारिश नहीं की जाती!** \n\nआईसीआर (ICAR) कृषि नियमों के अनुसार गेहूं एक **रबी (शीतकालीन) फसल** है। जुलाई में खरीफ मौसम के दौरान अत्यधिक तापमान और लंबी प्रकाश-अवधि के कारण गेहूं के पौधों का अंकुरण और वानस्पतिक विकास विफल हो जाता है। गेहूं की बुवाई **अक्टूबर-नवंबर** में ही करें। वर्तमान में मक्का या सोयाबीन सर्वोत्तम विकल्प हैं।`;
      } else {
        return `⚠️ **Wheat is NOT recommended for planting right now!** \n\nAccording to ICAR agronomic rules, Wheat is strictly a **Rabi (winter) crop**. Sowing it during July Kharif in Pithoragarh disrupts the photoperiod and thermal vernalization required for grain filling. The engine gives Wheat a -35 penalty score. Recommended sowing window is **October-November**.`;
      }
    }

    // Disease / Leaf spots logic
    if (q.includes('धब्बे') || q.includes('रोग') || q.includes('कीट') || q.includes('spot') || q.includes('disease') || q.includes('blight') || q.includes('pest')) {
      if (isHi) {
        return `🍃 **पत्ती धब्बा रोग (Maydis Leaf Blight) की प्रारंभिक जांच (78% सटीकता):** \n\nकल 84% आर्द्रता और बारिश से फफूंद बढ़ सकती है। \n1. जमीन से सटी अत्यधिक धब्बेदार निचली पत्तियों को तुरंत तोड़कर खेत से दूर दबा दें। \n2. खेत से पानी निकासी सुगम रखें। \n3. बारिश रुकने और पत्तियां सूखने से पहले कोई भी छिड़काव न करें।`;
      } else {
        return `🍃 **Preliminary Screening: Maydis Leaf Blight (78% Confidence):** \n\nHigh relative humidity (84%) coupled with upcoming rain creates ideal spore multiplication conditions. \n1. Manually pluck and bury severely spotted lower leaves. \n2. Clear drainage channels to prevent ground humidity buildup. \n3. Hold foliar sprays until canopy dries post-rainfall.`;
      }
    }

    // Mandi / Price logic
    if (q.includes('मंडी') || q.includes('भाव') || q.includes('mandi') || q.includes('price') || q.includes('market') || q.includes('rate')) {
      if (isHi) {
        return `💰 **पिथौरागढ़ मंडी में मक्के का मॉडल भाव ₹2,350 प्रति क्विंटल है** (+4.2% साप्ताहिक बढ़त)। \nहल्द्वानी मंडी में भाव ₹2,420/क्विंटल है। कुमाऊं क्षेत्र में पोल्ट्री मांग मजबूत है। यदि आपके पास सुरक्षित भंडार गृह है, तो अगले 2-3 हफ्तों में चरणबद्ध बिक्री से ₹80-120/क्विंटल अधिक मुनाफा प्राप्त हो सकता है।`;
      } else {
        return `💰 **Pithoragarh Mandi modal rate for Maize is ₹2,350 / Quintal** (+4.2% weekly gain). \nHaldwani Mandi is currently at ₹2,420 / Quintal. Regional poultry feed demand is solid. If dry on-farm storage is available, staggered selling over the next 2-3 weeks can yield ₹80-120/q extra margin.`;
      }
    }

    // Generic agricultural contextual fallback
    if (isHi) {
      return `आपकी पिथौरागढ़ 2 एकड़ मक्के की फसल (वानस्पतिक अवस्था 42 दिन) के संदर्भ में: कल 70% बारिश की संभावना को देखते हुए सिंचाई स्थगित रखें और जलनिकासी जांचें। क्या आप मौसम, फसल उपयुक्तता या मंडी भाव के बारे में अधिक जानना चाहते हैं?`;
    } else {
      return `Regarding your 2-acre Pithoragarh Maize crop (Day 42 Vegetative): With 70% rain expected tomorrow, priority action is delaying irrigation and inspecting furrow drainage. Would you like details on weather, crop planning, or mandi trends?`;
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const answerText = generateAnswer(query);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      // Speak answer if voice enabled
      if (voiceEnabled) {
        const cleanSpeakText = answerText.replace(/[#*❌⚠️🍃💰•\n]/g, ' ');
        voiceService.speak(cleanSpeakText, isHi ? 'hi' : 'en');
      }
    }, 450);
  };

  const toggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceService.startListening({
        language: isHi ? 'hi-IN' : 'en-IN',
        onResult: (transcript) => {
          setInputText(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        },
        onError: () => {
          setIsListening(false);
        }
      });
    }
  };

  const handleSpeakMsg = (msg) => {
    if (speakingId === msg.id) {
      voiceService.stop();
      setSpeakingId(null);
    } else {
      setSpeakingId(msg.id);
      const cleanSpeakText = msg.text.replace(/[#*❌⚠️🍃💰•\n]/g, ' ');
      voiceService.speak(cleanSpeakText, isHi ? 'hi' : 'en', () => {
        setSpeakingId(null);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-6rem)] flex flex-col">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E6DC] shadow-sm mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#12372A] to-[#2E7D52] flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6 text-[#66BB6A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-[#12372A]">
                {isHi ? 'कृषि सहायक AI (Ask AgriGrow)' : 'Ask AgriGrow AI Assistant'}
              </h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D52]">
                {isHi ? 'खेत-सत्यापित' : 'Farm-Grounded'}
              </span>
            </div>
            <p className="text-xs text-[#68756D]">
              {isHi ? 'पिथौरागढ़ मक्का प्रक्षेत्र संदर्भ से जुड़ा हुआ' : 'Active Context: Pithoragarh Rainfed Maize'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2.5 rounded-xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#68756D] hover:text-[#12372A] border border-[#E8E6DC] cursor-pointer transition-all"
          title={isHi ? 'बातचीत रीसेट करें' : 'Reset Chat'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Voice/Text Shortcut Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none flex-shrink-0">
        <span className="text-xs font-bold text-[#68756D] whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2E7D52]" />
          {isHi ? 'त्वरित सवाल:' : 'Quick Questions:'}
        </span>
        {quickPrompts.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(chip.query)}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E8F5E9] text-[#12372A] hover:text-[#2E7D52] text-xs font-semibold border border-[#E8E6DC] whitespace-nowrap shadow-2xs transition-all cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-3xl p-4 sm:p-6 border border-[#E8E6DC] shadow-sm overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-[#12372A] flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#66BB6A]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-[#F7F5ED] text-[#12372A] border border-[#E8E6DC]'
                    : 'bg-[#2E7D52] text-white shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line font-medium">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 text-[10px] opacity-75">
                  <span>{msg.timestamp}</span>
                  {isBot && (
                    <button
                      onClick={() => handleSpeakMsg(msg)}
                      className="inline-flex items-center gap-1 font-bold text-[#2E7D52] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speakingId === msg.id ? (isHi ? 'रोकें' : 'Stop') : (isHi ? 'सुनें' : 'Listen')}</span>
                    </button>
                  )}
                </div>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-[#2E7D52] flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box with Voice Mic Button */}
      <div className="mt-4 bg-white rounded-2xl p-2 sm:p-3 border border-[#E8E6DC] shadow-sm flex items-center gap-2">
        <button
          onClick={toggleListening}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
            isListening
              ? 'bg-[#D9534F] text-white animate-pulse shadow-md shadow-[#D9534F]/30'
              : 'bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] border border-[#E8E6DC]'
          }`}
          title={isHi ? 'बोलकर प्रश्न पूछें' : 'Speak your question'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#2E7D52]" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={
            isListening 
              ? (isHi ? 'सुन रहे हैं... बोलिए...' : 'Listening... Speak now...')
              : (isHi ? 'हिंदी या अंग्रेजी में प्रश्न लिखें या माइक दबाएं...' : 'Ask farm question in Hindi/English...')
          }
          className="flex-1 bg-transparent px-2 text-sm font-semibold text-[#12372A] placeholder-[#8A968F] focus:outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="w-12 h-12 rounded-xl bg-[#12372A] hover:bg-[#2E7D52] disabled:opacity-40 disabled:hover:bg-[#12372A] text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
