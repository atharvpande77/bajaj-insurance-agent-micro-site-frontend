
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AgentHeader from './components/AgentHeader';
import LandingPage from './components/LandingPage';
import ChatbotPage from './components/ChatbotPage';
import ProfilePage from './components/ProfilePage';
import { PriorityType } from './types';

type Route = '/' | '/chat' | '/profile' | '/chat/retirement' | '/chat/child-edu' | '/chat/savings' | '/chat/term-insurance' | '/chat/tax-planning';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(
    (window.location.pathname as Route) || '/'
  );

  // Sync state with URL on mount and popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = (window.location.pathname as Route) || '/';
      setCurrentRoute(path);
    };
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Extract priority from URL path
  const selectedPriority = useMemo(() => {
    const pathMap: Record<string, PriorityType> = {
      '/chat/retirement': 'Retirement Planning',
      '/chat/child-edu': 'Child Education Planning',
      '/chat/savings': 'Savings',
      '/chat/term-insurance': 'Human Life Value',
      '/chat/tax-planning': 'Tax Planning'
    };
    return pathMap[currentRoute] || null;
  }, [currentRoute]);

  const navigateTo = useCallback((route: Route) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', route);
  }, []);

  const handleSelectPriority = (priority: PriorityType) => {
    const routeMap: Record<string, Route> = {
      'Retirement Planning': '/chat/retirement',
      'Child Education Planning': '/chat/child-edu',
      'Savings': '/chat/savings',
      'Human Life Value': '/chat/term-insurance',
      'Tax Planning': '/chat/tax-planning'
    };
    const route = routeMap[priority || ''] || '/';
    navigateTo(route);
  };

  const handleBack = () => {
    navigateTo('/');
  };

  const handleProfileClick = () => {
    navigateTo('/profile');
  };

  const handleCloseProfile = () => {
    // Always return to landing page when closing profile
    navigateTo('/');
  };

  // Determine which component to show based on route
  const isChatRoute = currentRoute.startsWith('/chat/');

  // Simplified noun mapping for the header (duplicated from ChatbotPage for now)
  const headerGoalMap: Record<string, string> = {
    'Retirement Planning': 'Retirement',
    'Child Education Planning': 'Child\'s Education',
    'Savings': 'Savings',
    'Human Life Value': 'Family\'s Future',
    'Tax Planning': 'Taxes'
  };

  const headerGoal = headerGoalMap[selectedPriority || ''] || 'Financial Goals';
  const headerTitle = isChatRoute ? `I am Rahul Verma, Let's Plan your ${headerGoal}` : null;

  const renderContent = () => {
    if (isChatRoute) {
      return <ChatbotPage priority={selectedPriority} />;
    }
    if (currentRoute === '/profile') {
      return <ProfilePage onClose={handleCloseProfile} />;
    }
    return <LandingPage onSelectPriority={handleSelectPriority} />;
  };

  return (
    <div className={`${isChatRoute ? 'h-screen overflow-hidden' : 'min-h-screen'} flex flex-col text-gray-900 bg-gray-50 relative`}>
      <AgentHeader
        showBack={currentRoute !== '/' && currentRoute !== '/profile'}
        onBack={handleBack}
        onProfileClick={handleProfileClick}
        isProfileActive={currentRoute === '/profile'}
        centerTitle={headerTitle}
      />

      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>

      {!isChatRoute && (
        <footer className="bg-gray-800 text-gray-400 py-6 px-6 text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-widest mb-4">
            Insurance is the subject matter of solicitation.
          </p>
          <div className="flex justify-center gap-4 text-sm mb-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Contact Us</span>
          </div>
          <p className="text-[10px]">
            © 2024 Bajaj Allianz General Insurance Co. Ltd. | IRDAI Reg. No. 113
          </p>
        </footer>
      )}
    </div>
  );
};

export default App;
