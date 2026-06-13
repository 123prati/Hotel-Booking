/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, Compass, CreditCard, ChevronRight, Sparkles, User, HelpCircle, ArrowRight, ShieldCheck, Heart, RefreshCw } from 'lucide-react';
import { Booking, Hotel } from '../types';
import { HOTELS } from '../data';

interface DashboardViewProps {
  bookings: Booking[];
  onNavigate: (view: string, targetId?: string) => void;
  onCancelBooking: (id: string) => void;
  theme: 'dark' | 'light';
}

export default function DashboardView({ bookings, onNavigate, onCancelBooking, theme }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'perks' | 'recommendations'>('overview');

  // Interactive Recommendation state
  const [travelPersona, setTravelPersona] = useState<string>('');
  const [selectedVibe, setSelectedVibe] = useState<string>('');
  const [showMatch, setShowMatch] = useState(false);

  // Compute stats
  const stats = useMemo(() => {
    const activeCount = bookings.length;
    const totalExpenditure = bookings.reduce((acc, b) => acc + b.totalAmount, 0);
    const totalNights = bookings.reduce((acc, b) => acc + b.totalNights, 0);
    
    // Loyalty Tier calculation
    let tier = 'Maison Bronze Explorer';
    let progress = 20; // percent
    let nextTier = 'Maison Silver Elite';
    
    if (totalNights >= 12) {
      tier = 'Maison Diamond Sovereign';
      progress = 100;
      nextTier = 'Supreme Tier Reached';
    } else if (totalNights >= 6) {
      tier = 'Maison Platinum Elite';
      progress = 75;
      nextTier = 'Maison Diamond Sovereign';
    } else if (totalNights >= 2) {
      tier = 'Maison Silver Elite';
      progress = 45;
      nextTier = 'Maison Platinum Elite';
    }

    return { activeCount, totalExpenditure, totalNights, tier, progress, nextTier };
  }, [bookings]);

  // AI Matching Recommendation algorithm
  const recommendedHotel = useMemo(() => {
    if (!selectedVibe) return HOTELS[0]; // default
    if (selectedVibe === 'coastal') return HOTELS.find(h => h.id === 'grand-serenade') || HOTELS[0];
    if (selectedVibe === 'metropolitan') return HOTELS.find(h => h.id === 'luminary-heights') || HOTELS[0];
    if (selectedVibe === 'alpine') return HOTELS.find(h => h.id === 'chalet-obsidian') || HOTELS[0];
    if (selectedVibe === 'desert') return HOTELS.find(h => h.id === 'onyx-clay') || HOTELS[0];
    return HOTELS.find(h => h.id === 'horizon-sands') || HOTELS[0];
  }, [selectedVibe]);

  const matches = useMemo(() => {
    if (!showMatch) return null;
    let percent = 98;
    if (travelPersona === 'business') percent = 95;
    if (travelPersona === 'wellness') percent = 99;
    return { hotel: recommendedHotel, score: percent };
  }, [showMatch, recommendedHotel, travelPersona]);

  return (
    <div className={`flex-1 pb-24 ${theme === 'light' ? 'bg-[#FAF8F5]' : 'bg-[#0A0A0A]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Profile Card Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200/50 dark:border-neutral-900">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gold-950/20 border border-gold-500/30 flex items-center justify-center text-gold-500 shadow-inner">
              <User className="w-7 h-7" />
            </div>
            <div>
              <p className="font-serif text-2xl font-bold dark:text-white text-neutral-900">Maison Guest Profile</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gold-500/10 dark:bg-gold-950/40 text-gold-600 dark:text-gold-400 font-extrabold px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest border border-gold-500/20 uppercase">
                  {stats.tier}
                </span>
                <span className="text-neutral-400 dark:text-neutral-500 text-xs">&bull; Member since 2026</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-stretch gap-2.5">
            <button 
              onClick={() => onNavigate('hotels')}
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <span>Secure Next Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento Grid Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          
          {/* Glassmorphism Loyalty Membership Card */}
          <div className="col-span-1 md:col-span-2 rounded-3xl p-6.5 relative overflow-hidden bg-gradient-to-br from-neutral-900/40 via-neutral-940/30 to-amber-950/10 backdrop-blur-xl border border-neutral-800/80 dark:border-neutral-900 shadow-2xl flex flex-col justify-between h-56 group transition-all hover:border-gold-500/20">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/15 transition-all duration-700 pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-gold-400 block">Sovereign Direct Circle</span>
                <span className="font-serif font-extrabold text-white text-xl md:text-2xl mt-1 tracking-tight block">SOLAS MAISON CARD</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-neutral-905 flex items-center justify-center border border-neutral-800">
                <Award className="w-5 h-5 text-gold-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs text-neutral-450 dark:text-neutral-400 font-medium font-sans mb-1.5">
                <span>Tier Milestone: {stats.totalNights} / 12 Stay Nights</span>
                <span className="font-mono text-[10px] font-semibold text-gold-400">{stats.nextTier}</span>
              </div>
              <div className="w-full bg-neutral-900/60 dark:bg-black/40 h-1.5 rounded-full overflow-hidden border border-neutral-800/20">
                <div 
                  className="bg-gradient-to-r from-gold-600 to-gold-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${stats.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-neutral-800/60 pt-4 mt-2">
              <div>
                <p className="text-[9px] dark:text-neutral-500 text-neutral-400 uppercase tracking-wider">Direct Contract No</p>
                <p className="font-mono font-bold text-white text-sm tracking-widest mt-0.5">SL-89241-Elite</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] dark:text-neutral-500 text-neutral-400 uppercase tracking-wider">Account Tier</p>
                <p className="font-serif font-bold text-gold-300 text-xs mt-0.5 uppercase tracking-wider">{stats.tier.split(' ')[1] || 'Explorer'}</p>
              </div>
            </div>
          </div>

          {/* Stat Metric: Total Stays */}
          <div className="col-span-1 rounded-3xl p-6 bg-white dark:bg-[#121212] border border-neutral-200/60 dark:border-neutral-900 shadow-xl flex flex-col justify-between h-56 transition-all hover:shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-gold-950/20 dark:bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Compass className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Total Explorer Nights</p>
              <p className="text-4xl font-serif font-extrabold text-neutral-900 dark:text-white mt-1">{stats.totalNights}</p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2">Across vetted luxury sanctums</p>
            </div>
          </div>

          {/* Stat Metric: Total Expenditure */}
          <div className="col-span-1 rounded-3xl p-6 bg-white dark:bg-[#121212] border border-neutral-200/60 dark:border-neutral-900 shadow-xl flex flex-col justify-between h-56 transition-all hover:shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-emerald-950/20 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CreditCard className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Indirect Expenditure</p>
              <p className="text-4xl font-serif font-extrabold text-neutral-900 dark:text-white mt-1">${stats.totalExpenditure}</p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2">Zero extra service charges applied</p>
            </div>
          </div>

        </div>

        {/* Dashboard Content Select Tabs */}
        <div className="mt-14 flex border-b border-neutral-200/60 dark:border-neutral-900 justify-start gap-8">
          {(['overview', 'perks', 'recommendations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs tracking-wider uppercase font-bold transition-all relative border-b-2 cursor-pointer ${
                activeTab === tab 
                  ? 'border-gold-500 text-gold-600 dark:text-gold-400 font-extrabold scale-102' 
                  : 'border-transparent text-neutral-450 dark:text-neutral-400'
              }`}
            >
              {tab === 'overview' && 'My Active Records'}
              {tab === 'perks' && 'Your Elite Perks'}
              {tab === 'recommendations' && 'AI Sanctuary Matching'}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in text-left">
              {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-[#121212] border border-neutral-200/60 dark:border-neutral-905 rounded-3xl shadow-md">
                  <div className="w-16 h-16 rounded-full bg-neutral-900/60 flex items-center justify-center mb-4 mx-auto">
                    <Calendar className="w-8 h-8 text-neutral-500" />
                  </div>
                  <h3 className="font-serif font-bold text-neutral-900 dark:text-white text-lg">No Active Bookings</h3>
                  <p className="text-neutral-400 dark:text-neutral-550 text-xs mt-1 max-w-sm mx-auto">
                    Configure your dates and book premium rooms. Your direct contract invoices and verified passes will record instantly right here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-white dark:bg-[#121212] p-5.5 rounded-2.5xl border border-neutral-200/80 dark:border-neutral-900/80 hover:border-gold-500/20 shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-gold-500 dark:text-gold-400 uppercase font-bold tracking-widest bg-gold-500/10 dark:bg-gold-950/40 px-3 py-1 rounded">
                              Pass HB-{booking.id}
                            </span>
                            <h3 className="font-serif font-extrabold text-neutral-900 dark:text-white text-lg mt-2.5">{booking.hotelName}</h3>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{booking.roomName}</p>
                          </div>
                          
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border text-emerald-500 bg-emerald-500/5 border-emerald-500/10 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Guaranteed
                            </span>
                          </div>
                        </div>

                        {/* Timing Block */}
                        <div className="grid grid-cols-2 gap-4 border-t border-neutral-200/50 dark:border-neutral-900 mt-4.5 pt-4 text-xs">
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Arrive check-in</span>
                            <p className="font-mono font-bold text-neutral-800 dark:text-white mt-1">{booking.checkIn}</p>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Depart check-out</span>
                            <p className="font-mono font-bold text-neutral-800 dark:text-white mt-1">{booking.checkOut}</p>
                          </div>
                        </div>
                      </div>

                      {/* Summary Block */}
                      <div className="mt-6 pt-4 border-t border-neutral-201/50 dark:border-neutral-900 flex justify-between items-center bg-neutral-950/5 dark:bg-[#0E0E0E]/40 p-3.5 rounded-xl">
                        <div>
                          <p className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider">Stay Invoice Amount</p>
                          <p className="font-mono font-bold text-neutral-900 dark:text-white text-base mt-0.5">${booking.totalAmount}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (confirm('Are you absolutely certain you wish to cancel this verified booking pass? Access keys will expire.')) {
                                onCancelBooking(booking.id);
                              }
                            }}
                            className="px-3.5 py-2.5 border border-red-900/30 hover:border-red-500 text-red-500 hover:bg-red-500/5 font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => onNavigate(`confirmation:${booking.id}`)}
                            className="px-4 py-2.5 bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-750 text-white font-sans font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                          >
                            View Pass
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'perks' && (
            <div className="animate-fade-in text-left bg-white dark:bg-[#121212] p-6.5 sm:p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-900 shadow-xl max-w-4xl">
              <h3 className="font-serif text-xl font-bold dark:text-white text-neutral-905 flex items-center gap-2">
                <Sparkles className="w-5.5 h-5.5 text-gold-500 animate-pulse" /> Solas Circle VIP Perks
              </h3>
              <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1 leading-relaxed max-w-xl">
                We design exclusive, handpicked benefit packages. As a {stats.tier.split(' ')[1] || 'Explorer'} Member, you enjoy direct access to these credentials surcharges-free:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-neutral-950/5 dark:bg-[#161616]/50 border border-neutral-200/40 dark:border-neutral-850">
                  <span className="text-[9px] font-mono font-bold text-gold-500 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded">
                    Universal perk
                  </span>
                  <h4 className="font-serif font-bold text-neutral-905 dark:text-white text-sm mt-2">Flexible Early Checkout</h4>
                  <p className="text-xs text-neutral-450 dark:text-neutral-400 leading-relaxed mt-1">Enjoy complimentary check-out flexibility as late as 3:00 PM without additional surcharges.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950/5 dark:bg-[#161616]/50 border border-neutral-200/40 dark:border-neutral-850">
                  <span className="text-[9px] font-mono font-bold text-gold-500 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded">
                    Direct contract
                  </span>
                  <h4 className="font-serif font-bold text-neutral-905 dark:text-white text-sm mt-2">Priority Spa Reservations</h4>
                  <p className="text-xs text-neutral-450 dark:text-neutral-400 leading-relaxed mt-1">Reserve private mineral steam baths orcoupled massage chambers 24 hours in advance at priority rates.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950/5 dark:bg-[#161616]/50 border border-neutral-200/40 dark:border-neutral-850">
                  <span className="text-[9px] font-mono font-bold text-gold-500 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded">
                    Bronze Member +
                  </span>
                  <h4 className="font-serif font-bold text-neutral-905 dark:text-white text-sm mt-2">Welcome Curator Toast</h4>
                  <p className="text-xs text-neutral-450 dark:text-neutral-400 leading-relaxed mt-1">Receive premium welcome tonic infusions and organic locally-sourced chef appetizers upon landing check-in.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#C5A059]/5 dark:bg-[#C5A059]/5 border border-[#C5A059]/10">
                  <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded inline-block">
                    Silver Member +
                  </span>
                  <h4 className="font-serif font-bold text-neutral-905 dark:text-white text-sm mt-2">Luxury Ground Chauffeur</h4>
                  <p className="text-xs text-neutral-450 dark:text-neutral-400 leading-relaxed mt-1">Direct airport pickup or departure transfer using custom executive Tesla or Mercedes vehicles.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="animate-fade-in text-left bg-white dark:bg-[#121212] p-6.5 sm:p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-900 shadow-xl max-w-3xl">
              <h3 className="font-serif text-xl font-bold dark:text-white text-neutral-905 flex items-center gap-2">
                <Compass className="w-5.5 h-5.5 text-gold-505" /> AI Sanctuary Matching Engine
              </h3>
              <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1 leading-relaxed max-w-xl">
                Answer few preference details about your travel wishes. Our modern matching wizard evaluates architectural specs and matches you with your perfect hotel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                
                {/* Persona Matcher */}
                <div>
                  <label htmlFor="travel-persona" className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider mb-2">My Travel Persona</label>
                  <select
                    id="travel-persona"
                    value={travelPersona}
                    onChange={(e) => {
                      setTravelPersona(e.target.value);
                      setShowMatch(false);
                    }}
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-hidden text-neutral-800 dark:text-white"
                  >
                    <option value="">Choose Persona...</option>
                    <option value="wellness">Couples / Re-balancing Wellness</option>
                    <option value="business">Creative/Executive Solo Retreater</option>
                    <option value="adventure">Alpine Alpine Expeditions</option>
                    <option value="design">Architecture & Luxury Design admirer</option>
                  </select>
                </div>

                {/* Vibe Matches */}
                <div>
                  <label htmlFor="travel-vibe" className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider mb-2">Desired Sanctuary Vibe</label>
                  <select
                    id="travel-vibe"
                    value={selectedVibe}
                    onChange={(e) => {
                      setSelectedVibe(e.target.value);
                      setShowMatch(false);
                    }}
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-hidden text-neutral-800 dark:text-white"
                  >
                    <option value="">Choose Vibe...</option>
                    <option value="coastal">Positano Terrace Coastlines (Mediterranean)</option>
                    <option value="metropolitan">Tokyo High-Rise minimalist design (Eastern)</option>
                    <option value="alpine">Schist Stone Alpine hearth fire (Lakeside)</option>
                    <option value="desert">Terracotta Courtyard Adobe (Southwestern)</option>
                    <option value="island">Barefoot Overwatering Blue Hammocks (Maldives)</option>
                  </select>
                </div>

              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowMatch(true)}
                  disabled={!travelPersona || !selectedVibe}
                  className={`px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    travelPersona && selectedVibe
                      ? 'bg-gold-500 hover:bg-gold-600 text-neutral-950 font-extrabold'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  Match Sanctuary
                </button>
              </div>

              {/* Match Result Display card */}
              {showMatch && matches && (
                <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-900 animate-fade-in">
                  <span className="block text-[9px] uppercase font-bold text-neutral-400 tracking-wider mb-3">Matching recommendations result</span>
                  <div className="bg-neutral-950/5 dark:bg-black/30 p-5 rounded-2xl border border-gold-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={matches.hotel.heroImage} alt={matches.hotel.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                            {matches.score}% Match Quality
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-neutral-905 dark:text-white text-base mt-1">{matches.hotel.name}</h4>
                        <p className="text-xs text-neutral-450 dark:text-neutral-450">{matches.hotel.city}, {matches.hotel.country}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('room-details', matches.hotel.id)}
                      className="px-4.5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-sans tracking-wide uppercase font-bold text-[10.5px] rounded-lg transition-all flex items-center justify-center space-x-1 hover:bg-neutral-800 dark:hover:bg-neutral-100 cursor-pointer"
                    >
                      <span>Explore this Match</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
