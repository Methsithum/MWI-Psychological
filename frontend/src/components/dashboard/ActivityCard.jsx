import React from 'react';

const ActivityCard = ({ title, message, icon = '🔔', timestamp }) => {
  const formatTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="rounded-2xl border border-[#0B1F3A]/8 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D4AF37]/15 text-xl">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#0B1F3A]">{title}</p>
          <p className="mt-1 text-sm text-gray-600 leading-6">{message}</p>
          {timestamp && <p className="mt-2 text-xs text-gray-400">{formatTime(timestamp)}</p>}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
