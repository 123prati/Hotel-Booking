/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Users, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Calendar, 
  Maximize, 
  HelpCircle,
  ShieldAlert,
  Award,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { Hotel, Room } from '../types';

interface RoomDetailsViewProps {
  hotel: Hotel;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
  onBack: () => void;
  onSelectRoom: (room: Room, stayDetails: { checkIn: string; checkOut: string; guests: number }) => void;
}

export default function RoomDetailsView({ hotel, initialDates, onBack, onSelectRoom }: RoomDetailsViewProps) {
  // Setup excellent date helpers
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getFutureString = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || getTomorrowString());
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || getFutureString(4));
  const [guests, setGuests] = useState(initialDates?.guests || 2);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(hotel.heroImage);
  
  // Custom alert state for elegant warning layouts (bypassing restricted browser alerts)
  const [errorNotification, setErrorNotification] = useState<string | null>(null);

  // Compute stay nights
  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  // Date accuracy validation
  const isDateRangeValid = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return end > start;
  }, [checkIn, checkOut]);

  const handleBookingClick = (room: Room) => {
    setErrorNotification(null);
    
    // Smooth custom alerts
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorNotification('Checkout date must fall at least one day after your check-in date.');
      // Scroll smoothly to alerts console
      const elem = document.getElementById('available-rooms-section');
      elem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    if (guests > room.capacity) {
      setErrorNotification(`This beautiful ${room.name} has a designated capacity of max ${room.capacity} explorers.`);
      const elem = document.getElementById('available-rooms-section');
      elem?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    onSelectRoom(room, {
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <div className="flex-1 bg-[#0A0A0A] pb-24 text-neutral-200">
      
      {/* Top action helper ribbon */}
      <div className="bg-[#090909] border-b border-neutral-900 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            id="back-to-hotels-btn"
            onClick={onBack}
            className="flex items-center space-x-2 text-neutral-350 hover:text-white font-sans font-bold text-xs py-2 px-4 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 transition-all cursor-pointer shadow-xs select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold-500" />
            <span>Go Back to Browse</span>
          </button>
          
          <div className="text-[10px] sm:text-xs text-neutral-500 hidden sm:block font-bold uppercase tracking-widest">
            Currently Scouting &bull; <span className="text-white">{hotel.name}</span> &bull; {hotel.city}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Gallery Mosaic Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Large Visual Frame */}
          <div className="lg:col-span-2 h-[320px] sm:h-[460px] rounded-2xl overflow-hidden border border-neutral-900 p-0 relative shadow-xl bg-neutral-950">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedGalleryImg}
                src={selectedGalleryImg} 
                alt={hotel.name} 
                className="w-full h-full object-cover select-none"
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 bg-black/75 text-gold-300 text-[9px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 select-none">
              On-Site Photo Evidence
            </div>
          </div>
          
          {/* Gallery Sidebar thumbnails */}
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3 sm:gap-4 lg:max-h-[460px] overflow-y-auto pr-1">
            <div 
              onClick={() => setSelectedGalleryImg(hotel.heroImage)}
              className={`h-20 sm:h-24 lg:h-[102px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                selectedGalleryImg === hotel.heroImage ? 'border-gold-500 scale-98 shadow-lg shadow-gold-500/10' : 'border-neutral-900 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={hotel.heroImage} className="w-full h-full object-cover select-none" alt="Hero overview representation" />
            </div>
            {hotel.gallery.map((img, i) => (
              <div 
                key={i}
                onClick={() => setSelectedGalleryImg(img)}
                className={`h-20 sm:h-24 lg:h-[102px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedGalleryImg === img ? 'border-gold-500 scale-98 shadow-lg shadow-gold-500/10' : 'border-neutral-900 opacity-60 hover:opacity-100'
                }`}
                id={`gallery-thumb-${i}`}
              >
                <img src={img} className="w-full h-full object-cover select-none" alt={`Gallery inspection snippet ${i}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Master Details Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          
          {/* Left Block (2 columns width on desktop): General Hotel details */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              {/* Stars & Score certified badges */}
              <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
                <div className="flex text-gold-500">
                  {Array.from({ length: hotel.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold-500" />
                  ))}
                </div>
                <span className="text-neutral-800">|</span>
                <span className="bg-gold-950/40 text-gold-400 font-extrabold px-3.5 py-1 rounded-sm text-[9px] font-mono border border-gold-500/15 uppercase tracking-widest">
                  Verified Score &bull; {hotel.reviewScore}
                </span>
                <span className="text-neutral-500 text-xs font-semibold">({hotel.reviewCount} total inspections)</span>
              </div>

              {/* Title & Sub details */}
              <h1 className="font-serif font-bold text-3.5xl sm:text-5xl text-white tracking-tight mt-3">
                {hotel.name}
              </h1>
              
              <div className="flex items-center text-neutral-450 text-xs sm:text-sm mt-3 font-sans font-medium">
                <MapPin className="w-4 h-4 text-gold-500 mr-1.5 flex-shrink-0" />
                <span>{hotel.address}</span>
              </div>
              
              {/* Detailed descriptive texts */}
              <div className="mt-8 text-neutral-350 text-sm sm:text-base leading-relaxed font-sans font-light space-y-4">
                <p>{hotel.description}</p>
                <p className="text-sm">
                  Experience a standard of hospitality designed thoughtfully around space, local context, and acoustics. Guests enjoy an array of handpicked credentials: daily morning curated organic chef programs, priority booking on private wellness baths/saunas, and complimentary checkout flexibility.
                </p>
              </div>
            </div>

            {/* Hotel-wide features cards grid */}
            <div className="border-t border-neutral-900 pt-8">
              <h2 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                <Award className="w-5.5 h-5.5 text-gold-500" /> Included Heritage Amenities
              </h2>
              <p className="text-neutral-500 text-xs mt-1.5 font-light">
                Every reservation handles automatic integration to these private services entirely at no added surcharge:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5 bg-[#121212] p-4.5 rounded-2xl border border-neutral-900 shadow-md">
                    <div className="w-6 h-6 rounded-full bg-gold-950/40 text-gold-400 flex items-center justify-center border border-gold-500/15 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{amenity}</p>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal font-light">Included complimentary hospitality support and priority reservation rights.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block (1 column): Sticky Stay dates planner console */}
          <div className="col-span-1" id="stay-dates-console">
            <div className="bg-[#121212] rounded-2xl p-6.5 border border-neutral-900 shadow-xl sticky top-28">
              <h3 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-neutral-850 pb-3">
                <Calendar className="w-4.5 h-4.5 text-gold-500" />
                Configure Stay Parameters
              </h3>
              
              <div className="space-y-4">
                {/* Check In */}
                <div>
                  <label htmlFor="stay-check-in-date" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Check In Date</label>
                  <input 
                    id="stay-check-in-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-white text-xs font-semibold focus:outline-hidden focus:border-gold-500 cursor-pointer scheme-dark"
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label htmlFor="stay-check-out-date" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Check Out Date</label>
                  <input 
                    id="stay-check-out-date"
                    type="date"
                    min={checkIn || getTomorrowString()}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-white text-xs font-semibold focus:outline-hidden focus:border-gold-500 cursor-pointer scheme-dark"
                  />
                </div>

                {/* Travelers Count */}
                <div>
                  <label htmlFor="stay-explorers-count" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Designated Guests</label>
                  <select 
                    id="stay-explorers-count"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
                  >
                    <option value="1">1 Explorer</option>
                    <option value="2">2 Explorers</option>
                    <option value="3">3 Explorers</option>
                    <option value="4">4 Explorers</option>
                  </select>
                </div>
              </div>

              {/* Verified dates parameters */}
              <div className="mt-6 pt-4.5 border-t border-neutral-850 flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">Stay Duration:</span>
                <span className={`font-bold font-mono px-3 py-1 rounded text-xs border ${
                  isDateRangeValid 
                    ? 'text-white bg-neutral-950 border-neutral-800' 
                    : 'text-amber-400 bg-amber-950/20 border-amber-900/40 animate-pulse'
                }`}>
                  {isDateRangeValid ? `${totalNights} ${totalNights === 1 ? 'Night' : 'Nights'}` : 'Invalid Dates'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Accommodation units room list grid */}
        <div className="mt-24 border-t border-neutral-905 pt-16" id="available-rooms-section">
          
          <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-gold-500 font-bold uppercase tracking-widest block mb-1">Room specific reserves</span>
              <h2 className="font-serif text-2.5xl sm:text-4xl font-bold text-white">Available Accommodations</h2>
              <p className="text-neutral-450 text-xs sm:text-sm mt-1.5 font-light">
                Select your desired space module. Rates are fully configured for your selected {isDateRangeValid ? totalNights : '---'} day stay.
              </p>
            </div>
            
            <div className="bg-neutral-950/60 border border-neutral-900 px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 text-xs text-neutral-400">
              <CheckCircle2 className="w-4 h-4 text-gold-500" />
              <span>Direct Contract Pricing &bull; No Added Agency Fees</span>
            </div>
          </div>

          {/* In-Line Beautiful Verification Warnings (replacing restricted window.alert actions) */}
          <AnimatePresence>
            {errorNotification && (
              <motion.div 
                className="mb-8 p-4 bg-amber-950/30 border border-amber-900/50 text-amber-300 rounded-2xl flex items-start gap-3.5"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onClick={() => setErrorNotification(null)}
              >
                <ShieldAlert className="w-5.5 h-5.5 text-amber-400 flex-shrink-0 mt-0.5 animate-bounce-short" />
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-wider text-[10px]">Planner Verification Required</p>
                  <p className="mt-0.5 text-neutral-300">{errorNotification}</p>
                </div>
                <button className="text-[10px] font-bold uppercase underline tracking-wider text-amber-400 hover:text-white ml-auto cursor-pointer">
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Room lists with staggered Motion fade-in entries */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {hotel.rooms.map((room) => {
              const totalEstCost = room.pricePerNight * totalNights;
              const isOverCapacity = guests > room.capacity;

              return (
                <motion.div 
                  key={room.id}
                  id={`room-card-${room.id}`}
                  className={`bg-[#121212] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col md:flex-row shadow-xl ${
                    isOverCapacity ? 'border-amber-950/50 bg-amber-955/5 opacity-70' : 'border-neutral-900 hover:border-gold-500/10'
                  }`}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  
                  {/* Left: Room Image */}
                  <div className="w-full md:w-80 h-52 md:h-auto overflow-hidden relative select-none flex-shrink-0 bg-neutral-950">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/85 backdrop-blur-md text-gold-300 text-[9px] font-bold px-3 py-1.5 rounded border border-white/5 uppercase tracking-widest font-mono">
                      {room.type} Suite
                    </div>
                  </div>

                  {/* Right: Room Specs */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Capacity status line */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <h3 className="font-serif font-bold text-white text-xl">
                          {room.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-neutral-500">Designated Capacity:</span>
                          <span className={`font-bold px-2.5 py-1 rounded text-[11px] ${
                            isOverCapacity 
                              ? 'text-amber-400 bg-amber-950/20 border border-amber-900/30' 
                              : 'text-neutral-300 bg-neutral-900 border border-neutral-800'
                          }`}>
                            Max {room.capacity} Explorers
                          </span>
                        </div>
                      </div>

                      {/* Detail texts */}
                      <p className="text-neutral-450 text-xs mt-3.5 font-sans font-light leading-relaxed max-w-2xl text-left">
                        {room.description}
                      </p>

                      {/* Dimensions & beds grid badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-b border-neutral-900 my-5 py-3.5 text-xs text-neutral-300 font-medium font-sans">
                        <div className="flex items-center space-x-2">
                          <Maximize className="w-4.5 h-4.5 text-gold-500 flex-shrink-0" />
                          <span>{room.sizeSqFt} sq ft Space Layout</span>
                        </div>
                        <div className="flex items-center space-x-2 truncate">
                          <Check className="w-4.5 h-4.5 text-gold-500 flex-shrink-0" />
                          <span className="truncate">{room.bedType} config</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4.5 h-4.5 text-gold-500 flex-shrink-0" />
                          <span>Allowed Children: {room.maxChildren}</span>
                        </div>
                      </div>

                      {/* Specific suite amenities list */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {room.amenities.map((item, id) => (
                          <span key={id} className="bg-neutral-900 text-neutral-300 text-[10px] px-2.5 py-1 rounded border border-neutral-850 font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cost estimates and CTA elements */}
                    <div className="mt-8 pt-5 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      
                      <div className="flex items-center space-x-2 text-neutral-500 text-[11px] text-left">
                        <Coffee className="w-4.5 h-4.5 text-gold-505 flex-shrink-0" />
                        <span>Instant verification. No deposit locks or transaction tariffs applied.</span>
                      </div>

                      <div className="flex items-center space-x-4.5 justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Stay Total ({isDateRangeValid ? totalNights : '---'} Nights)</p>
                          <p className="text-xl font-bold text-white font-mono leading-none mt-1">
                            {isDateRangeValid ? `$${totalEstCost}` : '---'}
                            <span className="text-[11px] text-neutral-550 font-sans font-light tracking-tight"> (${room.pricePerNight}/Night)</span>
                          </p>
                        </div>

                        {isOverCapacity ? (
                          <div className="bg-[#2a1717] border border-red-950/40 text-red-400 text-xs px-4 py-3.5 rounded-xl font-bold max-w-[180px] text-center">
                            Exceeds Capacity Limits
                          </div>
                        ) : (
                          <button
                            id={`room-book-btn-${room.id}`}
                            onClick={() => handleBookingClick(room)}
                            disabled={!isDateRangeValid}
                            className={`font-sans text-xs font-bold px-5.5 py-3 rounded-xl tracking-wider uppercase transition-colors shadow-md ${
                              isDateRangeValid 
                                ? 'bg-gold-500 hover:bg-gold-600 text-neutral-950 cursor-pointer' 
                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            }`}
                          >
                            Reserve Stay
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </div>
  );
}
