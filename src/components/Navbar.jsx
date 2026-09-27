import React from 'react';
import { 
  Sprout, 
  MapPin, 
  CloudSun, 
  Globe, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal,
  Bot
} from 'lucide-react';

export function Navbar({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  voiceEnabled,
  setVoiceEnabled,
  farmer,
  onOpenFarmBrief
}) {
  const navItems = [
    { id: 'dashboard', label: { en: 'Dashboard', hi: 'डैशबोर्ड' } },
    { id: 'planner', label: { en: 'Crop Planner', hi: 'फसल योजना' } },
    { id: 'health', label: { en: 'Crop Health', hi: 'फसल सुरक्षा' } },
    { id: 'weather', label: { en: 'Weather', hi: 'मौसम' } },
    { id: 'market', label: { en: 'Market', hi: 'मंडी भाव' } },
    { id: 'assistant', label: { en: 'Ask AgriGrow', hi: 'कृषि सहायक AI' }, icon: Bot }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-[#E8E6DC] sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#12372A] to-[#2E7D52] flex items-center justify-center shadow-md shadow-[#12372A]/20 text-white flex-shrink-0">
              <Sprout className="w-7 h-7 text-[#66BB6A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#12372A]">
                  Agri<span className="text-[#2E7D52]">Grow</span>
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D52] border border-[#2E7D52]/20">
                  SIH 26193
                </span>
              </div>
              <p className="text-[11px] text-[#68756D] font-medium hidden sm:block">
                {language === 'hi' ? 'एआई-संचालित कृषि निर्णय प्रणाली' : 'AI Farm Intelligence & Advisory Platform'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center bg-[#F7F5ED] p-1.5 rounded-2xl border border-[#E8E6DC]">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#12372A] shadow-sm font-extrabold'
                      : 'text-[#68756D] hover:text-[#12372A]'
                  }`}
                >
                  {IconComp && <IconComp className="w-4 h-4 text-[#2E7D52]" />}
                  <span>{item.label[language] || item.label.en}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Farm Pill, Language & Voice */}
          <div className="flex items-center gap-2.5">
            
            {/* Active Farm Context Pill */}
            <button
              onClick={() => setCurrentTab('onboarding')}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F7F5ED] hover:bg-[#EFECE1] border border-[#E8E6DC] text-xs font-bold text-[#12372A] transition"
              title="Click to change farm profile / खेत की जानकारी बदलें"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2E7D52]" />
              <span>{farmer.district}</span>
              <span className="text-[#68756D]">• {farmer.currentCrop.name}</span>
              <SlidersHorizontal className="w-3 h-3 text-[#68756D] ml-0.5" />
            </button>

            {/* Farm Brief Modal Trigger */}
            <button
              onClick={onOpenFarmBrief}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E8F5E9] hover:bg-[#C8E6C9] border border-[#2E7D52]/30 text-[#12372A] text-xs font-black transition shadow-sm"
              title="Today's Farm Brief / आज का कृषि संक्षिप्त विवरण"
            >
              <span className="w-2 h-2 rounded-full bg-[#2E7D52] animate-ping" />
              <span className="hidden sm:inline">{language === 'hi' ? 'आज का ब्रीफ' : 'Farm Brief'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#F7F5ED] p-1 rounded-xl border border-[#E8E6DC]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'en' ? 'bg-white text-[#12372A] shadow-sm' : 'text-[#68756D]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'hi' ? 'bg-white text-[#12372A] shadow-sm' : 'text-[#68756D]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Voice Audio Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-xl border text-sm transition ${
                voiceEnabled
                  ? 'bg-[#E8F5E9] border-[#2E7D52]/40 text-[#2E7D52]'
                  : 'bg-[#F7F5ED] border-[#E8E6DC] text-[#68756D]'
              }`}
              title={voiceEnabled ? 'Voice Audio ON' : 'Voice Audio OFF'}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5 text-[#2E7D52]" /> : <VolumeX className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}
