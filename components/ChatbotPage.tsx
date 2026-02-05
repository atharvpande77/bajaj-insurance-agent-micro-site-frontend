
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AGENT_DETAILS } from '../constants';
import { PriorityType, Message } from '../types';

interface ChatbotPageProps {
    priority: PriorityType;
}

/**
 * Mapping UI Labels from PRIORITY_OPTIONS to Backend-specific Goal Keys
 */
const GOAL_KEY_MAP: Record<string, string> = {
    'Retirement Planning': 'retirement',
    'Child Education Planning': 'child_education',
    'Savings': 'savings',
    'Human Life Value': 'term_insurance',
    'Tax Planning': 'tax'
};

/**
 * Mapping URL paths to Priority Labels
 */
const URL_PATH_TO_PRIORITY: Record<string, PriorityType> = {
    '/chat/retirement': 'Retirement Planning',
    '/chat/child-edu': 'Child Education Planning',
    '/chat/savings': 'Savings',
    '/chat/term-insurance': 'Human Life Value',
    '/chat/tax-planning': 'Tax Planning'
};

export default function ChatbotPage({ priority }: ChatbotPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isGoalSent, setIsGoalSent] = useState(false);
    const [sessionId, setSessionId] = useState('');

    const chatEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    // Track if usage just triggered a send to force scroll
    const userJustSentRef = useRef(false);

    // Extract priority from URL path (takes precedence over prop)
    const effectivePriority = useMemo(() => {
        const urlPriority = URL_PATH_TO_PRIORITY[window.location.pathname as keyof typeof URL_PATH_TO_PRIORITY];
        return urlPriority || priority;
    }, [priority]);

    /**
     * Generates a new session and resets chat state
     */
    const startNewChat = (isInitialLoad: boolean = false) => {
        // 1. Close current stream if active
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }

        // 2. Generate/Retrieve unique session ID
        let sId = isInitialLoad ? localStorage.getItem('chat_session_id') : null;
        if (!sId) {
            sId = (window.crypto && typeof window.crypto.randomUUID === 'function')
                ? window.crypto.randomUUID()
                : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('chat_session_id', sId);
        }
        setSessionId(sId);

        // 3. Reset internal flags
        setIsGoalSent(false);
        setIsTyping(false);
        setIsListening(false);
        setInputText('');

        // 4. Set Initial Welcome Message based on priority
        const welcomeMessages: Record<string, string> = {
            'Retirement Planning': `👋 Hello!
I am the digital assistant for Mr. Varad Joshi, a renowned financial planner.
I will help you plan your retirement in a simple and structured way.

Please choose your preferred language:
English | Hindi | Marathi`,

            'Child Education Planning': `👋 Hello!
I am the digital assistant for Mr. Varad Joshi, a renowned financial planner.
I will help you plan your child's education in a simple and structured way.

Please choose your preferred language:
English | Hindi | Marathi`,

            'Human Life Value': `👋 Hello!
I am the digital assistant for Mr. Varad Joshi, a renowned financial planner.
I will help you plan your term insurance in a simple and structured way.

Please choose your preferred language:
English | Hindi | Marathi`,

            'Tax Planning': `👋 Hello!
I am the digital assistant for Mr. Varad Joshi, a renowned financial planner.
I will help you plan your taxes in a simple and structured way.

Please choose your preferred language:
English | Hindi | Marathi`,

            'Savings': `👋 Hello!
I am the digital assistant for Mr. Varad Joshi, a renowned financial planner.
I will help you plan your savings in a simple and structured way.

Please choose your preferred language:
English | Hindi | Marathi`
        };

        const initialMsg: Message = {
            id: `welcome-${Date.now()}`,
            text: welcomeMessages[effectivePriority || ''] || "Hi! I'm your Top Advisor AI assistant. How can I help you with your insurance goals today?",
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages([initialMsg]);
    };

    // Session Initialization
    useEffect(() => {
        startNewChat(true);

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            localStorage.removeItem('chat_session_id');
        };
    }, [effectivePriority]);

    // "Smart" Auto-scroll logic
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // Force scroll if user just sent a message
            if (userJustSentRef.current) {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                userJustSentRef.current = false;
                return;
            }

            const { scrollHeight, scrollTop, clientHeight } = container;
            // If user is within 150px of the bottom, we consider them "at the bottom"
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

            if (isNearBottom) {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim() || isTyping) return;

        // Flag that user sent a message to force scroll
        userJustSentRef.current = true;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            text,
            sender: 'user',
            timestamp: new Date()
        };

        const aiResponseId = `ai-${Date.now()}`;
        const initialAiMsg: Message = {
            id: aiResponseId,
            text: '',
            sender: 'ai',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg, initialAiMsg]);
        setInputText('');
        setIsTyping(true);

        const baseUrl = 'https://www.citihubkiosk.com/pressgenai/api/insurance/chat/stream';
        const params = new URLSearchParams();
        params.append('session_id', sessionId);
        params.append('message', text);

        if (!isGoalSent && effectivePriority) {
            const goalKey = GOAL_KEY_MAP[effectivePriority];
            if (goalKey) {
                params.append('goal', goalKey);
                setIsGoalSent(true);
            }
        }

        const streamUrl = `${baseUrl}?${params.toString()}`;

        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        const es = new EventSource(streamUrl);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            const chunk = event.data;
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.id === aiResponseId) {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, text: lastMsg.text + chunk }
                    ];
                }
                return prev;
            });
        };

        es.addEventListener('done', () => {
            es.close();
            setIsTyping(false);
            eventSourceRef.current = null;
        });

        es.onerror = (err) => {
            console.error('SSE connection error:', err);
            es.close();
            setIsTyping(false);
            eventSourceRef.current = null;

            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.id === aiResponseId && lastMsg.text === '') {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, text: 'I am having trouble connecting to the network. Please check your connection and try again.' }
                    ];
                }
                return prev;
            });
        };
    };

    const handleMockVoice = () => {
        if (isTyping) return;
        setIsListening(true);
        setTimeout(() => {
            setIsListening(false);
            const mockQuery = `Tell me more about the best plan for ${effectivePriority || 'my goals'}.`;
            setInputText(mockQuery);
            setTimeout(() => {
                handleSend(mockQuery);
            }, 500);
        }, 2000);
    };

    // Map priority to goal text
    // Map priority to simplified noun for the header
    const headerGoalMap: Record<string, string> = {
        'Retirement Planning': 'Retirement',
        'Child Education Planning': 'Child\'s Education',
        'Savings': 'Savings',
        'Human Life Value': 'Family\'s Future',
        'Tax Planning': 'Taxes'
    };

    const headerGoal = headerGoalMap[effectivePriority || ''] || 'Financial Goals';

    // Helper to render text with bold formatting
    const renderMessageText = (text: string) => {
        if (!text) return null;

        // Split by double asterisks
        const parts = text.split('**');

        return parts.map((part, index) => {
            // Odd indices are the ones that were inside ** **
            if (index % 2 === 1) {
                return <strong key={index} className="font-semibold text-gray-900">{part}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollTop = useRef(0);

    // Smart Header Layout Logic
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const threshold = 100; // Only toggle after scrolling a bit

            if (scrollTop > lastScrollTop.current && scrollTop > threshold) {
                // Scrolling Down
                setIsHeaderVisible(false);
            } else {
                // Scrolling Up
                setIsHeaderVisible(true);
            }
            lastScrollTop.current = scrollTop;
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 relative overflow-hidden">
            {/* Branded Blue Header - Collapsible */}
            <div
                className={`sticky top-0 z-20 bg-[#2563EB] border-b border-[#1E40AF] py-4 px-4 flex items-center justify-between shadow-md transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                        <i className="fa-solid fa-robot text-white text-lg"></i>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">
                            {effectivePriority || 'Financial Assistant'}
                        </h2>
                        <span className="text-[10px] text-blue-200 font-medium tracking-wide uppercase">AI Goal Assistant</span>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <button
                        onClick={() => startNewChat()}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:rotate-180 duration-500"
                        title="Start New Chat"
                    >
                        <i className="fa-solid fa-rotate-right text-lg"></i>
                    </button>
                </div>
            </div>

            {/* Message List */}
            <div
                ref={scrollContainerRef}
                className="flex-1 px-4 py-8 space-y-8 scroll-smooth overflow-y-auto"
            >
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* AI Avatar */}
                            {msg.sender === 'ai' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-white shadow-sm mt-1 ring-2 ring-white">
                                    <i className="fa-solid fa-robot text-xs"></i>
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm border ${msg.sender === 'user'
                                    ? 'bg-[#2563EB] text-white rounded-br-none border-transparent'
                                    : 'bg-white text-gray-800 rounded-bl-none border-gray-100'
                                    }`}
                            >
                                <div className={`text-[15px] leading-7 whitespace-pre-wrap ${msg.sender === 'user' ? 'text-white/95' : 'text-gray-800'}`}>
                                    {renderMessageText(msg.text) || (msg.sender === 'ai' && isTyping && messages[messages.length - 1].id === msg.id ? '...' : '')}
                                </div>
                                <p className={`text-[10px] mt-2 opacity-60 font-medium ${msg.sender === 'user' ? 'text-right text-blue-100' : 'text-left text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && messages[messages.length - 1]?.text === '' && (
                        <div className="flex gap-4 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E40AF] flex items-center justify-center text-white shadow-sm mt-1 ring-2 ring-white">
                                <i className="fa-solid fa-robot text-xs"></i>
                            </div>
                            <div className="px-5 py-4 bg-white border border-gray-100 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5 h-[52px]">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} className="h-4" />
                </div>
            </div>

            {/* Floating Input Area */}
            <div className="p-4 pb-6 bg-gradient-to-t from-white via-white to-transparent">
                <div className="max-w-3xl mx-auto relative">
                    {isListening && (
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce z-10">
                            <i className="fa-solid fa-microphone text-red-500 animate-pulse"></i>
                            <span className="text-xs font-semibold">Listening...</span>
                        </div>
                    )}

                    <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-2 pl-4 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">

                        <button
                            onClick={handleMockVoice}
                            disabled={isTyping}
                            className={`p - 2 rounded - full transition - colors flex - shrink - 0 ${isTyping ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                } `}
                            title="Voice Input"
                        >
                            <i className="fa-solid fa-microphone text-lg"></i>
                        </button>

                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                            placeholder={isTyping ? "Thinking..." : "Message Top Advisor Assistant..."}
                            disabled={isTyping}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-base py-2 px-2 disabled:cursor-not-allowed"
                            autoComplete="off"
                        />

                        <button
                            onClick={() => handleSend(inputText)}
                            disabled={!inputText.trim() || isTyping}
                            className={`w - 10 h - 10 rounded - full flex items - center justify - center transition - all flex - shrink - 0 ${inputText.trim() && !isTyping
                                ? 'bg-[#2563EB] text-white shadow-md hover:bg-blue-700 active:scale-95'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                } `}
                        >
                            {isTyping ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-arrow-up"></i>}
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-400 mt-3">
                        AI can make mistakes. Please check important info.
                    </p>
                </div>
            </div>
        </div>
    );
}
