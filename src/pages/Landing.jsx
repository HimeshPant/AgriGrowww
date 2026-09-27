import React from 'react';
import { 
  Sprout, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CloudRain, 
  TrendingUp, 
  Mic, 
  Layers, 
  ChevronRight,
  CheckCircle2,
  Calendar,
  Compass,
  Cpu
} from 'lucide-react';

export function Landing({ onStart, onConfigure, language }) {
  const isHi = language === 'hi';

  const features = [
    {
      icon: Cpu,
      title: isHi ? 'वैज्ञानिक कृषि नियम इंजन' : 'Deterministic ICAR Rule Engine',
      desc: isHi 
        ? 'आईसीआर (ICAR) कृषि कैलेंडर पर आधारित फसल सिफारिशें। रबी व खरीफ फसलों के मौसमी नियमों का 100% कड़ाई से पालन।'
        : 'Zero-hallucination crop suitability grounded in ICAR crop calendars, agro-climatic zones, and soil-water matrix.'
    },
    {
      icon: CloudRain,
      title: isHi ? 'मौसम-संवेदनशील सिंचाई निर्णय' : 'Weather-Aware Decision Support',
      desc: isHi
        ? 'कल 70% बारिश का पूर्वानुमान → आज सिंचाई स्थगित करने की सलाह। जलभराव और फंगल संक्रमण से बचाव।'
        : 'Translates 3-day hyperlocal weather forecasts into unambiguous farm actions: "Delay irrigation, prep drainage."'
    },
    {
      icon: ShieldCheck,
      title: isHi ? 'एआई फसल सुरक्षा व प्रारंभिक जांच' : 'AI Crop Health Preliminary Screening',
      desc: isHi
        ? 'पत्ती के लक्षणों की जांच, 78% सटीकता के साथ रोग पहचान और जैविक/सांस्कृतिक उपचार सुझाव।'
        : 'Instant leaf symptom analysis with clear confidence levels, environmental risk factors, and non-chemical cultural steps.'
    },
    {
      icon: Mic,
      title: isHi ? 'द्विभाषी आवाज सहायक (हिंदी / अंग्रेजी)' : 'Bilingual Voice Engine (Hindi & English)',
      desc: isHi
        ? 'कम साक्षरता व बुजुर्ग किसानों हेतु पूर्ण आवाज समर्थन। बोलकर सवाल पूछें और अपनी भाषा में सलाह सुनें।'
        : 'Accessible voice input and spoken audio advisories, with an architecture ready for Digital India Bhashini.'
    },
    {
      icon: TrendingUp,
      title: isHi ? 'मंडी भाव व बिक्री पूर्वानुमान' : 'Mandi Intelligence & Selling Timing',
      desc: isHi
        ? 'स्थानीय व निकटवर्ती मंडियों के भाव, 7-दिवसीय रुझान तथा बेहतर मुनाफे के लिए बिक्री का सही समय।'
        : 'Real-time modal mandi rates, multi-market comparison (Pithoragarh, Haldwani), and price trend trajectory.'
    },
    {
      icon: Layers,
      title: isHi ? 'एग्रीस्टैक व डिजिटल पब्लिक इंफ्रास्ट्रक्चर' : 'DPI & AgriStack Integration Ready',
      desc: isHi
        ? 'मृदा स्वास्थ्य कार्ड (Soil Health Card), किसान आईडी, ई-नाम (eNAM) व कृषि निर्णय प्रणाली के अनुकूल।'
        : 'Engineered for seamless interoperability with AgriStack, Krishi DSS, Soil Health Cards, and eNAM.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5ED] text-[#12372A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8E6DC]">
        {/* Soft background accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2E7D52]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F4B942]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12372A]/5 border border-[#12372A]/10 text-xs font-semibold text-[#12372A]">
                <Sparkles className="w-3.5 h-3.5 text-[#2E7D52]" />
                <span>{isHi ? 'स्मार्ट इंडिया हैकाथॉन 2026 • समस्या ID: 26193' : 'Smart India Hackathon 2026 • PS ID: 26193'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#12372A] leading-[1.12]">
                {isHi ? (
                  <>
                    वैज्ञानिक कृषि निर्णय। <br />
                    <span className="text-[#2E7D52]">हर किसान, हर खेत, हर मौसम।</span>
                  </>
                ) : (
                  <>
                    Grow Smarter. <br />
                    <span className="text-[#2E7D52]">Decide Better.</span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl text-[#4A5D53] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {isHi
                  ? 'अस्पष्ट सलाह नहीं, बल्कि मौसम, मिट्टी और फसल स्थिति के अनुसार सटीक निर्णय। भारत के लघु एवं सीमांत किसानों के लिए एआई व आईसीआर वैज्ञानिक नियमों पर आधारित कृषि साथी।'
                  : 'Context-aware agricultural intelligence converting micro-climate forecasts, soil records, and crop stages into explainable, timely farm actions with voice-first Hindi & English interaction.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#12372A] hover:bg-[#2E7D52] text-white font-bold text-base shadow-xl shadow-[#12372A]/20 transition-all flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span>{isHi ? 'लाइव फार्म डेमो देखें (पिथौरागढ़)' : 'Launch Live Demo (Pithoragarh)'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onConfigure}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-[#F0EDE1] text-[#12372A] font-semibold text-base border border-[#E8E6DC] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-5 h-5 text-[#2E7D52]" />
                  <span>{isHi ? 'नया खेत कॉन्फ़िगर करें' : 'Setup New Farm Profile'}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E8E6DC] max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-2xl font-black text-[#12372A]">100%</div>
                  <div className="text-xs text-[#68756D]">{isHi ? 'आईसीआर कैलेंडर अनुपालन' : 'ICAR Calendar Grounded'}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#2E7D52]">2 Lang</div>
                  <div className="text-xs text-[#68756D]">{isHi ? 'हिंदी व अंग्रेजी आवाज' : 'Voice Input & TTS'}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#F4B942]">eNAM</div>
                  <div className="text-xs text-[#68756D]">{isHi ? 'मंडी एकीकरण तैयार' : 'Market Ready'}</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Live Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6DC] shadow-2xl shadow-[#12372A]/10 relative">
                
                {/* Active Farm Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#F0EDE1]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D52] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                      {isHi ? 'लाइव सिमुलेशन संदर्भ' : 'Active Demo Context'}
                    </span>
                    <h3 className="text-xl font-bold text-[#12372A] mt-1">
                      {isHi ? 'पिथौरागढ़ पहाड़ी प्रक्षेत्र' : 'Pithoragarh Hill Terrace'}
                    </h3>
                    <p className="text-xs text-[#68756D]">
                      {isHi ? 'उत्तराखंड • 2 एकड़ • वर्षा आधारित • दोमट मिट्टी' : 'Uttarakhand • 2 Acres • Rainfed • Loamy'}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-2xl">
                    🌽
                  </div>
                </div>

                {/* Key Context Indicators */}
                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="bg-[#F7F5ED] p-3.5 rounded-2xl border border-[#E8E6DC]">
                    <div className="text-xs text-[#68756D] font-medium">{isHi ? 'सक्रिय फसल व चरण' : 'Crop & Stage'}</div>
                    <div className="text-sm font-bold text-[#12372A] mt-0.5">{isHi ? 'मक्का (वानस्पतिक 42 दिन)' : 'Maize (Vegetative D-42)'}</div>
                  </div>
                  <div className="bg-[#FFF8E1] p-3.5 rounded-2xl border border-[#FFE082]">
                    <div className="text-xs text-[#D97706] font-medium">{isHi ? 'मौसम चेतावनी' : 'Weather Trigger'}</div>
                    <div className="text-sm font-bold text-[#92400E] mt-0.5">{isHi ? 'कल 70% बारिश (18mm)' : 'Rain 70% Tom. (18mm)'}</div>
                  </div>
                </div>

                {/* Actionable Decision Highlight */}
                <div className="bg-[#FFF5F5] border border-[#FFCDD2] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C62828] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#C62828] animate-ping" />
                    {isHi ? 'आज की कृषि सलाह (निर्णय)' : "Today's Verified Advisory"}
                  </div>
                  <h4 className="text-sm font-extrabold text-[#B71C1C]">
                    {isHi ? 'आज सिंचाई रोकें तथा जल निकासी सुनिश्चित करें' : 'Delay Irrigation Today • Clear Furrow Drains'}
                  </h4>
                  <p className="text-xs text-[#5D4037] leading-relaxed">
                    {isHi 
                      ? 'कल 18 मिमी वर्षा की प्रबल संभावना है तथा मिट्टी में 68% नमी पहले से मौजूद है। आज पानी देने से मक्के की जड़ों में सड़न हो सकती है।'
                      : 'Soil moisture is 68% adequate and 18mm rain arrives tomorrow. Avoid waterlogging in vegetative maize.'}
                  </p>
                </div>

                {/* Button to enter */}
                <button
                  onClick={onStart}
                  className="mt-5 w-full py-3.5 rounded-xl bg-[#2E7D52] hover:bg-[#12372A] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isHi ? 'यह फार्म डैशबोर्ड खोलें' : 'Open This Farm Dashboard'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Innovation Pillars (Problem Statement Coverage) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D52] bg-[#E8F5E9] px-3 py-1 rounded-full">
              {isHi ? 'समाधान स्तंभ' : 'Platform Architecture'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12372A]">
              {isHi ? 'कृषि विज्ञान और कृत्रिम बुद्धिमत्ता का संगम' : 'Built for Real Indian Agriculture'}
            </h2>
            <p className="text-[#68756D] text-base">
              {isHi
                ? 'काल्पनिक या अधूरी सलाह नहीं। प्रत्येक निर्णय भारतीय कृषि अनुसंधान परिषद (ICAR) के नियमों, स्थानीय मौसम तथा किसान की मिट्टी के अनुकूल होता है।'
                : 'Engineered to overcome common AI pitfalls: grounded in ICAR crop calendars, real-time micro-climate, and low-literacy voice usability.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-7 rounded-3xl bg-[#F7F5ED] hover:bg-[#F2EFE5] border border-[#E8E6DC] transition-all hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8E6DC] flex items-center justify-center text-[#2E7D52] shadow-sm mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#12372A] mb-2">{feat.title}</h3>
                  <p className="text-sm text-[#4A5D53] leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Negative Reasoning Demonstration Banner */}
      <section className="py-16 bg-[#12372A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#66BB6A] bg-white/10 px-3 py-1 rounded-full">
                {isHi ? 'विश्वसनीय कृषि तर्क' : 'Zero Hallucination Guarantee'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isHi 
                  ? 'यह प्रणाली केवल क्या करना है नहीं, बल्कि क्या नहीं करना चाहिए यह भी स्पष्ट रूप से बताती है'
                  : 'Explainable Agriculture: Showing What NOT to Plant and Why'}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {isHi
                  ? 'उदाहरण के लिए, जुलाई में खरीफ मौसम के दौरान यदि कोई किसान गेहूं (Wheat) की बुवाई देखना चाहे, तो इंजन तुरंत -50 अंक घटाकर वैज्ञानिक कारण दिखाता है: "गेहूं रबी फसल है, जुलाई में बुवाई करने से प्रकाश-अवधि व तापमान चक्र नष्ट हो जाएगा।"'
                  : 'In July Kharif, our crop planner rejects Rabi crops like Wheat with strict ICAR agronomic rules, protecting farmers from catastrophic seed investment losses.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={onStart}
                className="px-6 py-3.5 rounded-2xl bg-[#66BB6A] hover:bg-[#81C784] text-[#12372A] font-black text-sm shadow-xl transition-all cursor-pointer"
              >
                {isHi ? 'फसल योजनाकार में देखें' : 'Test Crop Planner Engine'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-white border-t border-[#E8E6DC] text-center text-xs text-[#68756D]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-[#12372A]">
            AgriGrow • Student Innovation in Agriculture • Smart India Hackathon 2026 (PS 26193)
          </p>
          <p>
            Designed with ICAR Agronomic Protocols • Web Speech API & Bhashini Architecture • Open Mandi (eNAM) Compatibility
          </p>
        </div>
      </footer>
    </div>
  );
}
