import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  UploadCloud, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Info, 
  FileText, 
  Leaf, 
  ExternalLink,
  Camera,
  Activity
} from 'lucide-react';
import { DISEASE_CASES } from '../data/diseases';
import { voiceService } from '../services/voice/voiceService';

export function CropHealth({ farmer, language, voiceEnabled }) {
  const isHi = language === 'hi';
  const [selectedCaseKey, setSelectedCaseKey] = useState('maize_leaf_spot');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentCase = DISEASE_CASES[selectedCaseKey] || DISEASE_CASES.maize_leaf_spot;

  const handleCaseChange = (key) => {
    setIsAnalyzing(true);
    setSelectedCaseKey(key);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSpeakDiagnosis = () => {
    let text = "";
    if (isHi) {
      text = `फसल सुरक्षा रिपोर्ट: प्रारंभिक एआई जांच में 78 प्रतिशत सटीकता के साथ ${currentCase.issueNameHindi} के लक्षण पाए गए हैं। कल होने वाली बारिश को देखते हुए खेत में जल निकासी दुरुस्त करें तथा संक्रमित निचली पत्तियों को खेत से दूर हटा दें।`;
    } else {
      text = `Crop health report: Preliminary screening detected ${currentCase.issueName} with ${currentCase.confidence} percent confidence. Given upcoming rainfall and high humidity, prioritize clearing drainage channels and removing infected lower leaves before considering chemical fungicides.`;
    }
    voiceService.speak(text, isHi ? 'hi' : 'en');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6DC] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0EDE1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5F5] text-xs font-bold text-[#C62828] mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>{isHi ? 'एआई-सहायक प्रारंभिक रोग जांच' : 'AI-Assisted Preliminary Crop Screening'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A]">
              {isHi ? 'फसल स्वास्थ्य एवं रोग निदान' : 'Crop Disease Diagnosis & Cultural IPM'}
            </h1>
            <p className="text-sm text-[#68756D] mt-1 max-w-2xl">
              {isHi
                ? 'कंप्यूटर विज़न द्वारा पत्ती के लक्षणों की पहचान। रासायनिक दवाओं के अंधाधुंध छिड़काव से पहले जैविक व सांस्कृतिक प्रबंधन को प्राथमिकता।'
                : 'Computer vision leaf lesion screening coupled with micro-climate risk correlation. Emphasizes cultural and non-chemical IPM interventions.'}
            </p>
          </div>

          {voiceEnabled && (
            <button
              onClick={handleSpeakDiagnosis}
              className="px-5 py-3 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] font-bold text-xs border border-[#E8E6DC] flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
            >
              <Volume2 className="w-4 h-4 text-[#2E7D52]" />
              <span>{isHi ? 'निदान सलाह सुनें' : 'Listen Diagnosis'}</span>
            </button>
          )}
        </div>

        {/* Sample Case Selector / Image Upload Simulator */}
        <div className="pt-6">
          <label className="block text-xs font-bold text-[#12372A] mb-3 uppercase tracking-wider">
            {isHi ? 'नमूना रोग जांच केस चुनें (या अपनी पत्ती की फोटो अपलोड करें)' : 'Select Diagnostic Sample Case (or upload test leaf)'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div
              onClick={() => handleCaseChange('maize_leaf_spot')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                selectedCaseKey === 'maize_leaf_spot'
                  ? 'border-[#2E7D52] bg-[#E8F5E9] shadow-sm ring-2 ring-[#2E7D52]/20'
                  : 'border-[#E8E6DC] bg-[#F7F5ED] hover:bg-[#F2EFE5]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E6DC] flex items-center justify-center text-2xl flex-shrink-0">
                🌽
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#12372A]">
                    {isHi ? 'केस 1: मक्का पत्ती धब्बा रोग' : 'Case 1: Maize Maydis Leaf Blight'}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#12372A] text-white">
                    {isHi ? 'हीरो केस' : 'Hero Scenario'}
                  </span>
                </div>
                <p className="text-xs text-[#68756D] truncate mt-0.5">
                  {isHi ? 'पिथौरागढ़ मक्का • 78% सटीकता • 84% आर्द्रता जोखिम' : 'Pithoragarh Field • 78% Conf. • Humidity Risk'}
                </p>
              </div>
            </div>

            <div
              onClick={() => handleCaseChange('wheat_yellow_rust')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                selectedCaseKey === 'wheat_yellow_rust'
                  ? 'border-[#2E7D52] bg-[#E8F5E9] shadow-sm ring-2 ring-[#2E7D52]/20'
                  : 'border-[#E8E6DC] bg-[#F7F5ED] hover:bg-[#F2EFE5]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E6DC] flex items-center justify-center text-2xl flex-shrink-0">
                🌾
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-extrabold text-sm text-[#12372A]">
                  {isHi ? 'केस 2: गेहूं पीला रतुआ (येलो रस्ट)' : 'Case 2: Wheat Stripe / Yellow Rust'}
                </span>
                <p className="text-xs text-[#68756D] truncate mt-0.5">
                  {isHi ? 'रबी निगरानी • 84% सटीकता • केवीके अलार्म' : 'Rabi Surveillance • 84% Conf. • KVK Alert'}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Diagnostic Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Leaf Photo & Visual Evidence */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE1]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#68756D]">
                {isHi ? 'विश्लेषित पत्ती की छवि' : 'Analyzed Leaf Sample'}
              </span>
              <span className="text-xs font-black text-[#2E7D52] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                {currentCase.confidence}% {isHi ? 'सटीकता' : 'Confidence'}
              </span>
            </div>

            {/* Image Box */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-[#E8E6DC] aspect-video relative bg-[#F7F5ED] group">
              <img
                src={currentCase.sampleImageUrl}
                alt="Leaf specimen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs font-medium">
                  {isHi ? 'पहचाने गए लक्षण: अंडाकार धब्बे व पीली परिधि' : 'Detected: Elliptical chlorotic lesion clusters'}
                </div>
              </div>
            </div>

            {/* AI Disclaimer Alert */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#FFF8E1] border border-[#FFE082] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#D97706] mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-[#92400E] leading-relaxed">
                {currentCase.screeningDisclaimer[language] || currentCase.screeningDisclaimer.en}
              </p>
            </div>
          </div>

          {/* Environmental Risk Correlation */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm space-y-3">
            <h4 className="text-sm font-extrabold text-[#12372A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D9534F]" />
              <span>{isHi ? 'मौसम व पर्यावरण जोखिम कारक' : 'Micro-Climate Risk Correlation'}</span>
            </h4>
            <div className="space-y-2">
              {currentCase.riskFactors.map((rf, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FFF5F5] border border-[#FFCDD2] text-xs text-[#B71C1C]">
                  • {rf[language] || rf.en}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Symptoms & Cultural Treatment Protocols */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Diagnostic Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6DC] shadow-sm space-y-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C62828] bg-[#FFEBEE] px-3 py-1 rounded-full">
                {isHi ? 'पहचाना गया रोग' : 'Detected Pathology'}
              </span>
              <h2 className="text-2xl font-black text-[#12372A] mt-2">
                {isHi ? currentCase.issueNameHindi : currentCase.issueName}
              </h2>
              <p className="text-xs text-[#68756D]">
                {isHi ? `फसल: ${currentCase.cropHindi} • अवस्था: वानस्पतिक` : `Crop: ${currentCase.crop} • Stage: Vegetative`}
              </p>
            </div>

            {/* Observed Symptoms */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase text-[#68756D] tracking-wider mb-2">
                {isHi ? 'जांच में पाए गए प्रमुख लक्षण:' : 'Observed Symptom Signatures:'}
              </h3>
              <div className="space-y-2">
                {currentCase.symptomsObserved.map((sym, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#12372A] bg-[#F7F5ED] p-3 rounded-xl border border-[#E8E6DC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F] mt-1.5 flex-shrink-0" />
                    <span>{sym[language] || sym.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Non-Chemical Cultural IPM Steps */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE1]">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#2E7D52]" />
                <h3 className="text-base font-extrabold text-[#12372A]">
                  {isHi ? 'प्राथमिक जैविक व सांस्कृतिक उपचार (गैर-रासायनिक)' : 'Non-Chemical Cultural IPM Actions'}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#2E7D52] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                {isHi ? 'प्राथमिकता' : 'First Response'}
              </span>
            </div>

            <div className="space-y-3">
              {currentCase.recommendedActions.map((act, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F5ED] border border-[#E8E6DC] space-y-1">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-[#12372A]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D52] flex-shrink-0" />
                    <span>{act.title[language] || act.title.en}</span>
                  </div>
                  <p className="text-xs text-[#4A5D53] pl-6 leading-relaxed">
                    {act.desc[language] || act.desc.en}
                  </p>
                </div>
              ))}
            </div>

            {/* Secondary KVK Escalation Notice */}
            <div className="mt-4 pt-4 border-t border-[#F0EDE1] flex items-center justify-between text-xs text-[#68756D]">
              <span>
                {isHi ? 'रासायनिक दवा की आवश्यकता होने पर:' : 'If chemical spray is considered:'} <strong>KVK Pithoragarh (+91 5964 225112)</strong>
              </span>
              <a
                href="#kvk"
                onClick={(e) => { e.preventDefault(); alert(isHi ? "स्थानीय कृषि विज्ञान केंद्र संपर्क: 05964-225112 (पिथौरागढ़)" : "Local KVK Extension Contact: 05964-225112"); }}
                className="font-bold text-[#2E7D52] hover:underline flex items-center gap-1"
              >
                <span>{isHi ? 'केवीके संपर्क' : 'Contact KVK'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
