import React, { useState } from 'react';
import { Sprout, ArrowRight, Mic, Globe } from 'lucide-react';

export function NameEntry({ onContinue, language, setLanguage }) {
  const isHi = language === 'hi';
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onContinue(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim()) handleContinue();
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#2E7D52]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F4B942]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#66BB6A]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Language toggle top-right */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <Globe className="w-4 h-4 text-[#68756D]" />
        <div className="flex bg-white border border-[#E8E6DC] rounded-full p-1 gap-1 shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              language === 'en' ? 'bg-[#12372A] text-white shadow-xs' : 'text-[#68756D] hover:text-[#12372A]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              language === 'hi' ? 'bg-[#12372A] text-white shadow-xs' : 'text-[#68756D] hover:text-[#12372A]'
            }`}
          >
            हि
          </button>
        </div>
      </div>

      {/* Central Card */}
      <div className="w-full max-w-md space-y-8 relative z-10">

        {/* Logo & Branding */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#12372A] to-[#2E7D52] flex items-center justify-center shadow-2xl shadow-[#12372A]/30">
              <Sprout className="w-11 h-11 text-[#66BB6A]" />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-black text-[#12372A] tracking-tight">
              Agri<span className="text-[#2E7D52]">Grow</span>
            </h1>
            <p className="text-sm text-[#68756D] font-medium mt-1">
              {isHi ? 'AI-संचालित कृषि निर्णय प्रणाली • SIH 2026' : 'AI Farm Intelligence & Advisory • SIH 2026'}
            </p>
          </div>
        </div>

        {/* Welcome Card with Name Input */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8E6DC] shadow-xl shadow-[#12372A]/8 space-y-6">

          {/* Welcome heading */}
          <div className="text-center space-y-1">
            <div className="text-3xl mb-2">👋</div>
            <h2 className="text-2xl font-extrabold text-[#12372A]">
              {isHi ? 'स्वागत है!' : 'Welcome!'}
            </h2>
            <p className="text-sm text-[#68756D] leading-relaxed">
              {isHi
                ? 'शुरुआत करने के लिए कृपया अपना नाम दर्ज करें।'
                : 'To get started, please enter your name below.'}
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-[#12372A] uppercase tracking-widest">
              {isHi ? 'आपका नाम (Your Name)' : 'Your Name'}
            </label>

            <div className={`relative rounded-2xl border-2 transition-all duration-200 ${
              focused
                ? 'border-[#2E7D52] bg-white shadow-md shadow-[#2E7D52]/10'
                : 'border-[#E8E6DC] bg-[#F7F5ED]'
            }`}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={isHi ? 'जैसे: रामलाल यादव, सुरेश पटेल...' : 'e.g. Ramesh Kumar, Suresh Patel...'}
                className="w-full bg-transparent px-5 py-4 text-base font-semibold text-[#12372A] placeholder-[#BDC6BE] focus:outline-none rounded-2xl"
                autoFocus
                maxLength={60}
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className={`w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-3 transition-all duration-200 group cursor-pointer ${
              name.trim()
                ? 'bg-[#12372A] hover:bg-[#2E7D52] text-white shadow-xl shadow-[#12372A]/25 hover:scale-[1.02]'
                : 'bg-[#E8E6DC] text-[#9DAA9E] cursor-not-allowed'
            }`}
          >
            <span>{isHi ? 'आगे बढ़ें' : 'Continue to AgriGrow'}</span>
            <ArrowRight className={`w-5 h-5 transition-transform ${name.trim() ? 'group-hover:translate-x-1' : ''}`} />
          </button>

          {/* Tagline reminder */}
          <p className="text-center text-[11px] text-[#B0BAB4] leading-relaxed">
            {isHi
              ? 'आपकी जानकारी केवल बेहतर कृषि सलाह के लिए उपयोग होगी।'
              : 'Your information is used only to personalize farm advisory.'}
          </p>
        </div>

        {/* Feature Pills below */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { icon: '🌽', label: isHi ? 'फसल सलाह' : 'Crop Advisory' },
            { icon: '🌦️', label: isHi ? 'मौसम' : 'Weather' },
            { icon: '💰', label: isHi ? 'मंडी भाव' : 'Mandi Rates' },
            { icon: '🎙️', label: isHi ? 'हिंदी आवाज' : 'Hindi Voice' },
          ].map((pill, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E6DC] text-xs font-semibold text-[#4A5D53] shadow-xs"
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
