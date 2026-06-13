/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Coffee, Compass, Anchor, Flame, Star, Check } from 'lucide-react';
import { Hotel } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentHotel: Hotel | null;
  onSelectHotel: (id: string) => void;
  theme: 'dark' | 'light';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isQuickAction?: boolean;
}

export default function AIAssistantDrawer({ isOpen, onClose, currentHotel, onSelectHotel, theme }: AIAssistantDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load welcome recommendations on startup
  useEffect(() => {
    if (messages.length === 0) {
      const hotelContextText = currentHotel 
        ? ` I see you're currently exploring the gorgeous cliffs at ${currentHotel.name} in ${currentHotel.city}! Let me know if you need assistance select rooms, finding hidden beaches, or booking local activities.`
        : " I am the Solas luxury curator assistant. I am pre-trained with localized knowledge of Italy's coast, Tokyo's Otemachi temples, New Zealand star gazing, and Maldives submarine safaris. How may I design your upcoming retreat?";
      
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: `Warmest greetings from Solas Circle.${hotelContextText}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [currentHotel, messages.length]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Quick prompt suggestions
  const suggestedQueries = [
    { text: "What are Amalfi Coast yacht prices?", type: "amalfi" },
    { text: "Best Tokyo sake cellars near hotel?", type: "tokyo" },
    { text: "Help me pack for Queenstown alpine skiing", type: "ski" },
    { text: "Recommend a Maldives sunset suite", type: "maldives" }
  ];

  // Elite Chat response directory
  const getSimulatedResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('amalfi') || q.includes('coast') || q.includes('grand serenade') || q.includes('italy')) {
      return "Positano's Yacht Direct Desk at Grand Serenade arranges private 42ft wood-hulled Riva runabouts from $1,200/day. For dining, we recommend reserving table 4 at Giusso Cliffside Bistro at sunset (3 weeks in advance). I recommend booking our Mediterranean Terrace Suite which includes free VIP landing shuttles.";
    }
    if (q.includes('tokyo') || q.includes('luminary') || q.includes('japan') || q.includes('sake')) {
      return "The Luminary Heights Sake tasting room carries exclusive unfiltered Junmai Daiginjo vintages. Additionally, the imperial garden walking paths on Chiyoda are spectacular. If staying in our Otemachi Executive Suite, you gain priority access to our private Hinoki wood baths.";
    }
    if (q.includes('pack') || q.includes('queenstown') || q.includes('obsidian') || q.includes('ski') || q.includes('weather')) {
      return "Queenstown alpine weather in June averages 4°C to 11°C. I strongly advise packing natural merino base layers, windproof shell parkas, and high-traction hiking boots. Chalet Obsidian features a boots-climate dryer so your ski gear stays toasted and ready each morning.";
    }
    if (q.includes('maldives') || q.includes('sands') || q.includes('beach') || q.includes('villa')) {
      return "Horizon Sands beachfront villas are nested directly on South Ari Atoll's marine biological sanctuary. A perfect itinerary incorporates our Starlight Lagoon cinema of classic films or ocean-reef turtle cruises. Our Overwater Lagoon Sunset Villa includes direct ocean hammock access.";
    }
    return "That sounds like an incredible travel inspiration! Standard Solas reservations automatically carry zero brokerage fees, complimentary room-upgrade rights (subject to availability), and personalized morning chef breakfast selections. Is there a specific hideaway destination or custom request I can secure for you today?";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setInputValue('');

    // Simulated streaming response timer
    setTimeout(() => {
      const responseText = getSimulatedResponse(text);
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop Blur overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity" 
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
            <motion.div 
              className="pointer-events-auto w-screen max-w-md"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              <div className="flex h-full flex-col bg-[#0C0C0C] border-l border-neutral-900 shadow-2xl overflow-hidden relative">
                
                {/* Decorative glowing gradient vectors */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Drawer top banner */}
                <div className="px-5 py-5.5 bg-[#0A0A0A] border-b border-neutral-900 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gold-950/40 border border-gold-500/30 flex items-center justify-center text-gold-500 shadow-inner">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm.5">SOLAS TRAVEL ORACLE</h4>
                      <p className="text-[9px] font-sans text-gold-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Live curator online
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main scroll message workspace */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-5 space-y-5.5 relative z-10 scrollbar-thin scrollbar-thumb-neutral-800"
                >
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1 text-[9px] text-neutral-500 font-mono mb-1">
                        <span>{msg.sender === 'user' ? 'Guest Explorer' : 'AI Curator'}</span>
                        <span>&bull;</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] font-sans text-left shadow-md ${
                          msg.sender === 'user'
                            ? 'bg-gold-500 text-neutral-950 font-semibold rounded-tr-none'
                            : 'bg-neutral-900 border border-neutral-850/80 text-neutral-300 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex flex-col items-start font-sans">
                      <div className="text-[9px] text-neutral-500 font-mono mb-1">AI Curator is thinking...</div>
                      <div className="bg-neutral-900 border border-neutral-850 p-4 rounded-2xl rounded-tl-none flex space-x-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggested prompt shortcuts */}
                {messages.length < 3 && !isTyping && (
                  <div className="px-5 py-3 border-t border-neutral-900/60 bg-black/20 relative z-10 text-left">
                    <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 font-sans">Suggested travel consults</span>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQueries.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(item.text)}
                          className="text-[10.5px] font-medium text-gold-400 bg-gold-950/20 hover:bg-gold-500/10 border border-gold-500/15 rounded-md px-3 py-1.5 text-left transition-colors cursor-pointer select-none"
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message input controls */}
                <div className="p-4 bg-[#0A0A0A] border-t border-neutral-900 relative z-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask our destination oracle..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-gold-500/80 transition-colors"
                      id="ai-assistant-input"
                    />
                    
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                        inputValue.trim() && !isTyping
                          ? 'bg-gold-500 hover:bg-gold-600 text-neutral-950'
                          : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      }`}
                      id="ai-send-btn"
                    >
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </form>
                  <p className="text-[9px] text-[#444444] text-center mt-2.5 font-sans">
                    Vetted through verified Solas direct portfolio standards &bull; June 2026 Updated
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
