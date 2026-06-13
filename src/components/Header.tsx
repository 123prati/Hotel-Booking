/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Compass, User, Bookmark, X, Star, ChevronRight, ListOrdered, Sun, Moon, Sparkles, LayoutDashboard } from 'lucide-react';
import { Booking } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, targetId?: string) => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onToggleChat: () => void;
}

export default function Header({ currentView, onNavigate, bookings, onCancelBooking, theme, onToggleTheme, onToggleChat }: HeaderProps) {
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-[#FAF8F5]/90 border-neutral-200/60 shadow-xs text-neutral-900' 
        : 'bg-[#0A0A0A]/90 border-neutral-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 border ${
              theme === 'light' ? 'bg-[#ECEAE4] border-neutral-300' : 'bg-gold-950 border-gold-800/30'
            }`}>
              <span className="font-serif font-semibold text-lg text-gold-500">S</span>
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-serif font-bold text-lg tracking-wider uppercase ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>SOLAS</span>
              <span className="font-sans text-[10px] tracking-widest text-gold-500 font-medium uppercase -mt-1">Luxury Hideaways</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('home')}
              className={`font-sans font-medium text-sm transition-colors cursor-pointer tracking-wide ${
                currentView === 'home' 
                  ? 'text-gold-500 font-semibold border-b border-gold-500 pb-1' 
                  : theme === 'light' ? 'text-neutral-650 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Explore Home
            </button>
            <button
              id="nav-link-hotels"
              onClick={() => onNavigate('hotels')}
              className={`font-sans font-medium text-sm transition-colors cursor-pointer tracking-wide ${
                currentView === 'hotels' 
                  ? 'text-gold-500 font-semibold border-b border-gold-500 pb-1' 
                  : theme === 'light' ? 'text-neutral-650 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Our Hotels
            </button>
            <button
              id="nav-link-dashboard"
              onClick={() => onNavigate('dashboard')}
              className={`font-sans font-medium text-sm transition-colors cursor-pointer tracking-wide ${
                currentView === 'dashboard' 
                  ? 'text-gold-500 font-semibold border-b border-gold-500 pb-1' 
                  : theme === 'light' ? 'text-neutral-650 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </nav>

          {/* User & Bookings Toggle Buttons */}
          <div className="flex items-center space-x-3">
            
            {/* Oracle AI assistant */}
            <button
              id="header-ai-assistant-toggle"
              onClick={onToggleChat}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-neutral-200 hover:border-gold-500 bg-neutral-100/50 hover:bg-gold-500/10 text-neutral-700 hover:text-neutral-950 shadow-inner'
                  : 'border-neutral-805 hover:border-gold-505 hover:bg-gold-500/10 text-gold-500'
              }`}
              title="Launch AI Travel Companion"
            >
              <Sparkles className="w-4 h-4 animate-pulse-light" />
            </button>

            {/* Light / Dark Mode selector */}
            <button
              id="header-theme-toggle"
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-neutral-200 bg-neutral-100/50 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950'
                  : 'border-neutral-805 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white'
              }`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button 
              id="btn-view-bookings"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-full border transition-all cursor-pointer text-xs sm:text-sm ${
                theme === 'light'
                  ? 'border-neutral-350 hover:border-gold-500 bg-white hover:bg-gold-500/10 text-neutral-800'
                  : 'border-neutral-800 hover:border-gold-500 hover:bg-gold-500/10 text-neutral-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 text-gold-500" />
              <span className="font-semibold">My Bookings</span>
              {bookings.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-[10px] font-bold text-white ring-2 ring-[#0A0A0A] animate-bounce-short">
                  {bookings.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Drawer */}
      {isBookingsOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
              onClick={() => setIsBookingsOpen(false)}
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-[#0F0F0F] border-l border-neutral-900 shadow-2xl">
                  {/* Drawer Header */}
                  <div className="px-6 py-6 bg-[#0E0E0E] border-b border-neutral-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bookmark className="w-5 h-5 text-gold-500" />
                      <h2 className="font-serif text-lg font-bold text-white">Active Reservations</h2>
                    </div>
                    <button 
                      id="close-bookings-btn"
                      onClick={() => setIsBookingsOpen(false)}
                      className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    {bookings.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-900/60 flex items-center justify-center mb-4 border border-neutral-800">
                          <Compass className="w-8 h-8 text-neutral-600" />
                        </div>
                        <p className="font-serif font-semibold text-neutral-200 text-base">No bookings found yet</p>
                        <p className="text-neutral-400 text-xs mt-1 max-w-xs leading-relaxed">
                          Your perfect destination is waiting. Discover luxury resorts and book your dream suite today.
                        </p>
                        <button
                          id="drawer-explore-btn"
                          onClick={() => {
                            setIsBookingsOpen(false);
                            onNavigate('hotels');
                          }}
                          className="mt-6 px-5 py-2.5 bg-gold-500 text-neutral-950 hover:bg-gold-600 text-xs font-semibold rounded-full tracking-wider uppercase transition-colors cursor-pointer animate-pulse-light"
                        >
                          Find Your Sanctuary
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {bookings.map((booking) => (
                          <div 
                            key={booking.id} 
                            className="bg-neutral-900/40 rounded-xl p-4 border border-neutral-800/80 hover:border-gold-500/50 transition-all animate-fade-in"
                            id={`booking-card-${booking.id}`}
                          >
                            <div className="flex space-x-3.5">
                              <img 
                                src={booking.hotelImage} 
                                alt={booking.hotelName} 
                                className="w-16 h-16 rounded-lg object-cover bg-neutral-800 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-serif font-bold text-white text-sm truncate">{booking.hotelName}</h3>
                                <p className="text-xs text-neutral-400 leading-none mt-1">{booking.roomName}</p>
                                <div className="mt-2.5 flex items-center text-[11px] text-neutral-300 space-x-1">
                                  <Calendar className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                                  <span className="font-mono font-medium">{booking.checkIn}</span>
                                  <ChevronRight className="w-2.5 h-2.5 text-neutral-500" />
                                  <span className="font-mono font-medium">{booking.checkOut}</span>
                                </div>
                              </div>
                            </div>

                            {/* Booking Quick Stats */}
                            <div className="grid grid-cols-3 gap-2 border-t border-b border-neutral-800/80 my-3.5 py-2.5 text-center">
                              <div>
                                <p className="text-[9px] text-neutral-500 tracking-wider uppercase">Nights</p>
                                <p className="text-xs font-semibold text-neutral-300 font-mono mt-0.5">{booking.totalNights}</p>
                              </div>
                              <div>
                                <p className="text-[9px] text-neutral-500 tracking-wider uppercase">Guests</p>
                                <p className="text-xs font-semibold text-neutral-300 font-mono mt-0.5">{booking.guests}</p>
                              </div>
                              <div>
                                <p className="text-[9px] text-neutral-500 tracking-wider uppercase">Grand Total</p>
                                <p className="text-xs font-bold text-gold-500 font-mono mt-0.5">${booking.totalAmount}</p>
                              </div>
                            </div>

                            {/* Mini actions */}
                            <div className="flex space-x-2 justify-end">
                              <button
                                id={`cancel-btn-${booking.id}`}
                                onClick={() => {
                                  if (confirm('Are you absolutely certain you wish to cancel this booking reservation?')) {
                                    onCancelBooking(booking.id);
                                  }
                                }}
                                className="px-3 py-1.5 border border-red-900/40 hover:border-red-500 hover:bg-red-500/10 text-red-400 font-sans font-medium text-[11px] rounded-lg transition-colors cursor-pointer"
                              >
                                Cancel Stay
                              </button>
                              <button
                                id={`receipt-btn-${booking.id}`}
                                onClick={() => {
                                  setIsBookingsOpen(false);
                                  onNavigate(`confirmation:${booking.id}`);
                                }}
                                className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-sans font-medium text-[11px] rounded-lg transition-colors cursor-pointer"
                              >
                                View Ticket
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
