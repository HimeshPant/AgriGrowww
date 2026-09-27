import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Sprout, 
  Droplet, 
  Check, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { DEFAULT_FARMER } from '../data/defaultFarmer';
import { CROPS } from '../data/crops';

export function Onboarding({ farmer, onSaveFarmer, onResetHero, language, onCancel }) {
  const isHi = language === 'hi';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: farmer.name || 'Himesh Pant',
    hindiName: farmer.hindiName || 'हिमेश पंत',
    state: farmer.state || 'Uttarakhand',
    district: farmer.district || 'Pithoragarh',
    village: farmer.village || 'Chandak',
    farmSizeAcres: farmer.farmSizeAcres || 2.0,
    soil: farmer.soil || 'loamy',
    irrigation: farmer.irrigation || 'rainfed',
    cropKey: farmer.currentCrop?.id || 'maize',
    season: farmer.currentCrop?.season || 'kharif',
    stage: farmer.currentCrop?.stage || 'vegetative'
  });

  const soilOptions = [
    { id: 'loamy', label: { en: 'Loamy (दोमट)', hi: 'दोमट मिट्टी (Loamy)' }, desc: { en: 'Balanced moisture & nutrient retention', hi: 'उत्कृष्ट जल व पोषण धारण क्षमता' } },
    { id: 'clay_loam', label: { en: 'Clay-Loam (चिकनी दोमट)', hi: 'चिकनी दोमट (Clay-Loam)' }, desc: { en: 'Heavy, rich in organic matter', hi: 'गहरी व भारी मिट्टी' } },
    { id: 'sandy_loam', label: { en: 'Sandy-Loam (बलुई दोमट)', hi: 'बलुई दोमट (Sandy-Loam)' }, desc: { en: 'Fast draining, warms quickly', hi: 'शीघ्र जल निकासी वाली' } },
    { id: 'clay', label: { en: 'Clay (काली/चिकनी)', hi: 'काली/चिकनी मिट्टी (Clay)' }, desc: { en: 'High water retention capacity', hi: 'अत्यधिक जल अवशोषण क्षमता' } }
  ];

  const irrigationOptions = [
    { id: 'rainfed', label: { en: 'Rainfed (वर्षा आधारित)', hi: 'वर्षा आधारित (Rainfed)' }, desc: { en: 'Dependent on monsoon & natural rainfall', hi: 'केवल मानसूनी बारिश पर निर्भर' } },
    { id: 'canal', label: { en: 'Canal / Stream (गूल/नहर)', hi: 'गूल/नहर (Canal/Gul)' }, desc: { en: 'Periodic gravity hill stream irrigation', hi: 'पहाड़ी गूल या मौसमी नहर' } },
    { id: 'tubewell', label: { en: 'Borewell / Tube-well (नलकूप)', hi: 'नलकूप / बोरवेल (Tube-well)' }, desc: { en: 'Assured groundwater pump supply', hi: 'पंप द्वारा सुनिश्चित जल आपूर्ति' } },
    { id: 'drip', label: { en: 'Drip / Micro-irrigation (टपक)', hi: 'टपक सिंचाई (Drip Irrigation)' }, desc: { en: 'High water efficiency precision system', hi: 'जल बचत हेतु आधुनिक ड्रिप' } }
  ];

  const cropKeys = Object.keys(CROPS);

  const handleFinish = () => {
    const selectedCropData = CROPS[formData.cropKey] || CROPS.maize;
    const updatedFarmer = {
      ...farmer,
      name: formData.name,
      hindiName: formData.hindiName,
      state: formData.state,
      district: formData.district,
      village: formData.village,
      farmSizeAcres: parseFloat(formData.farmSizeAcres) || 2.0,
      soil: formData.soil,
      irrigation: formData.irrigation,
      currentCrop: {
        id: selectedCropData.id,
        name: selectedCropData.name,
        hindiName: selectedCropData.hindiName,
        icon: selectedCropData.icon,
        season: formData.season,
        sowingDate: "2026-06-18",
        stage: formData.stage,
        stageHindi: formData.stage === 'vegetative' ? 'वानस्पतिक वृद्धि' : (formData.stage === 'flowering' ? 'फूल आने की अवस्था' : 'बुवाई'),
        stageProgressPercent: formData.stage === 'vegetative' ? 42 : (formData.stage === 'flowering' ? 65 : 15),
        stageDay: formData.stage === 'vegetative' ? 42 : 20,
        totalCycleDays: selectedCropData.durationDays
      }
    };
    onSaveFarmer(updatedFarmer);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Bar with Hero Quick Reset */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6DC] shadow-sm mb-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6DC]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D52] bg-[#E8F5E9] px-3 py-1 rounded-full">
              {isHi ? 'खेत विन्यास एवं प्रोफाइल' : 'Farm Profile Setup'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#12372A] mt-2">
              {isHi ? 'अपने खेत का विवरण दर्ज करें' : 'Configure Farm Parameters'}
            </h1>
            <p className="text-sm text-[#68756D] mt-1">
              {isHi 
                ? 'कृषि नियम इंजन आपकी मिट्टी, जल स्रोत और स्थान के आधार पर सलाह तैयार करेगा।'
                : 'The agricultural rule engine personalizes recommendations based on your soil, water source, and micro-climate.'}
            </p>
          </div>

          <button
            onClick={onResetHero}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] text-[#12372A] text-xs font-bold border border-[#E8E6DC] transition-all cursor-pointer flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#2E7D52]" />
            <span>{isHi ? 'पिथौरागढ़ हीरो डेमो रीसेट करें' : 'Reset to Hero Demo (Pithoragarh)'}</span>
          </button>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 my-6">
          <button
            onClick={() => setStep(1)}
            className={`p-3 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              step === 1 
                ? 'bg-[#12372A] text-white border-[#12372A] shadow-md' 
                : 'bg-[#F7F5ED] text-[#4A5D53] border-[#E8E6DC]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isHi ? 'चरण 1' : 'Step 1'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold mt-1 truncate">
              {isHi ? 'स्थान व विवरण' : 'Location & Bio'}
            </div>
          </button>

          <button
            onClick={() => setStep(2)}
            className={`p-3 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              step === 2 
                ? 'bg-[#12372A] text-white border-[#12372A] shadow-md' 
                : 'bg-[#F7F5ED] text-[#4A5D53] border-[#E8E6DC]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
              <Layers className="w-3.5 h-3.5" />
              <span>{isHi ? 'चरण 2' : 'Step 2'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold mt-1 truncate">
              {isHi ? 'मिट्टी व सिंचाई' : 'Soil & Water'}
            </div>
          </button>

          <button
            onClick={() => setStep(3)}
            className={`p-3 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              step === 3 
                ? 'bg-[#12372A] text-white border-[#12372A] shadow-md' 
                : 'bg-[#F7F5ED] text-[#4A5D53] border-[#E8E6DC]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
              <Sprout className="w-3.5 h-3.5" />
              <span>{isHi ? 'चरण 3' : 'Step 3'}</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold mt-1 truncate">
              {isHi ? 'फसल व चरण' : 'Crop & Season'}
            </div>
          </button>
        </div>

        {/* Step 1: Location & Farmer Info */}
        {step === 1 && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  {isHi ? 'किसान का नाम (अंग्रेजी / हिंदी)' : 'Farmer Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D52] font-semibold text-sm"
                  placeholder="e.g. Himesh Pant"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  {isHi ? 'खेत का आकार (एकड़)' : 'Farm Size (Acres)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.farmSizeAcres}
                  onChange={(e) => setFormData({ ...formData, farmSizeAcres: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D52] font-semibold text-sm"
                  placeholder="2.0"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  {isHi ? 'राज्य (State)' : 'State'}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D52] font-semibold text-sm"
                  placeholder="Uttarakhand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1.5">
                  {isHi ? 'जिला (District)' : 'District'}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E6DC] bg-[#F7F5ED] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D52] font-semibold text-sm"
                  placeholder="Pithoragarh"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#2E7D52] text-white font-bold text-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>{isHi ? 'अगला: मिट्टी व सिंचाई' : 'Next: Soil & Water'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Soil & Water */}
        {step === 2 && (
          <div className="space-y-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-2 uppercase tracking-wider">
                {isHi ? 'मिट्टी का प्रकार (Soil Type)' : 'Select Soil Texture'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {soilOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, soil: opt.id })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.soil === opt.id
                        ? 'border-[#2E7D52] bg-[#E8F5E9] shadow-sm'
                        : 'border-[#E8E6DC] bg-[#F7F5ED] hover:bg-[#F0EDE1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#12372A]">{opt.label[language] || opt.label.en}</span>
                      {formData.soil === opt.id && <CheckCircle2 className="w-5 h-5 text-[#2E7D52]" />}
                    </div>
                    <p className="text-xs text-[#68756D] mt-1">{opt.desc[language] || opt.desc.en}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-2 uppercase tracking-wider">
                {isHi ? 'सिंचाई की सुविधा (Irrigation Method)' : 'Select Irrigation Availability'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {irrigationOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, irrigation: opt.id })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.irrigation === opt.id
                        ? 'border-[#2E7D52] bg-[#E8F5E9] shadow-sm'
                        : 'border-[#E8E6DC] bg-[#F7F5ED] hover:bg-[#F0EDE1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#12372A]">{opt.label[language] || opt.label.en}</span>
                      {formData.irrigation === opt.id && <CheckCircle2 className="w-5 h-5 text-[#2E7D52]" />}
                    </div>
                    <p className="text-xs text-[#68756D] mt-1">{opt.desc[language] || opt.desc.en}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-2xl bg-white border border-[#E8E6DC] text-[#12372A] font-bold text-sm cursor-pointer"
              >
                {isHi ? 'पीछे' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#2E7D52] text-white font-bold text-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>{isHi ? 'अगला: फसल व चरण' : 'Next: Crop & Season'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Crop & Stage */}
        {step === 3 && (
          <div className="space-y-6 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-2 uppercase tracking-wider">
                {isHi ? 'वर्तमान मौसम (Current Season)' : 'Current Agricultural Season'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['kharif', 'rabi', 'zaid'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, season: s })}
                    className={`py-3 px-4 rounded-xl font-extrabold text-sm border capitalize transition-all cursor-pointer ${
                      formData.season === s
                        ? 'bg-[#12372A] text-white border-[#12372A]'
                        : 'bg-[#F7F5ED] text-[#4A5D53] border-[#E8E6DC]'
                    }`}
                  >
                    {s === 'kharif' ? (isHi ? 'खरीफ (Kharif)' : 'Kharif (Monsoon)') : 
                     s === 'rabi' ? (isHi ? 'रबी (Rabi)' : 'Rabi (Winter)') : 
                     (isHi ? 'जायद (Zaid)' : 'Zaid (Summer)')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-2 uppercase tracking-wider">
                {isHi ? 'बोई गई फसल चुनें (Select Active Crop)' : 'Select Active Crop'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cropKeys.map((k) => {
                  const c = CROPS[k];
                  const isSelected = formData.cropKey === k;
                  return (
                    <div
                      key={k}
                      onClick={() => setFormData({ ...formData, cropKey: k })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'border-[#2E7D52] bg-[#E8F5E9] shadow-sm'
                          : 'border-[#E8E6DC] bg-[#F7F5ED] hover:bg-[#F0EDE1]'
                      }`}
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <div className="font-extrabold text-xs text-[#12372A]">
                          {isHi ? c.hindiName : c.name}
                        </div>
                        <div className="text-[10px] text-[#68756D] uppercase">
                          {c.seasons.join(', ')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#12372A] mb-2 uppercase tracking-wider">
                {isHi ? 'फसल की वर्तमान अवस्था (Crop Stage)' : 'Current Crop Stage'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'sowing', label: { en: 'Sowing / Seedling', hi: 'बुवाई / अंकुरण' } },
                  { id: 'vegetative', label: { en: 'Vegetative (D-42)', hi: 'वानस्पतिक वृद्धि' } },
                  { id: 'flowering', label: { en: 'Flowering / Tasseling', hi: 'फूल / दाना भराव' } }
                ].map((stg) => (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, stage: stg.id })}
                    className={`py-3 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      formData.stage === stg.id
                        ? 'bg-[#2E7D52] text-white border-[#2E7D52]'
                        : 'bg-[#F7F5ED] text-[#4A5D53] border-[#E8E6DC]'
                    }`}
                  >
                    {stg.label[language] || stg.label.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-[#E8E6DC]">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-2xl bg-white border border-[#E8E6DC] text-[#12372A] font-bold text-sm cursor-pointer"
              >
                {isHi ? 'पीछे' : 'Back'}
              </button>

              <div className="flex items-center gap-3">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="px-4 py-3 rounded-2xl text-[#68756D] hover:text-[#12372A] font-semibold text-sm cursor-pointer"
                  >
                    {isHi ? 'रद्द करें' : 'Cancel'}
                  </button>
                )}
                <button
                  onClick={handleFinish}
                  className="px-8 py-3.5 rounded-2xl bg-[#2E7D52] hover:bg-[#12372A] text-white font-extrabold text-sm shadow-lg shadow-[#2E7D52]/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span>{isHi ? 'प्रोफाइल सहेजें एवं डैशबोर्ड खोलें' : 'Save & Open Farm Dashboard'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
