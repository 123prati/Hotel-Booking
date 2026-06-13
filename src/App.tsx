/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import HotelListView from './components/HotelListView';
import RoomDetailsView from './components/RoomDetailsView';
import BookingView from './components/BookingView';
import ConfirmationView from './components/ConfirmationView';
import DashboardView from './components/DashboardView';
import AIAssistantDrawer from './components/AIAssistantDrawer';

import { HOTELS } from './data';
import { Hotel, Room, Booking, SearchParams } from './types';

export default function App() {
  // Navigation / View state
  // Supported: 'home' | 'hotels' | 'room-details' | 'booking' | 'confirmation' | 'dashboard'
  const [currentView, setCurrentView] = useState<string>('home');
  
  // Specific view selection records
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  // Search parameters filter cache
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>(undefined);

  // All booked reserves loaded from localStorage
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Theme & Chatbot overlay states
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('solas_theme') as 'dark' | 'light') || 'dark';
  });
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('solas_theme', next);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  // Load bookings from localStorage at startup safely
  useEffect(() => {
    try {
      const persisted = localStorage.getItem('solas_booking_records');
      if (persisted) {
        setBookings(JSON.parse(persisted));
      }
    } catch (e) {
      console.error('Error parsing persisted booking items from store: ', e);
    }
  }, []);

  // Save bookings helper
  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    try {
      localStorage.setItem('solas_booking_records', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving updated booking items to store: ', e);
    }
  };

  // Selection handlers
  const selectedHotel = useMemo(() => {
    if (!selectedHotelId) return null;
    return HOTELS.find(h => h.id === selectedHotelId) || null;
  }, [selectedHotelId]);

  const activeBooking = useMemo(() => {
    if (!activeBookingId) return null;
    return bookings.find(b => b.id === activeBookingId) || null;
  }, [activeBookingId, bookings]);

  // Navigate actions
  const handleNavigate = (view: string, targetId?: string) => {
    // Scroll window smoothly to apex of screen during state swaps
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId) {
      if (view === 'room-details') {
        setSelectedHotelId(targetId);
      }
    }

    if (view === 'home') {
      setCurrentView('home');
      setSelectedHotelId(null);
      setSelectedRoom(null);
    } else if (view === 'hotels') {
      setCurrentView('hotels');
      setSelectedHotelId(null);
      setSelectedRoom(null);
    } else if (view.startsWith('confirmation:')) {
      const bId = view.split(':')[1];
      setActiveBookingId(bId);
      setCurrentView('confirmation');
    } else {
      setCurrentView(view);
    }
  };

  const handleSearchLaunch = (params: SearchParams) => {
    setSearchParams(params);
    handleNavigate('hotels');
  };

  const handleSelectHotel = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    handleNavigate('room-details');
  };

  const handleSelectRoom = (room: Room, stayDetails: SearchParams) => {
    setSelectedRoom(room);
    setSearchParams(stayDetails);
    handleNavigate('booking');
  };

  // Booking submit pipeline
  const handleCompleteBooking = (newBookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const currentDateString = new Date().toISOString().split('T')[0];

    const completedRecord: Booking = {
      ...newBookingData,
      id: bookingId,
      bookingDate: currentDateString
    };

    const updatedBookings = [completedRecord, ...bookings];
    saveBookings(updatedBookings);
    
    // Set to view Confirmation Pass
    setActiveBookingId(bookingId);
    handleNavigate('confirmation');
  };

  const handleCancelBooking = (bookingId: string) => {
    const remaining = bookings.filter(b => b.id !== bookingId);
    saveBookings(remaining);
    
    // If they were actively viewing the cancelled pass, redirect back to list
    if (activeBookingId === bookingId) {
      setActiveBookingId(null);
      handleNavigate('home');
    }
  };

  // Render relevant structural viewport panels
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onSearch={handleSearchLaunch}
            onSelectHotel={handleSelectHotel}
            featuredHotels={HOTELS.filter(h => h.featured)}
          />
        );
      
      case 'hotels':
        return (
          <HotelListView 
            hotels={HOTELS}
            initialFilters={searchParams}
            onSelectHotel={handleSelectHotel}
          />
        );
      
      case 'room-details':
        if (!selectedHotel) {
          return (
            <div className={`text-center py-20 ${theme === 'light' ? 'bg-[#FAF8F5]' : 'bg-[#0A0A0A]'}`}>
              <p className="text-neutral-400 text-sm">Hotel not found. Please browse other properties.</p>
              <button onClick={() => handleNavigate('hotels')} className="mt-4 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-medium rounded transition-colors duration-200">
                Browse Properties
              </button>
            </div>
          );
        }
        return (
          <RoomDetailsView 
            hotel={selectedHotel}
            initialDates={searchParams}
            onBack={() => handleNavigate('hotels')}
            onSelectRoom={handleSelectRoom}
          />
        );

      case 'booking':
        if (!selectedHotel || !selectedRoom || !searchParams) {
          return (
            <div className={`text-center py-20 ${theme === 'light' ? 'bg-[#FAF8F5]' : 'bg-[#0A0A0A]'}`}>
              <p className="text-neutral-400 text-sm">Booking context stale. Please re-select your desired suite.</p>
              <button onClick={() => handleNavigate('hotels')} className="mt-4 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-medium rounded transition-colors duration-200">
                Browse Properties
              </button>
            </div>
          );
        }
        return (
          <BookingView 
            hotel={selectedHotel}
            room={selectedRoom}
            stayDetails={searchParams}
            onBack={() => handleNavigate('room-details')}
            onCompleteBooking={handleCompleteBooking}
          />
        );

      case 'confirmation':
        if (!activeBooking) {
          return (
            <div className={`text-center py-20 ${theme === 'light' ? 'bg-[#FAF8F5]' : 'bg-[#0A0A0A]'}`}>
              <p className="text-neutral-400 text-sm">Confirmation pass not loaded. Explore some beautiful hideaways!</p>
              <button onClick={() => handleNavigate('home')} className="mt-4 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-neutral-950 font-medium rounded transition-colors duration-200">
                Go to Home
              </button>
            </div>
          );
        }
        return (
          <ConfirmationView 
            booking={activeBooking}
            onGoHome={() => handleNavigate('hotels')}
          />
        );

      case 'dashboard':
        return (
          <DashboardView 
            bookings={bookings}
            onNavigate={handleNavigate}
            onCancelBooking={handleCancelBooking}
            theme={theme}
          />
        );

      default:
        return (
          <HomeView 
            onSearch={handleSearchLaunch}
            onSelectHotel={handleSelectHotel}
            featuredHotels={HOTELS.filter(h => h.featured)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-[#FAF8F5] text-neutral-900 selection:bg-gold-500 selection:text-neutral-950 light' 
        : 'bg-[#0A0A0A] text-[#E0E0E0] selection:bg-gold-500 selection:text-neutral-950'
    }`}>
      
      {/* Header element */}
      <Header 
        currentView={currentView}
        onNavigate={handleNavigate}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleChat={toggleChat}
      />

      {/* Main interactive panel elements */}
      <main className="flex-grow flex flex-col">
        {renderCurrentView()}
      </main>

      {/* Footer element */}
      <Footer onNavigate={handleNavigate} />

      {/* Global conversational travel companion */}
      <AIAssistantDrawer 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentHotel={selectedHotel}
        onSelectHotel={handleSelectHotel}
        theme={theme}
      />

    </div>
  );
}
