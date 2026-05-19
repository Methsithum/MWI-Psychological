import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, icon = '📚', progress, students, subtitle }) => {
  return (
    <div className="rounded-2xl border border-[#0B1F3A]/8 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#0B1F3A] text-white text-xl">{icon}</div>
            <div>
              <h3 className="font-bold text-[#0B1F3A]">{title}</h3>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          {description && <p className="mt-4 text-sm text-gray-600 leading-6">{description}</p>}
        </div>
      </div>

      {(progress !== undefined || students !== undefined) && (
        <div className="mt-4 space-y-3">
          {progress !== undefined && (
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          {students !== undefined && <p className="text-sm text-gray-600">{students} students enrolled</p>}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:gap-3 transition-all">
          View course <span>→</span>
        </Link>
        <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#0B1F3A]">Live</span>
      </div>
    </div>
  );
};

export default CourseCard;
