
import React from 'react';
import { PRIORITY_OPTIONS, AGENT_DETAILS } from '../constants';
import { PriorityType } from '../types';

interface LandingPageProps {
  onSelectPriority: (priority: PriorityType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectPriority }) => {
  return (
    <div className="animate-fadeIn">
      {/* Personalized Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-[#0055A4] flex items-center">
        {/* Background Real Person Photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200&h=800" 
            alt="Rahul Verma Advisor" 
            className="w-full h-full object-cover object-top opacity-60"
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0055A4] via-[#0055A4]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0055A4]/40 to-transparent"></div>
        </div>

        {/* Hero Content Container */}
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full relative z-10">
          <div className="flex-1 text-white text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-white/20">
              Personalized Financial Planning
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-xl">
              Hi, I am {AGENT_DETAILS.name.split(' ')[0]}.
            </h2>
            <p className="text-xl md:text-2xl text-blue-50 font-medium max-w-xl mb-10 leading-relaxed opacity-90">
              I will help you plan your financial goals using the power of <span className="font-black text-white underline decoration-white/40">AI</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById('priority-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#0055A4] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-blue-50 transition-all active:scale-95 shadow-2xl shadow-black/20"
              >
                Start Planning
              </button>
              <div className="flex items-center gap-3 justify-center bg-black/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+40}`} className="w-8 h-8 rounded-full border-2 border-[#0055A4]" alt="User" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">+2.5k Happy Clients</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block flex-1"></div>
        </div>
      </section>

      {/* Priority Section */}
      <main id="priority-section" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What is your priority today?
            </h3>
            <p className="text-gray-500 font-medium text-lg">Select a goal to explore tailored AI-generated insights for your future.</p>
          </div>
          
          {/* Tax Planning Highlight */}
          <div className="flex justify-center mb-12">
             <button
                onClick={() => onSelectPriority('Tax Planning')}
                className="relative overflow-hidden w-full max-w-2xl bg-gradient-to-r from-blue-900 to-[#0055A4] text-white p-8 rounded-[2rem] shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-300 group text-center border-4 border-transparent hover:border-blue-200/30"
              >
                <div className="absolute -right-10 -bottom-10 opacity-10">
                   <i className="fa-solid fa-file-invoice-dollar text-9xl transform rotate-12"></i>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors shrink-0">
                       <i className="fa-solid fa-file-invoice-dollar text-3xl"></i>
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl font-black mb-1">Detailed Tax Planning</h4>
                         <p className="text-blue-100 font-medium">Maximize savings with smart tax strategies. Essential for every portfolio.</p>
                    </div>
                    <div className="hidden md:block bg-white text-[#0055A4] px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider group-hover:scale-105 transition-transform shrink-0">
                        Start Now <i className="fa-solid fa-arrow-right ml-2"></i>
                    </div>
                </div>
              </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRIORITY_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelectPriority(option.label)}
                className="flex flex-col items-center justify-center p-10 bg-white rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all active:scale-95 group text-center"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#0055A4] group-hover:text-white transition-all duration-300">
                   <div className="transform group-hover:scale-110 transition-transform">
                     {option.icon}
                   </div>
                </div>
                <span className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                  {option.label}
                </span>
                <p className="text-sm text-gray-500 mt-4 leading-relaxed font-medium">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-4 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-[#0055A4] group-hover:bg-[#0055A4] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-users text-2xl"></i>
            </div>
            <h4 className="text-lg font-black text-gray-900 mb-2">2,500+ Families</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">Dedicated to securing financial futures for over a decade.</p>
          </div>
          <div className="p-4 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-[#0055A4] group-hover:bg-[#0055A4] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-check-to-slot text-2xl"></i>
            </div>
            <h4 className="text-lg font-black text-gray-900 mb-2">99.2% Settlement</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">A legacy of trust with an industry-leading claim settlement ratio.</p>
          </div>
          <div className="p-4 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 text-[#0055A4] group-hover:bg-[#0055A4] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-bolt text-2xl"></i>
            </div>
            <h4 className="text-lg font-black text-gray-900 mb-2">Instant AI Guidance</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">Smart, data-driven planning advice available 24/7 via Bajaj AI.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
