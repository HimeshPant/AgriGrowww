import React, { useState } from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  SlidersHorizontal, 
  Sparkles, 
  Calendar, 
  Droplet, 
  Layers, 
  MapPin,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { evaluateCropSuitability } from '../engine/cropEngine';
import { voiceService } from '../services/voice/voiceService';

export function CropPlanner({ farmer, language, voiceEnabled }) {
  const isHi = language === 'hi';

  // Filter state defaulting to the hero context (Kharif, July, Loamy, Rainfed, Uttarakhand, Pithoragarh)
  const [season, setSeason] = useState(farmer.currentCrop?.season || 'kharif');
  const [month, setMonth] = useState(7); // July = 7
  const [soil, setSoil] = useState(farmer.soil || 'loamy');
  const [irrigation, setIrrigation] = useState(farmer.irrigation || 'rainfed');

  const monthNames = [
    { num: 1, en: 'Jan', hi: 'जनवरी' },
    { num: 2, en: 'Feb', hi: 'फरवरी' },
    { num: 3, en: 'Mar', hi: 'मार्च' },
    { num: 4, en: 'Apr', hi: 'अप्रैल' },
    { num: 5, en: 'May', hi: 'मई' },
    { num: 6, en: 'Jun', hi: 'जून' },
    { num: 7, en: 'Jul', hi: 'जुलाई' },
    { num: 8, en: 'Aug', hi: 'अगस्त' },
    { num: 9, en: 'Sep', hi: 'सितंबर' },
    { num: 10, en: 'Oct', hi: 'अक्टूबर' },
    { num: 11, en: 'Nov', hi: 'नवंबर' },
    { num: 12, en: 'Dec', hi: 'दिसंबर' }
  ];

  // Run the deterministic engine
  const evaluation = evaluateCropSuitability({
    season,
    month,
    soil,
    irrigation,
    state: farmer.state || 'Uttarakhand',
    district: farmer.district || 'Pithoragarh'
  });

  const handleSpeakOverview = () => {
    const topCrop = evaluation.recommendations[0]?.crop;
    const rejectedCrop = evaluation.unsuitable[0]?.crop;
    let text = "";
    if (isHi) {
      text = `फसल योजनाकार विश्लेषण: ${season} मौसम और आपकी ${soil} मिट्टी के लिए ${topCrop ? topCrop.hindiName : 'मक्का'} सबसे उपयुक्त फसल है। मौसमी नियमों के कारण ${rejectedCrop ? rejectedCrop.hindiName : 'गेहूं'} की बुवाई अभी अनुशंसित नहीं है।`;
    } else {
      text = `Crop planner evaluation: For ${season} season and ${soil} soil in Pithoragarh, ${topCrop ? topCrop.name : 'Maize'} is highly recommended. Out-of-season crops like ${rejectedCrop ? rejectedCrop.name : 'Wheat'} are rejected with negative agronomic scoring.`;
    }
    voiceService.speak(text, isHi ? 'hi' : 'en');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Scientific Guarantee Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6DC] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0EDE1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-xs font-bold text-[#2E7D52] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHi ? 'आईसीआर कृषि कैलेंडर आधारित इंजन' : 'Deterministic ICAR Crop Calendar Engine'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">
              {isHi ? 'फसल उपयुक्तता एवं मौसम सत्यापन' : 'Crop Suitability & Seasonal Validation'}
            </h1>
            <p className="text-sm text-[#68756D] mt-1 max-w-2xl">
              {isHi
                ? 'यह इंजन मिट्टी, जल उपलब्धता और आईसीआर मौसमी नियमों का विश्लेषण कर उपयुक्त फसलें सुझाता है तथा अनुपयुक्त फसलों के अस्वीकृति का वैज्ञानिक कारण स्पष्ट करता है।'
                : 'Zero hallucinations: rigorously matches photoperiod, sowing calendar, soil texture, and irrigation against ICAR agronomic rules.'}
            </p>
          </div>

          {voiceEnabled && (
            <button
              onClick={handleSpeakOverview}
              className="px-5 py-3 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] font-bold text-xs border border-[#E8E6DC] flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
            >
              <Volume2 className="w-4 h-4 text-[#2E7D52]" />
              <span>{isHi ? 'सिफारिश सारांश सुनें' : 'Listen Evaluation'}</span>
            </button>
          )}
        </div>

        {/* Live Filter Controls */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Season Selector */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5 uppercase tracking-wider">
              {isHi ? '1. मौसम (Season)' : '1. Target Season'}
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#F7F5ED] p-1 rounded-xl border border-[#E8E6DC]">
              {[
                { id: 'kharif', label: isHi ? 'खरीफ' : 'Kharif' },
                { id: 'rabi', label: isHi ? 'रबी' : 'Rabi' },
                { id: 'zaid', label: isHi ? 'जायद' : 'Zaid' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSeason(s.id);
                    if (s.id === 'kharif') setMonth(7);
                    if (s.id === 'rabi') setMonth(11);
                    if (s.id === 'zaid') setMonth(3);
                  }}
                  className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                    season === s.id
                      ? 'bg-[#12372A] text-white shadow-xs'
                      : 'text-[#68756D] hover:text-[#12372A]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Month Selector */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5 uppercase tracking-wider">
              {isHi ? '2. बुवाई माह (Month)' : '2. Sowing Month'}
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] font-bold text-xs text-[#12372A] focus:outline-none focus:ring-2 focus:ring-[#2E7D52]"
            >
              {monthNames.map(m => (
                <option key={m.num} value={m.num}>
                  {m.num} - {isHi ? m.hi : m.en} {m.num === 7 ? '(Hero: July Kharif)' : (m.num === 11 ? '(Rabi Sowing)' : '')}
                </option>
              ))}
            </select>
          </div>

          {/* Soil Selector */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5 uppercase tracking-wider">
              {isHi ? '3. मिट्टी का प्रकार (Soil)' : '3. Soil Texture'}
            </label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] font-bold text-xs text-[#12372A] focus:outline-none focus:ring-2 focus:ring-[#2E7D52]"
            >
              <option value="loamy">{isHi ? 'दोमट मिट्टी (Loamy)' : 'Loamy'}</option>
              <option value="clay_loam">{isHi ? 'चिकनी दोमट (Clay-Loam)' : 'Clay-Loam'}</option>
              <option value="sandy_loam">{isHi ? 'बलुई दोमट (Sandy-Loam)' : 'Sandy-Loam'}</option>
              <option value="clay">{isHi ? 'काली/चिकनी (Clay)' : 'Clay'}</option>
            </select>
          </div>

          {/* Irrigation Selector */}
          <div>
            <label className="block text-xs font-bold text-[#12372A] mb-1.5 uppercase tracking-wider">
              {isHi ? '4. सिंचाई स्रोत (Water)' : '4. Water Source'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-[#F7F5ED] p-1 rounded-xl border border-[#E8E6DC]">
              <button
                onClick={() => setIrrigation('rainfed')}
                className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  irrigation === 'rainfed'
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68756D] hover:text-[#12372A]'
                }`}
              >
                {isHi ? 'वर्षा आधारित' : 'Rainfed'}
              </button>
              <button
                onClick={() => setIrrigation('assured')}
                className={`py-2 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  irrigation === 'assured'
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68756D] hover:text-[#12372A]'
                }`}
              >
                {isHi ? 'सुनिश्चित सिंचाई' : 'Irrigated'}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Recommended Crops Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D52]" />
            <h2 className="text-xl font-extrabold text-[#12372A]">
              {isHi ? 'अनुकूल फसलें (सिफारिश)' : 'Recommended Crops'}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D52]">
              {evaluation.recommendations.length} {isHi ? 'फसलें' : 'Crops'}
            </span>
          </div>
          <span className="text-xs text-[#68756D]">
            {isHi ? 'स्कोर: मौसमी चक्र + बुवाई माह + मिट्टी + जल' : 'Scored on Season + Month + Soil + Water'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {evaluation.recommendations.map((item) => {
            const { crop, score, suitability, suitabilityLabel, reasons } = item;
            return (
              <div
                key={crop.id}
                className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Score Pill Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 rounded-2xl bg-[#F7F5ED] border border-[#E8E6DC]">
                      {crop.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#12372A]">
                        {isHi ? crop.hindiName : crop.name}
                      </h3>
                      <p className="text-xs text-[#68756D]">
                        {crop.botanicalName} • {crop.durationDays} {isHi ? 'दिन' : 'Days'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-[#2E7D52]">{score}/100</div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D52]">
                      {suitabilityLabel[language] || suitabilityLabel.en}
                    </span>
                  </div>
                </div>

                {/* Key Agricultural Metrics */}
                <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-[#F0EDE1] text-[11px]">
                  <div className="bg-[#F7F5ED] p-2 rounded-xl">
                    <span className="text-[#68756D] block">{isHi ? 'अनुमानित उपज' : 'Expected Yield'}</span>
                    <span className="font-extrabold text-[#12372A]">{crop.yieldExpected}</span>
                  </div>
                  <div className="bg-[#F7F5ED] p-2 rounded-xl">
                    <span className="text-[#68756D] block">{isHi ? 'जल मांग' : 'Water Need'}</span>
                    <span className="font-extrabold text-[#12372A] capitalize">{crop.waterNeed}</span>
                  </div>
                  <div className="bg-[#F7F5ED] p-2 rounded-xl">
                    <span className="text-[#68756D] block">{isHi ? 'अनुमानित लाभ' : 'Net Margin'}</span>
                    <span className="font-extrabold text-[#2E7D52]">{crop.netReturnEstimate}</span>
                  </div>
                </div>

                {/* Grounded Positive Reasons */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase text-[#68756D] tracking-wider block">
                    {isHi ? 'स्वीकृति के वैज्ञानिक कारण:' : 'Agronomic Verification Matches:'}
                  </span>
                  {reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#2E7D52]">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Negative Constraint Demonstration (Rejected / Out-of-Season Crops) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-[#D9534F]" />
            <h2 className="text-xl font-extrabold text-[#12372A]">
              {isHi ? 'वर्तमान में अनुशंसित नहीं (अस्वीकृति कारण सहित)' : 'Unsuitable for Current Planting (Explainable Negative Reasoning)'}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#D9534F]">
              {evaluation.unsuitable.length} {isHi ? 'फसलें' : 'Crops'}
            </span>
          </div>
        </div>

        <div className="bg-[#FFF5F5]/60 border border-[#FFCDD2] rounded-3xl p-6 sm:p-7 space-y-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#C62828] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-extrabold text-[#B71C1C]">
                {isHi ? 'वैज्ञानिक अस्वीकृति का महत्व' : 'Why Negative Agronomic Constraints Matter'}
              </h3>
              <p className="text-xs text-[#5D4037] mt-0.5 leading-relaxed">
                {isHi
                  ? 'जेनेरिक एआई अक्सर किसानों को गलत मौसम में भी कोई भी फसल सुझा देता है। एग्रीग्रो का नियम इंजन अनुपयुक्त फसलों को दृढ़ता से अस्वीकार करता है ताकि किसान का बीज, खाद और पूंजी का भारी नुकसान न हो।'
                  : 'Unlike black-box LLMs that hallucinate planting advice, AgriGrow strictly enforces ICAR seasonal biological barriers. Planting Rabi crops like Wheat in July causes complete vegetative failure due to excess heat and unsuitable day length.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluation.unsuitable.map((item) => {
              const { crop, score, negativeReasons } = item;
              return (
                <div
                  key={crop.id}
                  className="bg-white rounded-2xl p-5 border border-[#FFCDD2] shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-[#FFF5F5]">{crop.icon}</span>
                      <div>
                        <h4 className="text-base font-extrabold text-[#12372A]">
                          {isHi ? crop.hindiName : crop.name}
                        </h4>
                        <span className="text-[11px] text-[#68756D]">
                          {isHi ? 'प्राकृतिक मौसम:' : 'Natural Season:'} <strong className="uppercase">{crop.seasons.join(', ')}</strong>
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#FFEBEE] text-[#C62828]">
                      {score} {isHi ? 'अंक (अस्वीकृत)' : 'Pts (Rejected)'}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F0EDE1] space-y-1.5">
                    {negativeReasons.map((neg, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#C62828]">
                        <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{neg.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
