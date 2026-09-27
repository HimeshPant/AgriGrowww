import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplet, 
  Bug, 
  TrendingUp, 
  Volume2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle, 
  Circle,
  AlertTriangle,
  Layers,
  Sprout,
  Compass,
  Headphones,
  Check
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AdvisoryCard } from '../components/AdvisoryCard';
import { generateDailyAdvisory } from '../engine/advisoryEngine';
import { WEATHER_FORECAST } from '../data/weather';

export function Dashboard({ 
  farmer, 
  weather = WEATHER_FORECAST, 
  language, 
  voiceEnabled, 
  onOpenFarmBrief, 
  onNavigate 
}) {
  const isHi = language === 'hi';
  const advisory = generateDailyAdvisory(farmer, weather);

  // Weekly checklist state
  const [tasks, setTasks] = useState(
    advisory.weeklyTasks.map(t => ({ ...t, completed: t.status === 'urgent' ? false : false }))
  );

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const cropStages = [
    { id: 'prep', name: { en: 'Land Prep', hi: 'खेत की तैयारी' }, done: true },
    { id: 'sow', name: { en: 'Sowing & Germination', hi: 'बुवाई व अंकुरण' }, done: true },
    { id: 'veg', name: { en: 'Vegetative (D-42)', hi: 'वानस्पतिक विकास' }, current: true },
    { id: 'flow', name: { en: 'Tasseling / Silking', hi: 'नर मंजरी / सिल्क' }, upcoming: true },
    { id: 'grain', name: { en: 'Grain Filling', hi: 'दाना भराव' }, upcoming: true },
    { id: 'harv', name: { en: 'Harvest & Mandi', hi: 'कटाई व मंडी' }, upcoming: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Farm Context Banner */}
      <div className="bg-gradient-to-r from-[#12372A] to-[#1E4D3A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#2E7D52]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-[#66BB6A]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#66BB6A] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHi ? 'आईसीआर कृषि नियम इंजन सक्रिय' : 'ICAR Farm Intelligence Active'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              {isHi ? `नमस्ते, ${farmer.hindiName || farmer.name}!` : `Namaste, ${farmer.name}!`}
            </h1>

            <p className="text-white/80 text-sm max-w-2xl font-normal leading-relaxed">
              {isHi
                ? `${farmer.district}, ${farmer.state} • ${farmer.farmSizeAcres} एकड़ (${farmer.irrigation === 'rainfed' ? 'वर्षा आधारित' : 'सिंचित'}) • ${farmer.soil} मिट्टी • खरीफ मक्का (42 दिन)`
                : `${farmer.district}, ${farmer.state} • ${farmer.farmSizeAcres} Acres (${farmer.irrigation}) • ${farmer.soil} Soil • Kharif Maize (Day 42)`}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenFarmBrief}
              className="px-5 py-3 rounded-2xl bg-[#66BB6A] hover:bg-[#81C784] text-[#12372A] font-bold text-sm shadow-lg shadow-black/20 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105"
            >
              <Headphones className="w-4 h-4" />
              <span>{isHi ? 'दैनिक ऑडियो ब्रीफ सुनें' : 'Listen Farm Brief'}</span>
            </button>

            <button
              onClick={() => onNavigate('onboarding')}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 cursor-pointer transition-all"
            >
              {isHi ? 'खेत बदलें' : 'Edit Farm'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CloudSun}
          iconColor="#2E7D52"
          label={isHi ? 'मौसम व वर्षा' : 'Hyperlocal Weather'}
          value="28°C"
          subValue={isHi ? 'कल 70% बारिश (18mm)' : 'Rain 70% Tom. (18mm)'}
          badgeText={isHi ? 'सावधान' : 'Rain Alert'}
          badgeType="amber"
          onClick={() => onNavigate('weather')}
        />

        <StatCard
          icon={Droplet}
          iconColor="#1E88E5"
          label={isHi ? 'मिट्टी में नमी' : 'Soil Moisture'}
          value="68%"
          subValue={isHi ? 'वानस्पतिक मक्के हेतु पर्याप्त' : 'Adequate for Vegetative'}
          badgeText={isHi ? 'पर्याप्त' : 'Optimal'}
          badgeType="emerald"
          onClick={() => onNavigate('weather')}
        />

        <StatCard
          icon={Bug}
          iconColor="#D9534F"
          label={isHi ? 'कीट व फफूंद जोखिम' : 'Disease & Pest Risk'}
          value={isHi ? 'मध्यम' : 'Moderate'}
          subValue={isHi ? 'हवा में 84% आर्द्रता' : 'High Humidity (84%)'}
          badgeText={isHi ? 'निगरानी रखें' : 'Scout Leaves'}
          badgeType="coral"
          onClick={() => onNavigate('health')}
        />

        <StatCard
          icon={TrendingUp}
          iconColor="#2E7D52"
          label={isHi ? 'पिथौरागढ़ मंडी भाव' : 'Pithoragarh Mandi'}
          value="₹2,350"
          subValue={isHi ? '+4.2% इस सप्ताह' : '+4.2% this week'}
          badgeText={isHi ? 'बढ़त' : 'Bullish'}
          badgeType="emerald"
          onClick={() => onNavigate('market')}
        />
      </div>

      {/* Hero Advisory Card & Tasks Checklist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Today's Actionable Farm Advisory */}
        <div className="lg:col-span-7 space-y-6">
          <AdvisoryCard
            advisory={advisory}
            language={language}
            voiceEnabled={voiceEnabled}
          />

          {/* Quick Shortcuts to Core Features */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm">
            <h3 className="text-base font-extrabold text-[#12372A] mb-4">
              {isHi ? 'त्वरित कृषि सेवाएं' : 'Quick Farm Services'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => onNavigate('planner')}
                className="p-3.5 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] border border-[#E8E6DC] text-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform">
                  🌱
                </div>
                <div className="text-xs font-bold text-[#12372A]">{isHi ? 'फसल योजना' : 'Crop Planner'}</div>
                <div className="text-[10px] text-[#68756D]">{isHi ? 'सटीक सिफारिश' : 'Suitability Score'}</div>
              </button>

              <button
                onClick={() => onNavigate('health')}
                className="p-3.5 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] border border-[#E8E6DC] text-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform">
                  🍃
                </div>
                <div className="text-xs font-bold text-[#12372A]">{isHi ? 'रोग पहचान' : 'Crop Health'}</div>
                <div className="text-[10px] text-[#68756D]">{isHi ? 'एआई जांच' : 'AI Screening'}</div>
              </button>

              <button
                onClick={() => onNavigate('weather')}
                className="p-3.5 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] border border-[#E8E6DC] text-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform">
                  🌦️
                </div>
                <div className="text-xs font-bold text-[#12372A]">{isHi ? 'मौसम निर्णय' : 'Weather'}</div>
                <div className="text-[10px] text-[#68756D]">{isHi ? '3-दिवसीय सलाह' : '3-Day Action'}</div>
              </button>

              <button
                onClick={() => onNavigate('market')}
                className="p-3.5 rounded-2xl bg-[#F7F5ED] hover:bg-[#E8F5E9] border border-[#E8E6DC] text-center cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform">
                  💰
                </div>
                <div className="text-xs font-bold text-[#12372A]">{isHi ? 'मंडी भाव' : 'Mandi Rates'}</div>
                <div className="text-[10px] text-[#68756D]">{isHi ? 'बिक्री रुझान' : 'Price Trends'}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Farm Task Checklist & Crop Journey */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Weekly Task Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EDE1]">
              <div>
                <h3 className="text-base font-extrabold text-[#12372A]">
                  {isHi ? 'इस सप्ताह के प्रमुख कार्य' : 'Priority Farm Tasks'}
                </h3>
                <p className="text-xs text-[#68756D]">
                  {isHi ? 'मौसम व फसल चरण के आधार पर स्वचालित कार्यसूची' : 'Auto-generated based on weather alert'}
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D52]">
                {tasks.filter(t => t.completed).length} / {tasks.length}
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    task.completed 
                      ? 'bg-[#F7F5ED] border-[#E8E6DC] opacity-60' 
                      : (task.status === 'urgent' ? 'bg-[#FFF5F5] border-[#FFCDD2]' : 'bg-[#FAFAF7] border-[#E8E6DC] hover:bg-[#F2EFE5]')
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-[#2E7D52]" />
                    ) : (
                      <Circle className={`w-5 h-5 ${task.status === 'urgent' ? 'text-[#D9534F]' : 'text-[#68756D]'}`} />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className={`font-bold ${task.completed ? 'line-through text-[#68756D]' : 'text-[#12372A]'}`}>
                      {task.task[language] || task.task.en}
                    </p>
                    {task.status === 'urgent' && !task.completed && (
                      <span className="inline-block mt-1 text-[10px] font-extrabold uppercase text-[#D9534F]">
                        {isHi ? '⚠️ बारिश से पहले आवश्यक' : '⚠️ Urgent before rainfall'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crop Stage Progress Tracker */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E6DC] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE1]">
              <div className="flex items-center gap-2">
                <span className="text-xl">{farmer.currentCrop?.icon || '🌽'}</span>
                <div>
                  <h4 className="text-sm font-extrabold text-[#12372A]">
                    {isHi ? `${farmer.currentCrop?.hindiName || 'मक्का'} विकास चक्र` : `${farmer.currentCrop?.name || 'Maize'} Growth Journey`}
                  </h4>
                  <p className="text-[11px] text-[#68756D]">
                    {isHi ? 'दिन 42 / 110 (वानस्पतिक अवस्था)' : 'Day 42 of 110 (Vegetative Stage)'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-[#2E7D52] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                42%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#F0EDE1] h-2.5 rounded-full overflow-hidden my-4">
              <div className="bg-[#2E7D52] h-full rounded-full w-[42%]" />
            </div>

            {/* Stage Steps */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
              <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#2E7D52] font-bold">
                ✓ {isHi ? 'बुवाई (संपन्न)' : 'Sowing (Done)'}
              </div>
              <div className="p-2 rounded-xl bg-[#12372A] text-white font-black shadow-xs">
                ● {isHi ? 'वानस्पतिक (सक्रिय)' : 'Vegetative (Active)'}
              </div>
              <div className="p-2 rounded-xl bg-[#F7F5ED] text-[#68756D] font-medium border border-[#E8E6DC]">
                ○ {isHi ? 'फूल / दाना' : 'Silking / Grain'}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
