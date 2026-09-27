import React from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Droplet, 
  Wind, 
  Sparkles, 
  Volume2, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Calendar,
  Compass
} from 'lucide-react';
import { WEATHER_FORECAST } from '../data/weather';
import { voiceService } from '../services/voice/voiceService';

export function Weather({ farmer, language, voiceEnabled }) {
  const isHi = language === 'hi';
  const weather = WEATHER_FORECAST;

  const handleSpeakWeather = () => {
    let text = "";
    if (isHi) {
      text = `मौसम पूर्वानुमान: आज पिथौरागढ़ में तापमान 28 डिग्री है। कल 70 प्रतिशत संभावना के साथ 18 मिमी बारिश का अनुमान है। आज खेत में पानी न लगाएं और जल निकासी नाले साफ रखें।`;
    } else {
      text = `Hyperlocal weather intelligence for Pithoragarh: Current temperature is 28 degrees Celsius. Tomorrow brings a 70 percent probability of 18 millimeter rainfall. Delay scheduled irrigation and prepare drainage furrows.`;
    }
    voiceService.speak(text, isHi ? 'hi' : 'en');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6DC] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0EDE1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D52] mb-2">
              <CloudSun className="w-3.5 h-3.5" />
              <span>{isHi ? 'कृषि-मौसम विज्ञान निर्णय प्रणाली' : 'Agro-Meteorological Decision Engine'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">
              {isHi ? 'मौसम पूर्वानुमान व कृषि प्रभाव' : 'Hyperlocal Weather & Irrigation Intelligence'}
            </h1>
            <p className="text-sm text-[#68756D] mt-1 max-w-2xl">
              {isHi
                ? `${weather.location} • सूक्ष्म-जलवायु पूर्वानुमान को स्पष्ट कृषि निर्णयों (सिंचाई, छिड़काव, जल निकासी) में बदलना।`
                : `${weather.location} • Direct translation of 3-day weather forecasts into unambiguous crop management decisions.`}
            </p>
          </div>

          {voiceEnabled && (
            <button
              onClick={handleSpeakWeather}
              className="px-5 py-3 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] font-bold text-xs border border-[#E8E6DC] flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
            >
              <Volume2 className="w-4 h-4 text-[#2E7D52]" />
              <span>{isHi ? 'मौसम बुलेटिन सुनें' : 'Listen Weather Bulletin'}</span>
            </button>
          )}
        </div>

        {/* Current Weather Snapshot Pill */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E8E6DC]">
            <span className="text-xs text-[#68756D] block font-medium">{isHi ? 'वर्तमान तापमान' : 'Current Temp'}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-[#12372A]">{weather.current.temp}°C</span>
              <span className="text-xl">{weather.current.icon}</span>
            </div>
            <span className="text-[11px] text-[#2E7D52] font-bold">
              {isHi ? weather.current.conditionHindi : weather.current.condition}
            </span>
          </div>

          <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E8E6DC]">
            <span className="text-xs text-[#68756D] block font-medium">{isHi ? 'हवा में नमी' : 'Relative Humidity'}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-[#12372A]">{weather.current.humidity}%</span>
              <Droplet className="w-5 h-5 text-[#1E88E5]" />
            </div>
            <span className="text-[11px] text-[#D97706] font-bold">
              {isHi ? 'फंगल संक्रमण जोखिम' : 'Elevated Fungal Risk'}
            </span>
          </div>

          <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E8E6DC]">
            <span className="text-xs text-[#68756D] block font-medium">{isHi ? 'मिट्टी की नमी' : 'Soil Moisture Depth'}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-[#12372A]">68%</span>
              <span className="text-xl">🌱</span>
            </div>
            <span className="text-[11px] text-[#2E7D52] font-bold">
              {isHi ? 'वानस्पतिक मक्के हेतु पर्याप्त' : 'Adequate for Maize'}
            </span>
          </div>

          <div className="bg-[#F7F5ED] p-4 rounded-2xl border border-[#E8E6DC]">
            <span className="text-xs text-[#68756D] block font-medium">{isHi ? 'हवा की गति व दिशा' : 'Wind Velocity'}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-[#12372A]">{weather.current.windSpeed} km/h</span>
              <Wind className="w-5 h-5 text-[#68756D]" />
            </div>
            <span className="text-[11px] text-[#68756D] font-bold">
              {isHi ? 'दक्षिण-पूर्व हवा' : 'Direction: SE'}
            </span>
          </div>
        </div>

      </div>

      {/* Critical Alert & Action Banner */}
      <div className="bg-[#FFF5F5] border border-[#FFCDD2] rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-xs font-bold text-[#C62828] uppercase tracking-wider">
          <ShieldAlert className="w-5 h-5 text-[#C62828]" />
          <span>{isHi ? 'मौसम अलर्ट • सिंचाई स्थगन' : 'Weather Decision Alert • Delay Irrigation'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#B71C1C]">
          {isHi ? weather.advisoryAlert.action.hi : weather.advisoryAlert.action.en}
        </h3>

        <div className="bg-white/80 rounded-2xl p-4 border border-[#FFCDD2] text-xs text-[#5D4037] leading-relaxed">
          <strong className="text-[#B71C1C] block mb-1">
            {isHi ? 'निर्णय का वैज्ञानिक आधार (Why?):' : 'Agronomic Rationale (Why?):'}
          </strong>
          {isHi ? weather.advisoryAlert.reason.hi : weather.advisoryAlert.reason.en}
        </div>
      </div>

      {/* 3-Day Forecast Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#12372A]">
          {isHi ? '3-दिवसीय मौसम एवं कृषि कार्य योजना' : '3-Day Agro-Weather Outlook'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weather.days.map((day, idx) => {
            const isTomorrowHero = idx === 1;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  isTomorrowHero
                    ? 'border-[#FFE082] bg-gradient-to-b from-white to-[#FFFDE7]/50 shadow-md ring-2 ring-[#F4B942]/30'
                    : 'border-[#E8E6DC] shadow-sm'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE1]">
                  <div>
                    <h3 className="text-base font-extrabold text-[#12372A]">
                      {isHi ? day.dayHindi : day.day} ({day.date})
                    </h3>
                    <p className="text-xs text-[#68756D]">{isHi ? day.conditionHindi : day.condition}</p>
                  </div>
                  <span className="text-3xl">{day.icon}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="bg-[#F7F5ED] p-2.5 rounded-xl">
                    <span className="text-[#68756D] block">{isHi ? 'तापमान' : 'Temperature'}</span>
                    <span className="font-extrabold text-[#12372A]">{day.temp}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${isTomorrowHero ? 'bg-[#FFF3E0] text-[#E65100]' : 'bg-[#F7F5ED]'}`}>
                    <span className="text-[#68756D] block">{isHi ? 'बारिश की संभावना' : 'Rain Chance'}</span>
                    <span className="font-extrabold">{day.rainChance}% ({day.expectedRainMm} mm)</span>
                  </div>
                </div>

                {/* Farm Action */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase text-[#68756D] tracking-wider block mb-1">
                    {isHi ? 'खेत में क्या करें:' : 'Recommended Field Action:'}
                  </span>
                  <div className={`p-3 rounded-xl text-xs font-semibold leading-relaxed ${
                    isTomorrowHero 
                      ? 'bg-[#FFF5F5] border border-[#FFCDD2] text-[#B71C1C]' 
                      : 'bg-[#F7F5ED] border border-[#E8E6DC] text-[#12372A]'
                  }`}>
                    {day.farmAction}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
