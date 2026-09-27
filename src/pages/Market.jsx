import React from 'react';
import { 
  TrendingUp, 
  Store, 
  MapPin, 
  ArrowUpRight, 
  Volume2, 
  Sparkles, 
  Info, 
  Calendar,
  Layers
} from 'lucide-react';
import { MARKET_DATA } from '../data/markets';
import { voiceService } from '../services/voice/voiceService';

export function Market({ farmer, language, voiceEnabled }) {
  const isHi = language === 'hi';
  const market = MARKET_DATA;

  const handleSpeakMarket = () => {
    let text = "";
    if (isHi) {
      text = `मंडी भाव विश्लेषण: पिथौरागढ़ मंडी में मक्के का भाव ₹2,350 प्रति क्विंटल है, जिसमें 4.2% की साप्ताहिक बढ़त दर्ज की गई है। यदि आपके पास सुरक्षित गोदाम है, तो अगले दो से तीन हफ्तों में रुक-रुक कर बेचने से बेहतर मुनाफा मिलेगा।`;
    } else {
      text = `Mandi intelligence report: Modal price for Maize at Pithoragarh Mandi is ₹2,350 per quintal, showing a 4.2 percent weekly gain. With steady poultry demand across Kumaon, staggered selling over the next two to three weeks can improve net profit.`;
    }
    voiceService.speak(text, isHi ? 'hi' : 'en');
  };

  const maxPrice = Math.max(...market.priceHistory7Days.map(p => p.price));
  const minPrice = Math.min(...market.priceHistory7Days.map(p => p.price)) - 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6DC] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0EDE1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D52] mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isHi ? 'ई-नाम (eNAM) व एगमार्कनेट एकीकरण तैयार' : 'eNAM & Agmarknet Integration Architecture'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">
              {isHi ? 'मंडी भाव व बिक्री निर्णय' : 'Mandi Rates & Selling Windows'}
            </h1>
            <p className="text-sm text-[#68756D] mt-1 max-w-2xl">
              {isHi
                ? `${market.cropHindi} (${market.crop}) • कुमाऊं क्षेत्र की प्रमुख मंडियों के ताज़ा भाव, 7-दिवसीय रुझान व बेहतर मुनाफे की सलाह।`
                : `${market.crop} • Regional modal mandi rates across Kumaon, 7-day trend analysis, and harvest selling guidance.`}
            </p>
          </div>

          {voiceEnabled && (
            <button
              onClick={handleSpeakMarket}
              className="px-5 py-3 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] font-bold text-xs border border-[#E8E6DC] flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
            >
              <Volume2 className="w-4 h-4 text-[#2E7D52]" />
              <span>{isHi ? 'मंडी सलाह सुनें' : 'Listen Market Brief'}</span>
            </button>
          )}
        </div>

        {/* Integration Notice */}
        <div className="pt-4 flex items-center gap-2 text-xs text-[#68756D]">
          <Info className="w-4 h-4 text-[#2E7D52] flex-shrink-0" />
          <span>{market.sampleDatasetNotice[language] || market.sampleDatasetNotice.en}</span>
        </div>
      </div>

      {/* Selling Strategy Advisory Banner */}
      <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D52] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{isHi ? 'एआई बिक्री रणनीति सलाह' : 'AI Selling Strategy & Window Advice'}</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-[#12372A] leading-relaxed">
          {market.sellingAdvice[language] || market.sellingAdvice.en}
        </p>
      </div>

      {/* Mandi Cards & 7-Day Trend Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Nearby Mandis */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-xl font-extrabold text-[#12372A]">
            {isHi ? 'निकटवर्ती मंडियों के भाव' : 'Nearby Mandi Modal Rates'}
          </h2>

          <div className="space-y-3">
            {market.mandis.map((mandi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-[#E8E6DC] shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#2E7D52]" />
                    <h3 className="font-extrabold text-sm sm:text-base text-[#12372A]">
                      {isHi ? mandi.nameHindi : mandi.name}
                    </h3>
                  </div>
                  <div className="text-xs text-[#68756D] mt-1 flex items-center gap-3">
                    <span>{mandi.distance}</span>
                    <span>•</span>
                    <span>{isHi ? `दैनिक आवक: ${mandi.arrivalQuantity}` : `Arrival: ${mandi.arrivalQuantity}`}</span>
                  </div>
                  <div className="text-[11px] text-[#68756D] mt-1">
                    {isHi ? 'मूल्य सीमा:' : 'Range:'} ₹{mandi.minPrice} - ₹{mandi.maxPrice} / Qtl
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-[#12372A]">
                    ₹{mandi.modalPrice}
                  </div>
                  <span className="text-[11px] font-black text-[#2E7D52] bg-[#E8F5E9] px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {mandi.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 7-Day Trend Chart */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-xl font-extrabold text-[#12372A]">
            {isHi ? '7-दिवसीय मूल्य रुझान (पिथौरागढ़)' : '7-Day Price Trajectory (Pithoragarh)'}
          </h2>

          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#68756D]">{isHi ? 'वर्तमान मॉडल दर' : 'Current Modal Rate'}</span>
                <div className="text-2xl font-black text-[#12372A]">₹2,350 / Qtl</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#68756D]">{isHi ? '7 दिन की वृद्धि' : '7-Day Delta'}</span>
                <div className="text-lg font-black text-[#2E7D52] flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-5 h-5" />
                  <span>+₹100 (+4.2%)</span>
                </div>
              </div>
            </div>

            {/* Custom Bar Trend Representation */}
            <div className="h-44 flex items-end justify-between gap-2 pt-4 border-b border-[#F0EDE1]">
              {market.priceHistory7Days.map((item, idx) => {
                const heightPercent = Math.round(((item.price - minPrice) / (maxPrice - minPrice)) * 100);
                const isLatest = idx === market.priceHistory7Days.length - 1;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-[#12372A] opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{item.price}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        isLatest
                          ? 'bg-[#2E7D52] shadow-sm'
                          : 'bg-[#C8E6C9] group-hover:bg-[#A5D6A7]'
                      }`}
                    />
                    <span className={`text-[10px] font-semibold mt-1 ${isLatest ? 'text-[#2E7D52] font-black' : 'text-[#68756D]'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#68756D] leading-relaxed">
              {isHi
                ? 'मांग में निरंतर मजबूती दर्ज हो रही है। त्योहारों एवं आगामी खरीद सीजन के चलते कीमतों में स्थिरता व हल्का उछाल बने रहने की उम्मीद है।'
                : 'Demand from regional feed mills continues steady absorption. Hill transport connectivity remains uninterrupted.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
