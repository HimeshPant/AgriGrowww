import React from 'react';

export function StatCard({
  icon: Icon,
  emoji,
  label,
  value,
  subtext,
  badgeText,
  badgeColor = "emerald", // emerald, amber, coral, sky
  onClick
}) {
  const badgeClasses = {
    emerald: "bg-[#E8F5E9] text-[#2E7D52] border-[#2E7D52]/20",
    amber: "bg-[#FFF8E1] text-[#D97706] border-[#F4B942]/30",
    coral: "bg-[#FFEBEE] text-[#D9534F] border-[#D9534F]/30",
    sky: "bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]/20"
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl p-5 border border-[#E8E6DC] shadow-sm hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:border-[#2E7D52]/40' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-2xl bg-[#F7F5ED] border border-[#E8E6DC] flex items-center justify-center text-xl flex-shrink-0">
          {Icon ? <Icon className="w-5 h-5 text-[#2E7D52]" /> : emoji}
        </div>
        {badgeText && (
          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClasses[badgeColor] || badgeClasses.emerald}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-3">
        <span className="text-xs font-bold text-[#68756D] block uppercase tracking-wider">
          {label}
        </span>
        <div className="text-xl sm:text-2xl font-black text-[#12372A] mt-0.5">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-[#68756D] mt-1 font-medium line-clamp-1">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
