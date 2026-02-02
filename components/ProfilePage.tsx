
import React from 'react';
import { AGENT_DETAILS } from '../constants';

interface ProfilePageProps {
  onClose?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onClose }) => {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(AGENT_DETAILS.name)}&background=0055A4&color=fff&size=256`;

  return (
    <div className="bg-white pb-12">
      <div className="mx-auto">
        {/* Profile Hero Section */}
        <div className="bg-gradient-to-br from-[#0055A4] to-[#003366] p-8 md:p-16 flex flex-col items-center text-center text-white relative overflow-hidden shadow-2xl">
          {/* Back Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all active:scale-90"
            title="Go back"
          >
            <i className="fa-solid fa-chevron-left text-lg md:text-xl"></i>
          </button>

          {/* Decorative background icon */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <i className="fa-solid fa-shield-halved text-[20rem]"></i>
          </div>
          
          <div className="relative z-10 mb-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] border-8 border-white/20 shadow-2xl overflow-hidden bg-white">
              <img 
                src={AGENT_DETAILS.largeAvatar} 
                alt={AGENT_DETAILS.name} 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackAvatar;
                }}
              />
            </div>
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-green-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-4 border-[#0055A4] shadow-2xl">
              <i className="fa-solid fa-check text-lg md:text-xl"></i>
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">{AGENT_DETAILS.name}</h2>
            <p className="text-blue-100 text-sm md:text-base font-bold opacity-90 uppercase tracking-[0.2em] mb-6">{AGENT_DETAILS.designation}</p>
            
            <div className="inline-flex flex-wrap justify-center gap-3">
              <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs font-black tracking-wider uppercase">
                Agency ID: {AGENT_DETAILS.agencyCode}
              </div>
              <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs font-black tracking-wider uppercase">
                {AGENT_DETAILS.experience} Experience
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {AGENT_DETAILS.stats.map((stat, idx) => (
              <div key={idx} className="group flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0055A4] mb-4 group-hover:bg-[#0055A4] group-hover:text-white transition-all">
                   <i className={`fa-solid ${idx === 0 ? 'fa-file-invoice' : idx === 1 ? 'fa-indian-rupee-sign' : 'fa-hand-holding-heart'} text-xl`}></i>
                </div>
                <p className="text-2xl md:text-3xl font-black text-[#0055A4] leading-none mb-2">{stat.value}</p>
                <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Accomplishments */}
        <div className="max-w-3xl mx-auto px-6 mt-16">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-1 w-12 bg-[#0055A4] rounded-full"></div>
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Professional Recognitions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENT_DETAILS.achievements.map((item, idx) => (
              <div key={idx} className="flex items-start gap-5 p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-white transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0055A4] group-hover:text-white transition-all duration-300">
                  <i className={`fa-solid ${item.icon} text-2xl`}></i>
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto px-6 mt-16 mb-8">
          <div className="bg-[#0055A4] rounded-[2.5rem] p-10 md:p-14 text-white text-center shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black mb-4">Secure your future today</h3>
              <p className="text-blue-100 text-sm md:text-base mb-8 max-w-lg mx-auto font-medium">Connect with {AGENT_DETAILS.name} for a personalized financial audit and policy review.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#0055A4] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all">
                   Book a Consultation
                </button>
                <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider border border-white/10 hover:bg-blue-700 active:scale-95 transition-all">
                   WhatsApp Rahul
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
