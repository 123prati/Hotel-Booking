/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight, 
  Shield, 
  Award, 
  Landmark, 
  Sparkles,
  Quote,
  TrendingUp,
  Sliders,
  Compass
} from 'lucide-react';
import { Hotel } from '../types';

interface HomeViewProps {
  onSearch: (filters: { location: string; checkIn: string; checkOut: string; guests: number }) => void;
  onSelectHotel: (hotelId: string) => void;
  featuredHotels: Hotel[];
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1600', // Amalfi Coast
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1600', // Tokyo Heights
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1600', // Maldives Sands
];

const POPULAR_DESTINATIONS = [
  { city: 'Amalfi Coast', country: 'Italy', hotels: 1, tag: 'Scenic Cliffs' },
  { city: 'Tokyo', country: 'Japan', hotels: 1, tag: 'Skyline Zen' },
  { city: 'South Ari Atoll', country: 'Maldives', hotels: 1, tag: 'Barefoot Luxury' },
  { city: 'Queenstown', country: 'New Zealand', hotels: 1, tag: 'Alpine Majestic' },
  { city: 'Santa Fe', country: 'United States', hotels: 1, tag: 'Artisan Adobe' }
];

const TESTIMONIALS = [
  {
    quote: "We booked the Otemachi Executive Suite through Solas for our honeymoon in Tokyo. The process was completely fluid. The in-room Hinoki wood bath and mountain view details were exactly as described. The Solas guest credentials unlocked an amazing private street-food tour!",
    name: "Sarah & David Mitchell",
    location: "Boston, MA &middot; Tokyo Heights",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Solas Escapes represents the absolute apex of direct curation. Our stay at Amalfi Coast's Grand Serenade Resort was breathtaking. The terrace suite with plunge pool with views of Positano was heavenly. Highly recommended for travelers that demand zero compromises.",
    name: "Charles Montgomerie",
    location: "London, UK &middot; Grand Serenade Resort",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Waking up to the serene turquoise lagoon at South Ari Atoll's Horizon Sands was a spiritual experience. The floating tray breakfast and private reef guide were beautifully cataloged. Solas guarantees the room-specific views with 100% architectural honesty.",
    name: "Aisha Vance",
    location: "Geneva, Switzerland &middot; Horizon Sands Maldives",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export default function HomeView({ onSearch, onSelectHotel, featuredHotels }: HomeViewProps) {
  // Setup nice defaults for dates
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

  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(getTomorrowString());
  const [checkOut, setCheckOut] = useState(getFutureString(4));
  const [guests, setGuests] = useState(2);

  // Suggested location controls
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Slide index for Hero wallpaper slideshow
  const [heroImgIndex, setHeroImgIndex] = useState(0);

  // Testimonial index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-cycle Hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      checkIn,
      checkOut,
      guests
    });
  };

  const selectSuggestedLocation = (city: string) => {
    setLocation(city);
    setShowSuggestions(false);
  };

  return (
    <div className="flex-1 bg-[#0A0A0A] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[620px] lg:h-[700px] flex items-center justify-center bg-black overflow-hidden border-b border-neutral-900">
        
        {/* Living background slideshow with smooth crossfades */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={heroImgIndex}
              src={HERO_IMAGES[heroImgIndex]} 
              alt="Solas Escape Background Resort"
              className="w-full h-full object-cover opacity-50 mix-blend-lighten scale-102"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.5, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-20 pb-16">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-gold-500 bg-gold-950/40 backdrop-blur-md border border-gold-500/25 px-5 py-2 rounded-full inline-flex items-center gap-1.5 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              Introducing Our 2026 Collection &bull; Solas Sanctum
            </span>
          </motion.div>

          <motion.h1 
            className="font-serif font-semibold text-3.5xl sm:text-5.5xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            Where Impeccable Architecture Meets <span className="italic font-normal text-gold-500 relative inline-block">Silent Sanctuaries</span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-xs sm:text-base text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Unveil a private circle of luxury escape suites planned for worldly explorers. Enjoy guaranteed best seasonal rates, custom organic chef programs, and direct key handoff.
          </motion.p>

          {/* Search Console HUD */}
          <motion.div 
            className="mt-12 max-w-5xl mx-auto relative z-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.6, damping: 15 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-[#141414]/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-4 sm:p-2.5 shadow-2xl border border-neutral-800/80 flex flex-col sm:flex-row gap-2.5 items-stretch relative"
              id="hero-search-form"
            >
              
              {/* Destination Input with autocomplete dropdown trigger */}
              <div className="flex-1 flex flex-col justify-center px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-neutral-800/80 text-left relative">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <label htmlFor="location" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Destination</label>
                    <input 
                      id="location"
                      type="text" 
                      placeholder="Wander through luxury..."
                      value={location}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onChange={(e) => setLocation(e.target.value)}
                      className="block w-full text-white placeholder-neutral-500 text-sm font-semibold focus:outline-hidden bg-transparent mt-0.5"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Popular Destinations Dropdown suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div 
                      className="absolute left-0 right-0 sm:left-4 top-[105%] sm:top-[120%] bg-[#121212] border border-neutral-800 rounded-2xl shadow-2xl p-4 overflow-hidden z-50 text-left w-full sm:min-w-[280px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest border-b border-neutral-850 pb-2 mb-2 flex items-center justify-between">
                        <span>Highly Curated Locations</span>
                        <TrendingUp className="w-3.5 h-3.5 text-gold-500" />
                      </h4>
                      <div className="space-y-1">
                        {POPULAR_DESTINATIONS.filter(item => 
                          item.city.toLowerCase().includes(location.toLowerCase()) || 
                          item.country.toLowerCase().includes(location.toLowerCase())
                        ).map((destination, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => selectSuggestedLocation(destination.city)}
                            className="w-full hover:bg-neutral-900 px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors focus:outline-hidden text-left"
                          >
                            <div className="flex items-center space-x-2.5">
                              <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-white leading-normal">{destination.city}</p>
                                <p className="text-[10px] text-neutral-500">{destination.country}</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono border border-gold-800/20 text-gold-400 bg-gold-950/25 px-2 py-0.5 rounded-sm">
                              {destination.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Check-in Date */}
              <div className="flex-1 flex items-center px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-neutral-800/80">
                <Calendar className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                <div className="text-left w-full">
                  <label htmlFor="checkIn" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Check In</label>
                  <input 
                    id="checkIn"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="block w-full text-white text-sm font-semibold focus:outline-hidden cursor-pointer bg-transparent scheme-dark mt-0.5"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="flex-1 flex items-center px-4 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-neutral-800/80">
                <Calendar className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                <div className="text-left w-full text-white">
                  <label htmlFor="checkOut" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Check Out</label>
                  <input 
                    id="checkOut"
                    type="date"
                    min={checkIn || getTomorrowString()}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="block w-full text-white text-sm font-semibold focus:outline-hidden cursor-pointer bg-transparent scheme-dark mt-0.5"
                  />
                </div>
              </div>

              {/* Guests Count select options */}
              <div className="flex-1 flex items-center px-4 py-2 sm:py-0">
                <Users className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                <div className="text-left w-full">
                  <label htmlFor="guests" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Designated Guests</label>
                  <select 
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="block w-full text-white text-sm font-semibold cursor-pointer focus:outline-hidden appearance-none bg-transparent mt-0.5"
                  >
                    <option value="1" className="bg-[#141414] text-white">1 Explorer</option>
                    <option value="2" className="bg-[#141414] text-white">2 Explorers</option>
                    <option value="3" className="bg-[#141414] text-white">3 Explorers</option>
                    <option value="4" className="bg-[#141414] text-white">4 Explorers</option>
                  </select>
                </div>
              </div>

              {/* Search Action trigger button */}
              <button 
                id="search-btn-hero"
                type="submit"
                className="bg-gold-500 hover:bg-gold-600 text-[#050505] p-4.5 sm:p-0 sm:w-14 sm:h-14 rounded-xl sm:rounded-full flex items-center justify-center transition-all duration-300 hover:scale-103 cursor-pointer flex-shrink-0 shadow-lg"
              >
                <Search className="w-5 h-5 stroke-[2.5px]" />
                <span className="inline-block sm:hidden ml-2 font-semibold text-sm">Configure Sanctuary</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Hideaways Section */}
      <section className="py-24 bg-[#0A0A0A] border-b border-neutral-900 relative" id="featured-destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
            <div>
              <span className="font-sans text-[10px] tracking-widest font-bold text-gold-500 uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-500" />
                Hand-Curated Escapes
              </span>
              <h2 className="font-serif text-3.5xl sm:text-4.5xl font-bold text-white mt-1">The Featured Sanctuaries</h2>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed font-light font-sans">
                Architectural masterpieces nestled within stunning geographies. Click to view available suites, complete guest reviews, and dynamic pricing maps.
              </p>
            </div>
            
            <button 
              id="view-all-hotels-btn-top"
              onClick={() => onSearch({ location: '', checkIn, checkOut, guests })}
              className="mt-6 md:mt-0 flex items-center space-x-2 text-gold-500 hover:text-gold-400 font-sans font-bold text-sm group cursor-pointer border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-850 px-4.5 py-2.5 rounded-full transition-all"
            >
              <span>Explore All Hideaways</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Staggered animated grid cards using Motion */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {featuredHotels.map((hotel) => (
              <motion.div 
                key={hotel.id}
                id={`featured-hotel-${hotel.id}`} 
                className="bg-[#121212] rounded-2xl overflow-hidden border border-neutral-900 shadow-xl flex flex-col h-full group outline outline-transparent hover:outline-gold-500/10"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden select-none">
                  <img 
                    src={hotel.heroImage} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-95" />
                  
                  {/* Rating Badge Overlay */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-white/10 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    <span className="text-xs font-bold text-white font-mono">{hotel.rating}.0</span>
                  </div>

                  {/* Location label overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-gold-500 mr-1 flex-shrink-0" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-200">{hotel.city}, {hotel.country}</span>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-[#121212]">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold-500 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-3 leading-relaxed line-clamp-2 font-light font-sans">
                      {hotel.description}
                    </p>
                    
                    {/* Amenities list mini-badges */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-neutral-900 border border-neutral-850 text-neutral-350 text-[10px] px-3 py-1 rounded-md">
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="bg-neutral-900/60 border border-neutral-850 text-neutral-450 text-[9px] px-2.5 py-0.5 rounded-sm font-semibold">
                          +{hotel.amenities.length - 3} More
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing Footer of Card */}
                  <div className="mt-8 pt-5 border-t border-neutral-850 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Starting Rate</p>
                      <p className="text-lg font-bold text-white font-mono mt-0.5">
                        ${hotel.priceStart}<span className="text-xs text-neutral-400 font-sans font-light"> / Night</span>
                      </p>
                    </div>
                    <button 
                      id={`hotel-view-btn-${hotel.id}`}
                      onClick={() => onSelectHotel(hotel.id)}
                      className="bg-gold-500 hover:bg-gold-600 text-neutral-950 font-sans text-xs font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer tracking-wider uppercase shadow-md hover:shadow-lg"
                    >
                      View Sanctum
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Brand Highlights Section (The Solas Protocol) */}
      <section className="py-24 bg-[#0E0E0E] border-b border-neutral-900 relative">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[10px] tracking-widest font-bold text-gold-500 uppercase">The Solas Difference</span>
            <h2 className="font-serif text-3.5xl font-bold text-white mt-2">A Sanctuary Beyond Comparison</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3.5 leading-relaxed font-light">
              We operate above standard online lists, partnering directly with elite architects and heritage stewards to guarantee immaculate space parameters and local authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight 1 */}
            <motion.div 
              className="p-8 bg-[#131313] rounded-2xl border border-neutral-850/80 flex flex-col items-center text-center shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-gold-950/45 border border-gold-500/20 rounded-full flex items-center justify-center mb-6 shadow-inherit text-gold-500">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">Curated Architectural Portfolios</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mt-3 max-w-xs font-light font-sans">
                Every listed suite undergoes seasonal on-site inspection by Solas directors to guarantee immaculate design acoustics, custom air flow, and clean views.
              </p>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              className="p-8 bg-[#131313] rounded-2xl border border-neutral-850/80 flex flex-col items-center text-center shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-gold-950/45 border border-gold-500/20 rounded-full flex items-center justify-center mb-6 shadow-inherit text-gold-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">Guaranteed Rate Absolute</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mt-3 max-w-xs font-light font-sans">
                We secure direct contracts. If you experience a cheaper rate for the matching scenic view within 48 hours of reservation, we match it instantly with a $50 credit.
              </p>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              className="p-8 bg-[#131313] rounded-2xl border border-neutral-850/80 flex flex-col items-center text-center shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-gold-950/45 border border-gold-500/20 rounded-full flex items-center justify-center mb-6 shadow-inherit text-gold-500">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-white text-lg sm:text-xl">Destination Heritage Curators</h3>
              <p className="text-neutral-400 text-xs leading-relaxed mt-3 max-w-xs font-light font-sans">
                Unlock exclusive local programs: private clay pottery lessons, historic volcanic hot spring routes, and organic vineyard private wine tasting access.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Slideshow with animations */}
      <section className="py-24 bg-neutral-950/45 border-b border-neutral-900/40 relative">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold bg-gold-500/10 border border-gold-500/20 px-3.5 py-1.5 rounded-sm">
            Explorer Chronicle Stories
          </span>

          <div className="mt-10 min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="font-serif italic text-lg sm:text-2xl text-neutral-300 leading-relaxed font-light px-4 sm:px-8"
              >
                <Quote className="w-8 h-8 text-gold-500/20 mx-auto mb-4" />
                "{TESTIMONIALS[testimonialIndex].quote}"
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={testimonialIndex}
              className="mt-8 flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-800">
                <img 
                  src={TESTIMONIALS[testimonialIndex].img} 
                  alt={TESTIMONIALS[testimonialIndex].name}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-white text-sm">{TESTIMONIALS[testimonialIndex].name}</p>
                <p className="text-neutral-500 text-xs font-medium" dangerouslySetInnerHTML={{ __html: TESTIMONIALS[testimonialIndex].location }} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Nav dots */}
          <div className="flex justify-center space-x-2.5 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                style={{ contentVisibility: 'auto' }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  testimonialIndex === idx ? 'bg-gold-500 w-5' : 'bg-neutral-750 hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
