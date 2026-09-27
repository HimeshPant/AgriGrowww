import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  CloudRain, 
  Droplets, 
  ShieldAlert, 
  CheckSquare, 
  TrendingUp, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { voiceService } from '../services/voice/voiceService';

export function FarmBriefModal({
  isOpen,
  onClose,
  farmer,
  weather,
  advisory,
  risks,
  market,
  language = 'hi'
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const briefTextHindi = `नमस्ते ${farmer.hindiName}! आज 27 सितम्बर का कृषि संक्षिप्त विवरण: कल पिथौरागढ़ में 70 प्रतिशत बारिश की संभावना है, इसलिए आज अतिरिक्त सिंचाई न करें। हवा में 84 प्रतिशत नमी के कारण मक्के में पत्ती धब्बा रोग का मध्यम जोखिम है। खेत के नाले साफ रखें। मंडी में मक्के के भाव 4.2 प्रतिशत की बढ़त पर हैं।`;

  const briefTextEnglish = `Good morning ${farmer.name}! Today's 27th September Farm Brief for Pithoragarh: Rain expected tomorrow with 70% probability. Delay irrigation today. Moderate fungal leaf spot risk due to high humidity. Keep field drainage channels clear. Maize mandi prices are trending upward by 4.2%.`;

  const handleSpeak = () => {
    const text = language === 'hi' ? briefTextHindi : briefTextEnglish;
    setIsSpeaking(true);
    voiceService.speak(
      text,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12372A]/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#E8E6DC] text-[#17211B] relative space-y-5">
        
        {/* Close Button */}
        <button
          onClick={() => {
            voiceService.stop();
            setIsSpeaking(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F7F5ED] text-[#68756D] hover:text-[#17211B] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#2E7D52]/30 flex items-center justify-center flex-shrink-0 text-2xl">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#2E7D52] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F4B942]" />
                {language === 'hi' ? 'दैनिक कृषि सारांश' : 'Daily Intelligence Brief'}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#68756D]">27 Sep 2026</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#12372A]">
              {language === 'hi' ? `नमस्ते, ${farmer.hindiName}` : `Farm Brief: ${farmer.name}`}
            </h2>
            <p className="text-xs text-[#68756D]">
              {farmer.district}, {farmer.state} • {farmer.currentCrop.name} ({farmer.currentCrop.stageHindi || farmer.currentCrop.stage})
            </p>
          </div>
        </div>

        {/* Brief Points Grid */}
        <div className="space-y-3">
          
          {/* Weather Point */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F7F5ED] border border-[#E8E6DC]">
            <CloudRain className="w-5 h-5 text-[#2E7D52] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold text-[#12372A] block">
                {language === 'hi' ? 'मौसम' : 'Weather'}
              </span>
              <span className="text-[#68756D]">
                {language === 'hi' 
                  ? 'कल 70% बारिश का अनुमान (18 मिमी)। आज बादल रहेंगे।' 
                  : 'Rain likely tomorrow (70% probability, 18mm rainfall).'}
              </span>
            </div>
          </div>

          {/* Water Decision Point */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#E8F5E9] border border-[#2E7D52]/30">
            <Droplets className="w-5 h-5 text-[#2E7D52] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold text-[#12372A] block">
                {language === 'hi' ? 'सिंचाई निर्णय' : 'Water / Irrigation'}
              </span>
              <span className="text-[#12372A] font-medium">
                {language === 'hi' 
                  ? 'आज सिंचाई न करें। पर्याप्त नमी (68%) उपलब्ध है।' 
                  : 'Avoid unnecessary irrigation today; soil moisture is 68%.'}
              </span>
            </div>
          </div>

          {/* Disease Risk Point */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFF8E1] border border-[#F4B942]/40">
            <ShieldAlert className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold text-[#12372A] block">
                {language === 'hi' ? 'फसल सुरक्षा' : 'Crop Health Risk'}
              </span>
              <span className="text-[#68756D]">
                {language === 'hi' 
                  ? '84% नमी के कारण पत्ती धब्बा फंगस का मध्यम जोखिम। निचली पत्तियां जांचें।' 
                  : 'Moderate fungal risk (Maydis blight) due to elevated humidity.'}
              </span>
            </div>
          </div>

          {/* Market Insight Point */}
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F7F5ED] border border-[#E8E6DC]">
            <TrendingUp className="w-5 h-5 text-[#2E7D52] flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold text-[#12372A] block">
                {language === 'hi' ? 'मंडी रुझान' : 'Market Insight'}
              </span>
              <span className="text-[#68756D]">
                {language === 'hi' 
                  ? 'पिथौरागढ़ मंडी में मक्का ₹2,350/क्विंटल (+4.2% बढ़त पर)।' 
                  : 'Maize prices trending upward (+4.2%) in nearby mandis.'}
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons: Listen to Brief */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSpeak}
            className={`flex-1 py-3 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              isSpeaking
                ? 'bg-[#F4B942] text-[#12372A] animate-pulse'
                : 'bg-gradient-to-r from-[#12372A] to-[#2E7D52] hover:from-[#0B221A] hover:to-[#23654E] text-white shadow-[#12372A]/20'
            }`}
          >
            {isSpeaking ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>{language === 'hi' ? 'सारांश बोल रहा हूँ...' : 'Speaking Farm Brief...'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{language === 'hi' ? 'पूरा सारांश सुनें (Listen Audio)' : 'Listen to Farm Brief'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              voiceService.stop();
              setIsSpeaking(false);
              onClose();
            }}
            className="py-3 px-5 rounded-2xl bg-[#F7F5ED] hover:bg-[#EFECE1] border border-[#E8E6DC] text-xs font-bold text-[#68756D] transition"
          >
            {language === 'hi' ? 'डैशबोर्ड देखें' : 'View Dashboard'}
          </button>
        </div>

      </div>
    </div>
  );
}
