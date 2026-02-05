
import React from 'react';
import { AGENT_DETAILS } from '../constants';

interface AgentHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  onProfileClick?: () => void;
  isProfileActive?: boolean;
  centerTitle?: string | null;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({
  onBack,
  showBack = false,
  onProfileClick,
  isProfileActive = false,
  centerTitle = null
}) => {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(AGENT_DETAILS.name)}&background=0055A4&color=fff&size=64`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between min-h-[70px]">
      <div className="flex items-center gap-3 flex-1">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl mr-1 transition-all active:scale-90 flex-shrink-0"
            aria-label="Go back"
          >
            <i className="fa-solid fa-arrow-left text-[#2563EB]"></i>
          </button>
        )}

        {/* If centerTitle is present, we might show a compact avatar or nothing here. 
            For now, let's keep the clickable face for profile access but hide text if space is needed. */}
        <button
          onClick={onProfileClick}
          className={`relative group transition-all active:scale-95 flex items-center p-1 rounded-2xl ${isProfileActive ? 'bg-blue-50 ring-2 ring-blue-600/20' : ''}`}
        >
          <div className="relative w-11 h-11 bg-white rounded-xl border-2 border-blue-600/10 overflow-hidden group-hover:border-blue-600 transition-all shadow-sm flex-shrink-0">
            <img
              src={AGENT_DETAILS.avatar}
              alt={AGENT_DETAILS.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackAvatar;
              }}
            />
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 text-[8px] flex items-center justify-center border-2 border-white shadow-sm">
              <i className="fa-solid fa-check"></i>
            </div>
          </div>

          {/* Show Title if present, else show name block */}
          {centerTitle ? (
            <div className="ml-3 text-left">
              <h2 className="text-sm md:text-lg font-black text-[#2563EB] leading-tight drop-shadow-sm">
                {centerTitle}
              </h2>
            </div>
          ) : (
            <div className="ml-3 hidden sm:block text-left">
              <h1 className={`text-sm font-black leading-tight ${isProfileActive ? 'text-blue-600' : 'text-gray-900'}`}>
                {AGENT_DETAILS.name}
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Advisor • {AGENT_DETAILS.agencyCode}</p>
            </div>
          )}
        </button>
      </div>

      <div className="flex-shrink-0 flex items-center justify-end flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-white text-lg md:text-xl"></i>
          </div>
          <span className="font-black text-gray-900 text-sm md:text-lg tracking-tighter">Top Advisor</span>
        </div>
      </div>
    </header>
  );
};

export default AgentHeader;
