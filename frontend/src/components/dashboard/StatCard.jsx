import React from 'react';

const StatCard = ({ icon, label, value, subtext, tone = 'default' }) => {
  const toneClasses = {
    default: 'border-[#D4AF37]/25',
    success: 'border-emerald-400/40',
    danger: 'border-rose-400/40',
    info: 'border-sky-400/40',
  };

  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm ${toneClasses[tone] || toneClasses.default}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <div className="mt-2 text-3xl font-bold text-[#0B1F3A]">{value}</div>
          {subtext && <p className="mt-2 text-xs text-gray-500">{subtext}</p>}
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D4AF37]/15 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
