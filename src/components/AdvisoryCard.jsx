import React, { useState } from 'react';
import { CloudRain, Volume2, RotateCcw, AlertTriangle, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { voiceService } from '../services/voice/voiceService';

export function AdvisoryCard({
  advisory,
  language = 'hi',
  onExploreMore
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    const text = advisory.voiceText?.[language] || advisory.title[language] + ". " + advisory.action[language];
    setIsSpeaking(true);
    voiceService.speak(
      text,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2E7D52]/30 shadow-md relative overflow-hidden space-y-4">
      
      {/* Top Banner & Priority Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6DC] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#2E7D52]/20 flex items-center justify-center text-[#2E7D52] flex-shrink-0">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#D97706] bg-[#FFF8E1] px-2.5 py-0.5 rounded-full border border-[#F4B942]/30">
                {language === 'hi' ? 'आज की मुख्य कृषि सलाह' : "Today's Farm Advisory"}
              </span>
              <span className="text-[10px] font-bold text-[#68756D] font-mono">Verified Agro-Rule</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#12372A] mt-0.5">
              {advisory.title[language]}
            </h3>
          </div>
        </div>

        {/* Listen Button */}
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm ${
            isSpeaking
              ? 'bg-[#F4B942] text-[#12372A] animate-pulse ring-2 ring-[#F4B942]'
              : 'bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#2E7D52] border border-[#2E7D52]/30'
          }`}
          title="Listen to advisory audio / सलाह सुनें"
        >
          {isSpeaking ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin text-[#12372A]" />
              <span>{language === 'hi' ? 'बोल रहा हूँ...' : 'Speaking...'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#2E7D52]" />
              <span>{language === 'hi' ? 'सलाह सुनें (Listen)' : 'Listen Advisory'}</span>
            </>
          )}
        </button>
      </div>

      {/* Recommended Action Box */}
      <div className="bg-[#E8F5E9]/60 rounded-2xl p-4 border border-[#2E7D52]/20 space-y-1">
        <span className="text-xs font-black uppercase tracking-wider text-[#2E7D52] block">
          {language === 'hi' ? '👉 किसान के लिए त्वरित निर्णय (Recommended Action):' : '👉 Action You Should Take Today:'}
        </span>
        <p className="text-base sm:text-lg font-black text-[#12372A] leading-snug">
          {advisory.action[language]}
        </p>
      </div>

      {/* Explainable Why Layer */}
      <div className="bg-[#F7F5ED] rounded-2xl p-4 border border-[#E8E6DC] space-y-1.5">
        <span className="text-xs font-black uppercase tracking-wider text-[#68756D] flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#2E7D52]" />
          <span>{language === 'hi' ? 'यह सलाह क्यों दी गई? (Why This Matters):' : 'Why this decision was made:'}</span>
        </span>
        <p className="text-xs sm:text-sm text-[#17211B] leading-relaxed font-medium">
          {advisory.why[language]}
        </p>
      </div>

      {/* Footer Info & View More link */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#68756D]">
        <span>
          {language === 'hi' ? 'आधार: मौसम पूर्वानुमान + मक्का बढ़वार + 68% मिट्टी नमी' : 'Grounding: Forecast + Vegetative Maize + 68% Soil Moisture'}
        </span>
        {onExploreMore && (
          <button 
            onClick={onExploreMore}
            className="font-bold text-[#2E7D52] hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'विस्तार से देखें' : 'View Weather Intelligence'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
}
