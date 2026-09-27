import React from 'react';
import { LayoutDashboard, Sprout, ShieldAlert, CloudSun, TrendingUp, Bot } from 'lucide-react';

export function BottomNav({ currentTab, setCurrentTab, language }) {
  const items = [
    { id: 'dashboard', label: { en: 'Home', hi: 'मुख्य' }, icon: LayoutDashboard },
    { id: 'planner', label: { en: 'Crop', hi: 'फसल' }, icon: Sprout },
    { id: 'health', label: { en: 'Health', hi: 'सुरक्षा' }, icon: ShieldAlert },
    { id: 'weather', label: { en: 'Weather', hi: 'मौसम' }, icon: CloudSun },
    { id: 'market', label: { en: 'Market', hi: 'मंडी' }, icon: TrendingUp },
    { id: 'assistant', label: { en: 'Ask AI', hi: 'सहायक' }, icon: Bot }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8E6DC] z-40 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition ${
                isActive
                  ? 'text-[#2E7D52] font-black'
                  : 'text-[#68756D] hover:text-[#12372A]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 font-bold">
                {item.label[language] || item.label.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
