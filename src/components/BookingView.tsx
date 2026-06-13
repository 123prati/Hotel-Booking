/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Landmark, 
  Info, 
  ArrowLeft, 
  ChevronRight, 
  Star, 
  SlidersHorizontal, 
  Sparkles,
  ShieldAlert,
  Sliders,
  Maximize
} from 'lucide-react';
import { Hotel, Room, Booking } from '../types';

interface BookingViewProps {
  hotel: Hotel;
  room: Room;
  stayDetails: { checkIn: string; checkOut: string; guests: number };
  onBack: () => void;
  onCompleteBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
}

export default function BookingView({ hotel, room: initialRoom, stayDetails: initialStay, onBack, onCompleteBooking }: BookingViewProps) {
  // Active selected room state to support dynamically shifting Room Types directly on checkout form!
  const [activeRoom, setActiveRoom] = useState<Room>(initialRoom);
  
  // Interactive stay dates & guests values linked to live invoice calculations
  const [checkIn, setCheckIn] = useState(initialStay.checkIn);
  const [checkOut, setCheckOut] = useState(initialStay.checkOut);
  const [guests, setGuests] = useState(initialStay.guests);

  // Personal guest profile information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Premium guarantee card parameters
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  // Error logging state handles inline warnings cleanly (iframe safe)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Sync state if initial props change
  useEffect(() => {
    setActiveRoom(initialRoom);
    setCheckIn(initialStay.checkIn);
    setCheckOut(initialStay.checkOut);
    setGuests(initialStay.guests);
    setValidationErrors({});
    setGeneralError(null);
  }, [initialRoom, initialStay]);

  // Compute live nights stay count safely
  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  // Verify dates validity status in real-time
  const isDateRangeValid = totalNights > 0;

  // Real-time invoice calculations
  const subtotal = useMemo(() => {
    return activeRoom.pricePerNight * (totalNights || 1);
  }, [activeRoom, totalNights]);

  const serviceFee = 45; // flat boutique curation support fee
  const taxAmount = useMemo(() => {
    return Math.round(subtotal * 0.12); // standard 12% luxury VAT
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    return subtotal + serviceFee + taxAmount;
  }, [subtotal, taxAmount]);

  // Form input formatting controls
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formatted = rawValue.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted.slice(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    let formatted = rawValue;
    if (rawValue.length > 2) {
      formatted = `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}`;
    }
    setCardExpiry(formatted.slice(0, 5));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setCardCVC(rawValue.slice(0, 3));
  };

  // Live validator on change block
  const validateFields = () => {
    const errors: { [key: string]: string } = {};
    setGeneralError(null);

    // Validate Guest Name
    if (!firstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please provide a valid email format (e.g., alex@domain.com).';
    }

    // Validate Mobile Phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      errors.phone = 'Mobile contact number is required.';
    } else if (cleanPhone.length < 7) {
      errors.phone = 'Please provide a valid mobile number (at least 7 digits).';
    }

    // Validate Dates
    if (totalNights <= 0) {
      errors.dates = 'Check-out date must fall at least one day after your check-in date.';
    }

    // Validate Guests capacity
    if (guests > activeRoom.capacity) {
      errors.capacity = `Selected room accommodates a maximum of ${activeRoom.capacity} guests. Selected guest count (${guests}) exceeds this.`;
    }

    // Validate card parameters
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 16) {
      errors.cardNumber = 'Provide a full 16-digit credit card number.';
    }
    if (!cardHolder.trim()) {
      errors.cardHolder = 'Cardholder full name is required.';
    }
    if (cardExpiry.length < 5) {
      errors.cardExpiry = 'Ensure expiration date matches format (MM/YY).';
    } else {
      const [month, year] = cardExpiry.split('/');
      const mNum = parseInt(month, 10);
      if (mNum < 1 || mNum > 12) {
        errors.cardExpiry = 'Expiration month must be between 01 and 12.';
      }
    }
    if (cardCVC.length < 3) {
      errors.cardCVC = 'Provide the 3-digit verification code behind the card card (CVC).';
    }
    if (!billingAddress.trim()) {
      errors.billingAddress = 'Secured billing address is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateFields();
    if (!isValid) {
      setGeneralError('Please resolve the highlighted validation errors before securing your sanctuary.');
      // Scroll smoothly to alerts console
      const elem = document.getElementById('booking-view-header');
      elem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Mask credit details safely for display passes
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
    const maskedCard = `•••• •••• •••• ${lastFour || '4242'}`;

    onCompleteBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelAddress: hotel.address,
      hotelImage: hotel.heroImage,
      roomId: activeRoom.id,
      roomName: activeRoom.name,
      checkIn,
      checkOut,
      guests,
      totalNights,
      roomPrice: activeRoom.pricePerNight,
      taxAmount,
      serviceFreeAmount: serviceFee,
      totalAmount: grandTotal,
      guestName: `${firstName.trim()} ${lastName.trim()}`,
      guestEmail: email.trim(),
      guestPhone: phone.trim(),
      specialRequests: specialRequests.trim(),
      paymentMethod: 'Credit Card (Visa Guaranteed)',
      cardNumberMasked: maskedCard
    });
  };

  return (
    <div className="flex-1 bg-[#0A0A0A] pb-24 text-neutral-200" id="booking-stage-container">
      
      {/* Dynamic Header Ribbon */}
      <div className="bg-[#0D0D0D] border-b border-neutral-900 py-4 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 backdrop-blur-md" id="booking-view-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            id="back-to-suite-btn"
            onClick={onBack}
            type="button"
            className="flex items-center space-x-2 text-neutral-350 hover:text-white font-sans font-bold text-xs py-2 px-4 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 transition-all cursor-pointer select-none shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold-505" />
            <span>Back to Suite Specifications</span>
          </button>
          
          <div className="text-[10px] sm:text-xs text-neutral-550 font-bold uppercase tracking-widest hidden md:block">
            Secure Portal Handshake &bull; <span className="text-white">{hotel.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Verification Failure HUD block */}
        <AnimatePresence>
          {generalError && (
            <motion.div 
              className="mb-8 p-5 bg-amber-950/30 border border-amber-900/50 text-amber-200 rounded-2xl flex items-start gap-4 shadow-xl text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <ShieldAlert className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0 animate-bounce-short" />
              <div className="text-xs">
                <p className="font-bold uppercase tracking-widest text-[10px] text-amber-300">Sanctum Reservation Policy Rejected</p>
                <p className="mt-1 text-neutral-300 leading-normal">{generalError}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {Object.values(validationErrors).map((err, i) => (
                    <span key={i} className="bg-amber-955/20 border border-amber-900/30 text-[10px] px-2.5 py-0.5 rounded text-neutral-300">
                      &bull; {err}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} id="checkout-master-form" noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2-Columns Block */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* STAGE 0: Live Stay Parameters Configuration Panel */}
              <div className="bg-[#121212] rounded-2xl p-6 sm:p-7 border border-neutral-900 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center space-x-3 pb-4.5 border-b border-neutral-850 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gold-950/20 text-gold-400 border border-gold-500/10 flex items-center justify-center font-serif font-bold text-sm select-none">
                    <Sliders className="w-4 h-4 text-gold-505" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-white">Interactive Stay Configuration</h2>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Change check-in, check-out, guests and room types to dynamically update your rates.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left font-sans">
                  {/* Dynamic Room Type selection dropdown */}
                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-room-select" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Selected room type</label>
                    <select 
                      id="checkout-room-select"
                      value={activeRoom.id}
                      onChange={(e) => {
                        const newR = hotel.rooms.find(r => r.id === e.target.value);
                        if (newR) {
                          setActiveRoom(newR);
                          // Clear capacity issues if guest count fits new room type
                          if (guests > newR.capacity) {
                            setGuests(newR.capacity);
                          }
                          setValidationErrors(prev => {
                            const copies = { ...prev };
                            delete copies.capacity;
                            return copies;
                          });
                        }
                      }}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg px-3 py-2.5 text-white text-xs font-semibold focus:outline-hidden focus:border-gold-500 cursor-pointer"
                    >
                      {hotel.rooms.map(r => (
                        <option key={r.id} value={r.id} className="bg-neutral-900">
                          {r.name} (${r.pricePerNight}/night) max {r.capacity} guests
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Check In Date */}
                  <div>
                    <label htmlFor="checkout-check-in" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Check In</label>
                    <input 
                      id="checkout-check-in"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.dates;
                          return copies;
                        });
                      }}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg px-3 py-2.5 text-white text-xs font-semibold focus:outline-hidden cursor-pointer scheme-dark"
                    />
                  </div>

                  {/* Check Out Date */}
                  <div>
                    <label htmlFor="checkout-check-out" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Check Out</label>
                    <input 
                      id="checkout-check-out"
                      type="date"
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.dates;
                          return copies;
                        });
                      }}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg px-3 py-2.5 text-white text-xs font-semibold focus:outline-hidden cursor-pointer scheme-dark"
                    />
                  </div>

                  {/* Guests Dropdown Selection */}
                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-guests-count" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Designated Guests</label>
                    <select 
                      id="checkout-guests-count"
                      value={guests}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGuests(val);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.capacity;
                          return copies;
                        });
                      }}
                      className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg px-3 py-2.5 text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
                    >
                      {Array.from({ length: activeRoom.capacity }).map((_, i) => (
                        <option key={i + 1} value={i + 1} className="bg-neutral-900">
                          {i + 1} {i + 1 === 1 ? 'Explorer' : 'Explorers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Flat Bed details read-only status info */}
                  <div className="sm:col-span-2 flex items-center space-x-3 bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-lg text-xs text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-550 animate-pulse flex-shrink-0" />
                    <span>Selected Bed Setup: <strong>{activeRoom.bedType}</strong> ({activeRoom.sizeSqFt} sq ft Layout)</span>
                  </div>
                </div>

                {/* Validation line indicators inline for configuration parameters */}
                {validationErrors.dates && (
                  <p className="text-xs text-amber-400 mt-2.5 font-sans font-medium">{validationErrors.dates}</p>
                )}
                {validationErrors.capacity && (
                  <p className="text-xs text-amber-400 mt-2.5 font-sans font-medium">{validationErrors.capacity}</p>
                )}
              </div>

              {/* STAGE 1: Guest Identity Profile Form */}
              <div className="bg-[#121212] rounded-2xl p-6 sm:p-7 border border-neutral-900 shadow-xl relative">
                <div className="flex items-center space-x-3 pb-4.5 border-b border-neutral-850 mb-6 font-sans">
                  <div className="w-8 h-8 rounded-full bg-gold-950/20 text-gold-400 border border-gold-500/10 flex items-center justify-center font-serif font-bold text-sm select-none">
                    1
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-white">Primary Explorer Identity</h2>
                    <p className="text-[10px] text-neutral-500 font-light mt-0.5">Please fill with the name matching government state passport or luxury travel identification credentials.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left font-sans">
                  {/* First Name */}
                  <div>
                    <label htmlFor="first-name" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">First Name</label>
                    <input 
                      id="first-name"
                      type="text" 
                      placeholder="e.g. Eleanor"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.firstName;
                          return copies;
                        });
                      }}
                      className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                        validationErrors.firstName ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                      }`}
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="last-name" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Last Name</label>
                    <input 
                      id="last-name"
                      type="text" 
                      placeholder="e.g. Vance"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.lastName;
                          return copies;
                        });
                      }}
                      className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                        validationErrors.lastName ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                      }`}
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Email Address</label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="alex@domain.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.email;
                          return copies;
                        });
                      }}
                      className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                        validationErrors.email ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                      }`}
                      required
                    />
                    {validationErrors.email && (
                      <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="phone" className="block text-[9px] uppercase font-bold text-neutral-505 tracking-wider mb-2">Mobile Contact Number</label>
                    <input 
                      id="phone"
                      type="tel" 
                      placeholder="+1 (555) 0192-3012"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setValidationErrors(prev => {
                          const copies = { ...prev };
                          delete copies.phone;
                          return copies;
                        });
                      }}
                      className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                        validationErrors.phone ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                      }`}
                      required
                    />
                    {validationErrors.phone && (
                      <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.phone}</p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="sm:col-span-2">
                    <label htmlFor="requests" className="block text-[9px] uppercase font-bold text-neutral-505 tracking-wider mb-2">Special Surcharges / Room Request Details</label>
                    <textarea 
                      id="requests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Quiet corner suite, dietary organic specifications, late check-in arrival time cues... (optional)"
                      className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg p-3.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500"
                    />
                  </div>
                </div>

              </div>

              {/* STAGE 2: Guaranteed Card Security Form */}
              <div className="bg-[#121212] rounded-2xl p-6 sm:p-7 border border-neutral-900 shadow-xl relative">
                
                <div className="flex items-center space-x-3 pb-4.5 border-b border-neutral-850 mb-6 font-sans">
                  <div className="w-8 h-8 rounded-full bg-gold-950/20 text-gold-400 border border-gold-500/10 flex items-center justify-center font-serif font-bold text-sm select-none">
                    2
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-white">Guaranteed Direct Payment Card</h2>
                    <p className="text-[10px] text-neutral-500 font-light mt-0.5">Your luxury spot is held directly without standard deposits. Real payment is settled on departure.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
                  
                  {/* Interactive Credit Card Widget representation */}
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl text-white p-6 relative h-48 flex flex-col justify-between shadow-2xl overflow-hidden select-none font-sans">
                    
                    {/* Golden accent glow design */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex justify-between items-center">
                      <span className="font-serif italic font-bold text-gold-200 text-sm tracking-widest">Solas Escapes Card</span>
                      <span className="text-[9px] bg-white/10 text-white/85 border border-white/10 rounded px-2.5 py-0.5 font-bold">VISA DECO</span>
                    </div>

                    <div className="w-8.5 h-6.5 bg-gold-500/30 rounded-sm border border-gold-500/40 pointer-events-none -mt-4" />

                    <div>
                      <p className="font-mono text-base tracking-[0.22em] text-white/95">
                        {cardNumber || '•••• •••• •••• 4242'}
                      </p>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="truncate pr-4">
                          <p className="text-[8px] uppercase tracking-wider text-white/50">Card Holder</p>
                          <p className="font-sans text-xs font-bold text-stone-100 truncate mt-0.5">
                            {cardHolder.toUpperCase() || 'YOUR NAME HERE'}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[8px] uppercase tracking-wider text-white/50">Expiry</p>
                          <p className="font-mono text-xs text-stone-100 mt-0.5">
                            {cardExpiry || '12/28'}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Card Values inputs columns */}
                  <div className="space-y-4 font-sans text-xs">
                    
                    {/* Card digits */}
                    <div>
                      <label htmlFor="card-number-input" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Card Number</label>
                      <input 
                        id="card-number-input"
                        type="text" 
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs font-mono placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                          validationErrors.cardNumber ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                        }`}
                        required
                      />
                      {validationErrors.cardNumber && (
                        <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.cardNumber}</p>
                      )}
                    </div>

                    {/* Cardholder Identity Name */}
                    <div>
                      <label htmlFor="card-name-input" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Cardholder Full Name</label>
                      <input 
                        id="card-name-input"
                        type="text" 
                        placeholder="Eleanor Vance"
                        value={cardHolder}
                        onChange={(e) => {
                          setCardHolder(e.target.value);
                          setValidationErrors(prev => {
                            const copies = { ...prev };
                            delete copies.cardHolder;
                            return copies;
                          });
                        }}
                        className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs uppercase placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                          validationErrors.cardHolder ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                        }`}
                        required
                      />
                      {validationErrors.cardHolder && (
                        <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.cardHolder}</p>
                      )}
                    </div>

                    {/* Expiry / CVC line row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="card-expiry-input" className="block text-[9px] uppercase font-bold text-neutral-505 tracking-wider mb-2">Expiry Date</label>
                        <input 
                          id="card-expiry-input"
                          type="text" 
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs font-mono placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 text-center transition-colors ${
                            validationErrors.cardExpiry ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                          }`}
                          required
                        />
                        {validationErrors.cardExpiry && (
                          <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="card-cvc-input" className="block text-[9px] uppercase font-bold text-neutral-505 tracking-wider mb-2">Security Code (CVC)</label>
                        <input 
                          id="card-cvc-input"
                          type="password" 
                          placeholder="•••"
                          value={cardCVC}
                          onChange={handleCvcChange}
                          className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs font-mono placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 text-center transition-colors ${
                            validationErrors.cardCVC ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                          }`}
                          required
                        />
                        {validationErrors.cardCVC && (
                          <p className="text-[10px] text-red-400 mt-1 font-semibold">{validationErrors.cardCVC}</p>
                        )}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Billing Address fields line */}
                <div className="mt-6 border-t border-neutral-850 pt-6 font-sans">
                  <label htmlFor="billing-address-input" className="block text-[9px] uppercase font-bold text-neutral-505 tracking-wider mb-2">Billing Address details</label>
                  <input 
                    id="billing-address-input"
                    type="text" 
                    placeholder="e.g. 742 Evergreen Terrace, Boston, MA 12104"
                    value={billingAddress}
                    onChange={(e) => {
                      setBillingAddress(e.target.value);
                      setValidationErrors(prev => {
                        const copies = { ...prev };
                        delete copies.billingAddress;
                        return copies;
                      });
                    }}
                    className={`w-full bg-[#1A1A1A] border rounded-lg px-3.5 py-2.5 text-white text-xs placeholder-neutral-550 focus:outline-hidden focus:border-gold-500 transition-colors ${
                      validationErrors.billingAddress ? 'border-red-900/60 focus:border-red-500/80 bg-red-955/5' : 'border-neutral-800'
                    }`}
                    required
                  />
                  {validationErrors.billingAddress && (
                    <p className="text-[10px] text-red-400 mt-1 font-semibold text-left">{validationErrors.billingAddress}</p>
                  )}
                </div>

              </div>

            </div>

            {/* Right Sidebar Column: Reservation Invoice Summary (Live-calculating!) */}
            <div className="col-span-1" id="checkout-sidebar-invoice">
              <div className="bg-[#121212] rounded-2xl p-6 border border-neutral-900 shadow-xl sticky top-24">
                
                <h3 className="font-serif text-base font-bold text-white border-b border-neutral-850 pb-3 mb-4.5 text-left">
                  Boutique Invoice Summary
                </h3>

                {/* Micro hotel branding block snippet */}
                <div className="flex space-x-3 text-left pb-4 border-b border-neutral-850">
                  <img 
                    src={hotel.heroImage} 
                    alt={hotel.name} 
                    className="w-14 h-14 object-cover rounded-lg bg-neutral-900 border border-neutral-800 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-white text-sm truncate">{hotel.name}</h4>
                    <div className="flex items-center text-neutral-500 text-[10px] mt-0.5">
                      <Landmark className="w-3.5 h-3.5 text-gold-505 mr-1" />
                      <span className="truncate">{hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </div>

                {/* Segment summaries (displays live-calculated variables nicely) */}
                <div className="bg-neutral-900 rounded-xl p-3.5 border border-neutral-850 mt-4 text-xs space-y-2.5 text-left font-sans">
                  <div className="flex justify-between items-start text-neutral-300 font-medium leading-none">
                    <span>Chosen Suite:</span>
                    <span className="font-bold text-white text-right leading-none">{activeRoom.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Stay Dates:</span>
                    <span className="font-semibold text-neutral-200 font-mono text-[10.5px] bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {checkIn || '---'} &rarr; {checkOut || '---'}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-300">
                    <span>Explorers count:</span>
                    <span className="font-bold text-neutral-200">
                      {guests} {guests === 1 ? 'Explorer' : 'Explorers'}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-350 pt-2 border-t border-neutral-850">
                    <span>Stay length:</span>
                    <span className={`font-bold font-mono ${isDateRangeValid ? 'text-white' : 'text-amber-400 animate-pulse'}`}>
                      {isDateRangeValid ? `${totalNights} nights` : 'Invalid Range'}
                    </span>
                  </div>
                </div>

                {/* Sub calculations lines */}
                <div className="mt-6 border-t border-neutral-850 pt-5 space-y-3.5 text-xs text-neutral-400 font-medium text-left font-sans">
                  
                  <div className="flex justify-between">
                    <span>Subtotal Stay ({isDateRangeValid ? totalNights : 1} × ${activeRoom.pricePerNight})</span>
                    <span className="font-semibold text-white font-mono">${subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Handled concierge service fee</span>
                    <span className="font-semibold text-white font-mono">${serviceFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated luxury VAT (12%)</span>
                    <span className="font-semibold text-white font-mono">${taxAmount}</span>
                  </div>

                  {/* Grand total segment display */}
                  <div className="flex justify-between text-white font-bold text-sm border-t border-dashed border-neutral-850 pt-4 font-sans">
                    <span>Secured Total Quote</span>
                    <span className="text-base text-gold-500 font-mono font-bold">${grandTotal}</span>
                  </div>

                </div>

                <div className="mt-8 space-y-4 font-sans">
                  <div className="flex items-start space-x-2 bg-gold-950/20 p-4 rounded-xl border border-gold-950/40 text-left">
                    <ShieldCheck className="w-5 h-5 text-gold-505 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gold-200/90 leading-relaxed text-left font-medium">
                      <strong>Exclusive Direct Rates:</strong> Direct Solas vetted partnership matches lowest rates instantly and ensures zero added transaction fees on departure.
                    </p>
                  </div>

                  {/* Submit Checkout secured Button trigger */}
                  <button 
                    id="submit-secured-booking-btn"
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-neutral-950 font-sans tracking-wide uppercase font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <span>Secure Booking Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[9px] text-neutral-500 uppercase tracking-wider font-extrabold font-mono pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    <span>Secure SSL Connection Enabled</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>
      </div>

    </div>
  );
}
