/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Calendar, User, Mail, DollarSign, Printer, ArrowRight, Landmark, Clock, ShieldCheck, Compass } from 'lucide-react';
import { Booking } from '../types';

interface ConfirmationViewProps {
  booking: Booking;
  onGoHome: () => void;
}

export default function ConfirmationView({ booking, onGoHome }: ConfirmationViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 bg-[#0A0A0A] pb-24 text-neutral-200">
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center animate-fade-in">
        
        {/* Animated Celebration Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold-950/20 border border-gold-500/30 flex items-center justify-center text-gold-500 shadow-inner animate-pulse">
            <CheckCircle2 className="w-9 h-9" />
          </div>
        </div>

        <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 font-bold bg-gold-950/20 border border-gold-500/20 px-3 py-1 rounded-sm inline-block">
          Reservation Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight">
          Your Sanctuary Awaits
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed font-sans">
          A confirmation register has been compiled and dispatched to <span className="font-semibold text-white">{booking.guestEmail}</span>. Please present this luxury ticket upon landing check-in.
        </p>

        {/* PRINTABLE BOUTIQUE TICKET / PASS */}
        <div 
          id="printable-luxury-pass"
          className="bg-[#141414] rounded-3xl border border-neutral-850 shadow-2xl overflow-hidden mt-10 text-left relative max-w-2xl mx-auto"
        >
          {/* Ticket Header */}
          <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 relative border-b border-neutral-850">
            {/* Top decorative design vector */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest font-mono">Guaranteed Travel Pass</span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-gold-100">{booking.hotelName}</h2>
                <div className="flex items-center text-neutral-450 text-xs mt-1">
                  <Landmark className="w-3.5 h-3.5 text-gold-500 mr-1" />
                  <span>{booking.hotelAddress}</span>
                </div>
              </div>
              
              {/* Ticket Price Box */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-2 text-right">
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Estimated Settled Price</span>
                <span className="font-mono text-lg font-bold text-gold-200">${booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Dotted cutting trace line */}
          <div className="relative flex justify-between items-center bg-neutral-900/40 h-5 px-3">
            {/* Left scissor circle cutout */}
            <div className="absolute -left-3.5 w-7 h-7 bg-[#0A0A0A] border border-neutral-850 rounded-full z-10" />
            
            {/* Horizontal line */}
            <div className="w-full border-t-2 border-dashed border-neutral-850" />
            
            {/* Right scissor circle cutout */}
            <div className="absolute -right-3.5 w-7 h-7 bg-[#0A0A0A] border border-neutral-850 rounded-full z-10" />
          </div>

          {/* Ticket Specs Workspace */}
          <div className="p-6 sm:p-8 space-y-8 bg-[#141414]">
            
            {/* Key stay dates blocks */}
            <div className="grid grid-cols-2 gap-4 border-b border-neutral-850 pb-6 font-sans">
              <div>
                <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Arrive / Check-In</p>
                <p className="font-mono text-base font-bold text-white mt-1">{booking.checkIn}</p>
                <div className="flex items-center text-[10px] text-neutral-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-gold-500 mr-1" />
                  <span>After 3:00 PM</span>
                </div>
              </div>

              <div>
                <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider text-right">Depart / Check-Out</p>
                <p className="font-mono text-base font-bold text-white mt-1 text-right">{booking.checkOut}</p>
                <div className="flex items-center text-[10px] text-neutral-400 mt-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-gold-500 mr-1" />
                  <span>Prior to 11:00 AM</span>
                </div>
              </div>
            </div>

            {/* Core reservation descriptors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm border-b border-neutral-850 pb-6 font-sans">
              <div className="space-y-3.5 text-neutral-300">
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-28 font-medium">Explorer Name:</span>
                  <span className="font-bold text-white">{booking.guestName}</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-28 font-medium">Guest Email:</span>
                  <span className="font-medium text-white truncate max-w-[180px]">{booking.guestEmail}</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-28 font-medium">Guest Phone:</span>
                  <span className="font-medium text-white">{booking.guestPhone}</span>
                </div>
              </div>

              <div className="space-y-3.5 text-neutral-300">
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-24 font-medium">Selected Room:</span>
                  <span className="font-bold text-white">{booking.roomName}</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-24 font-medium">Stay Duration:</span>
                  <span className="font-bold text-white font-mono">{booking.totalNights} Nights</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:space-x-4 text-left">
                  <span className="text-neutral-500 text-xs w-24 font-medium">Explorers count:</span>
                  <span className="font-bold text-white">{booking.guests} Guests</span>
                </div>
              </div>
            </div>

            {/* Special Request outline if filled */}
            {booking.specialRequests ? (
              <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 font-sans">
                <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-1.5 text-left">Your Registered requests details</span>
                <p className="text-xs text-neutral-300 leading-relaxed font-light text-left">{booking.specialRequests}</p>
              </div>
            ) : null}

            {/* In-person check-in instructions details */}
            <div className="text-neutral-450 text-xs space-y-2 leading-relaxed font-light font-sans text-left">
              <h4 className="font-serif font-bold text-white text-sm">Arrival Protocols:</h4>
              <p>
                Our curated check-in desk works directly with your smartphone. When arriving at our reception area, present this secure pass to your personal curator in the front lounge who will assign your room key and physical welcome amenities.
              </p>
            </div>

            {/* Barcode representation block */}
            <div className="border-t border-neutral-850 pt-8 flex flex-col items-center justify-center space-y-3 select-none">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold font-sans">Secure Booking Code</span>
              
              {/* Fake visual bar codes */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-64 bg-black items-stretch p-2 rounded pointer-events-none">
                  <div className="flex-1 bg-white mr-1" />
                  <div className="w-1.5 bg-white mr-1" />
                  <div className="w-0.5 bg-white mr-0.5" />
                  <div className="w-2 bg-white mr-1.5" />
                  <div className="flex-1 bg-black mr-2" />
                  <div className="w-0.5 bg-white mr-2" />
                  <div className="w-3 bg-white mr-1" />
                  <div className="w-1 bg-white mr-0.5" />
                  <div className="flex-1 bg-black mr-1" />
                  <div className="w-1.5 bg-white mr-1" />
                  <div className="w-0.5 bg-white mr-2" />
                  <div className="w-2.5 bg-white" />
                </div>
                <p className="font-mono text-xs tracking-widest text-neutral-400 font-bold uppercase mt-2.5">
                  HB-{booking.id.toUpperCase()}-2026
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Action button rows (Print / Home navigation) */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 font-sans">
          <button 
            id="print-invoice-btn"
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 border border-neutral-800 bg-[#141414] hover:bg-neutral-800 text-neutral-200 hover:text-white font-sans font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-4.5 h-4.5 text-gold-505" />
            <span>Print Travel Voucher</span>
          </button>

          <button 
            id="return-home-btn"
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 bg-gold-400 hover:bg-gold-500 text-neutral-950 font-sans tracking-wide uppercase font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Return to Sanctuary List</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
