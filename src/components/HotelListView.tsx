/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  SlidersHorizontal, 
  RefreshCw, 
  Compass, 
  Coffee, 
  Info, 
  ChevronRight, 
  X, 
  Filter, 
  DollarSign, 
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Hotel } from '../types';

interface HotelListViewProps {
  hotels: Hotel[];
  initialFilters?: { location: string; checkIn: string; checkOut: string; guests: number };
  onSelectHotel: (hotelId: string) => void;
}

export default function HotelListView({ hotels, initialFilters, onSelectHotel }: HotelListViewProps) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialFilters?.location || '');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('recommended');
  
  // Mobile drawer controls
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract cities and amenities list dynamically
  const citiesList = useMemo(() => {
    return Array.from(new Set(hotels.map(h => h.city))).sort();
  }, [hotels]);

  const allAmenitiesList = useMemo(() => {
    const list = new Set<string>();
    hotels.forEach(h => h.amenities.forEach(a => list.add(a)));
    return Array.from(list).sort();
  }, [hotels]);

  // Handle toggles
  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCities([]);
    setSelectedRating(null);
    setSelectedAmenities([]);
    setMaxBudget(1500);
    setSortBy('recommended');
  };

  // Filter matching logic
  const filteredHotels = useMemo(() => {
    return hotels
      .filter(hotel => {
        // Search text match (Hotel name, address, city, country)
        const matchesQuery = searchQuery === '' || 
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.address.toLowerCase().includes(searchQuery.toLowerCase());

        // City match
        const matchesCity = selectedCities.length === 0 || selectedCities.includes(hotel.city);

        // Star rating match
        const matchesRating = selectedRating === null || hotel.rating >= selectedRating;

        // Price budget start
        const matchesPrice = hotel.priceStart <= maxBudget;

        // Amenities match (all selected must be present)
        const matchesAmenities = selectedAmenities.length === 0 || 
          selectedAmenities.every(requiredAmenity => hotel.amenities.includes(requiredAmenity));

        return matchesQuery && matchesCity && matchesRating && matchesPrice && matchesAmenities;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.priceStart - b.priceStart;
        if (sortBy === 'priceDesc') return b.priceStart - a.priceStart;
        if (sortBy === 'ratingDesc') return b.reviewScore - a.reviewScore;
        return b.featured ? 1 : -1; // Recommended defaults to featured ahead
      });
  }, [hotels, searchQuery, selectedCities, selectedRating, maxBudget, selectedAmenities, sortBy]);

  // Count active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCities.length > 0) count += selectedCities.length;
    if (selectedRating !== null) count++;
    if (selectedAmenities.length > 0) count += selectedAmenities.length;
    if (maxBudget < 1500) count++;
    return count;
  }, [searchQuery, selectedCities, selectedRating, selectedAmenities, maxBudget]);

  // Sidebar Filter Form Content Shared between Desktop & Mobile Drawer
  const renderFilterForm = () => (
    <div className="space-y-7">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-850">
        <span className="flex items-center text-sm font-bold text-white tracking-wide">
          <SlidersHorizontal className="w-4 h-4 text-gold-500 mr-2" />
          Refine Sanctuary
        </span>
        {activeFiltersCount > 0 && (
          <button 
            id="reset-filters-btn-sidebar"
            onClick={resetAllFilters}
            className="text-[11px] text-gold-500 hover:text-gold-400 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Text search inside sidebar */}
      <div>
        <label htmlFor="sidebar-search" className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2">Keyword Search</label>
        <div className="relative">
          <input 
            id="sidebar-search"
            type="text" 
            placeholder="Hotel, city, landmark..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-8 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-gold-500 transition-colors"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-neutral-401 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Destination select checklist */}
      <div>
        <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2.5">Properties Location</span>
        <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
          {citiesList.map(city => (
            <label key={city} className="flex items-center text-xs text-neutral-300 select-none cursor-pointer group">
              <input 
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => handleCityToggle(city)}
                className="rounded-sm border-neutral-800 bg-neutral-905 text-gold-500 focus:ring-offset-0 focus:ring-gold-500 w-4 h-4 mr-2.5 cursor-pointer accent-gold-500"
              />
              <span className="group-hover:text-white transition-colors">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price budget slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider">Starting Rate Ceiling</span>
          <span className="text-xs font-bold text-gold-500 font-mono bg-gold-950/40 border border-gold-500/10 px-2 py-0.5 rounded">${maxBudget} max</span>
        </div>
        <input 
          id="budget-range-input"
          type="range"
          min="200"
          max="1500"
          step="50"
          value={maxBudget}
          onChange={(e) => setMaxBudget(parseInt(e.target.value))}
          className="w-full accent-gold-500 cursor-pointer h-1.5 bg-neutral-850 rounded"
        />
        <div className="flex justify-between text-[9px] text-neutral-500 font-bold font-mono mt-1 px-0.5">
          <span>$200</span>
          <span>$1500</span>
        </div>
      </div>

      {/* Quality stars minimum */}
      <div>
        <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2.5">Minimum Quality Class</span>
        <div className="grid grid-cols-3 gap-2">
          {[3, 4, 5].map((stars) => (
            <button
              key={stars}
              id={`rating-filter-btn-${stars}`}
              onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
              type="button"
              className={`py-2 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-all ${
                selectedRating === stars
                  ? 'bg-gold-500 border-gold-500 text-neutral-950 font-bold shadow-md shadow-gold-500/10'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-850 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${selectedRating === stars ? 'fill-neutral-950 text-neutral-950' : 'text-neutral-500'}`} />
              <span>{stars}★</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities checkbox list */}
      <div>
        <span className="block text-[9px] uppercase font-bold text-neutral-500 tracking-wider mb-2.5">Bespoke Amenities</span>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {allAmenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center text-xs text-neutral-300 select-none cursor-pointer group">
              <input 
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="rounded-sm border-neutral-800 bg-neutral-905 text-gold-500 focus:ring-offset-0 focus:ring-gold-500 w-4 h-4 mr-2.5 cursor-pointer accent-gold-500"
              />
              <span className="group-hover:text-white transition-colors text-left">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#0A0A0A] pb-24 text-neutral-205">
      
      {/* Dynamic Header search banner panel */}
      <div className="bg-[#0A0A0A] py-14 px-4 relative border-b border-neutral-900">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left">
          <motion.nav 
            className="flex justify-center md:justify-start items-center space-x-2 text-gold-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span>Solas Circle</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">World-class Sanctuaries</span>
          </motion.nav>
          
          <motion.h1 
            className="font-serif text-3.5xl sm:text-5xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Direct Handpicked Portfolio
          </motion.h1>
          <motion.p 
            className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto md:mx-0 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Refine our premier collection of architecture hotels, historic villas, and wellness suites. Double-inspected, room-specific credentials.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Dynamic filter tags builder row */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-neutral-950/60 rounded-xl border border-neutral-900 animate-fade-in">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-550 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-gold-500" /> Key Filters Enabled:
            </span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-900 px-3 py-1 rounded-full text-white border border-neutral-800">
                Keyword: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-gold-500 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCities.map(city => (
              <span key={city} className="inline-flex items-center gap-1 text-[11px] bg-neutral-900 px-3 py-1 rounded-full text-white border border-neutral-800">
                City: {city}
                <button onClick={() => handleCityToggle(city)} className="text-gold-500 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedRating !== null && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-900 px-3 py-1 rounded-full text-white border border-neutral-800">
                Rating: {selectedRating}★+
                <button onClick={() => setSelectedRating(null)} className="text-gold-500 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {maxBudget < 1500 && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-neutral-900 px-3 py-1 rounded-full text-white border border-neutral-800">
                Max ${maxBudget}/night
                <button onClick={() => setMaxBudget(1500)} className="text-gold-500 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedAmenities.map(amenity => (
              <span key={amenity} className="inline-flex items-center gap-1 text-[11px] bg-neutral-900 px-3 py-1 rounded-full text-white border border-neutral-800">
                Amenity: {amenity}
                <button onClick={() => handleAmenityToggle(amenity)} className="text-gold-500 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button 
              onClick={resetAllFilters}
              className="text-[10px] font-bold uppercase tracking-wider text-gold-500 hover:underline cursor-pointer ml-auto transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Filters Sidebar Panel (Desktop Only) */}
          <div className="hidden lg:block col-span-1" id="filter-sidebar">
            <div className="bg-[#121212] rounded-2xl p-6 border border-neutral-900 shadow-xl sticky top-24">
              {renderFilterForm()}
            </div>
          </div>

          {/* Column 2: Hotel list workspace */}
          <div className="col-span-1 lg:col-span-3">
            
            {/* Top Toolbar line (Sorting, counters) */}
            <div className="bg-[#121212] rounded-2xl p-4 border border-neutral-900 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="text-neutral-300 text-xs sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-500" />
                <span>Found <span className="font-bold text-gold-500 font-mono text-sm">{filteredHotels.length}</span> Solas-vetted hideaways</span>
              </div>
              
              {/* Sorting selectors & Mobile toggle filter display */}
              <div className="flex items-center justify-between sm:justify-end gap-3.5">
                
                {/* Mobile Show Drawer Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 text-xs text-white rounded-lg hover:border-gold-500 hover:bg-gold-500/10 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
                  <span>Filters ({activeFiltersCount})</span>
                </button>

                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-select" className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Sort</label>
                  <select 
                    id="sort-select"
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold cursor-pointer focus:outline-hidden focus:border-gold-500"
                  >
                    <option value="recommended">Recommended Choice</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="ratingDesc">Guest Inspection Score</option>
                  </select>
                </div>

              </div>
            </div>

            {/* List block */}
            <AnimatePresence mode="wait">
              {filteredHotels.length === 0 ? (
                <motion.div 
                  className="bg-[#121212] rounded-3xl p-16 border border-neutral-900 text-center flex flex-col items-center justify-center shadow-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gold-950/20 border border-gold-500/30 flex items-center justify-center mb-5">
                    <Compass className="w-8 h-8 text-gold-500 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <h3 className="font-serif font-bold text-white text-xl">No Sanctuaries Match Your Criteria</h3>
                  <p className="text-neutral-400 text-xs mt-2 max-w-sm leading-relaxed font-light font-sans">
                    All our properties are limited catalog luxury suites. Try raising your budget ceiling, clearing a keyword, or matching fewer specialty amenities.
                  </p>
                  <button
                    id="zero-match-reset-btn"
                    onClick={resetAllFilters}
                    className="mt-6 px-6 py-3 bg-gold-500 text-neutral-950 hover:bg-gold-600 text-xs font-bold rounded-full uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Reset Active Parameters
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
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
                  {filteredHotels.map((hotel) => (
                    <motion.div 
                      key={hotel.id} 
                      id={`hotel-card-${hotel.id}`}
                      className="bg-[#121212] rounded-2xl overflow-hidden border border-neutral-900 shadow-xl flex flex-col md:flex-row group outline outline-transparent hover:outline-gold-500/10 transition-all duration-300"
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
                      }}
                      whileHover={{ y: -4 }}
                    >
                      
                      {/* Hotel Image with hover zoom */}
                      <div className="w-full md:w-80 h-56 md:h-auto select-none relative overflow-hidden flex-shrink-0 bg-neutral-950">
                        <img 
                          src={hotel.heroImage} 
                          alt={hotel.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                        />
                        {hotel.featured && (
                          <div className="absolute top-4 left-4 bg-gold-950/90 text-gold-200 text-[9px] font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-sm border border-gold-500/20 backdrop-blur-md">
                            Featured Luxury
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5 md:hidden">
                          <span className="text-xs font-medium text-white">{hotel.city}, {hotel.country}</span>
                        </div>
                      </div>

                      {/* Hotel Specs Workspace */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          
                          {/* Rating, score and certification line */}
                          <div className="flex items-center space-x-2.5 text-xs flex-wrap gap-y-2">
                            <div className="flex text-gold-500">
                              {Array.from({ length: hotel.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <span className="text-neutral-800">|</span>
                            <span className="bg-gold-950/40 text-gold-400 font-extrabold px-2.5 py-0.5 rounded-sm text-[9.5px] font-mono border border-gold-500/15 uppercase tracking-wider">
                              Outstanding &bull; {hotel.reviewScore}
                            </span>
                            <span className="text-neutral-500 text-[11px] font-medium">({hotel.reviewCount} direct reviews)</span>
                          </div>

                          {/* Title & Location address */}
                          <h2 className="font-serif font-bold text-white text-xl sm:text-2xl mt-3 group-hover:text-gold-500 transition-colors">
                            {hotel.name}
                          </h2>
                          
                          <div className="flex items-center text-neutral-450 text-xs mt-1.5 font-sans font-medium">
                            <MapPin className="w-3.5 h-3.5 text-gold-500 mr-1 flex-shrink-0" />
                            <span>{hotel.address}</span>
                          </div>

                          {/* Short description */}
                          <p className="text-neutral-400 text-xs mt-4.5 leading-relaxed max-w-2xl font-sans font-light line-clamp-3">
                            {hotel.description}
                          </p>

                          {/* Amenities list */}
                          <div className="flex flex-wrap gap-1.5 mt-5">
                            {hotel.amenities.map((amenity, idx) => (
                              <span 
                                key={idx} 
                                className="bg-[#191919] text-neutral-300 font-sans font-medium text-[10px] px-2.5 py-1 rounded-sm border border-neutral-850"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>

                        </div>

                        {/* Pricing and view clicker line */}
                        <div className="mt-8 pt-5.5 border-t border-neutral-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-3 text-left">
                            <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                              <Coffee className="w-4 h-4 text-gold-500" />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-tight font-sans font-light">
                              Custom welcome tonic <br />and premium breakfast selections.
                            </p>
                          </div>

                          <div className="flex items-center space-x-4.5 justify-between sm:justify-end">
                            <div>
                              <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider text-right">Sanctum Rate</p>
                              <p className="text-xl font-bold text-white font-mono mt-0.5 leading-none">
                                ${hotel.priceStart}<span className="text-xs text-neutral-550 font-sans font-light"> / Night</span>
                              </p>
                            </div>
                            
                            <button 
                              id={`list-hotel-view-btn-${hotel.id}`}
                              onClick={() => onSelectHotel(hotel.id)}
                              className="bg-gold-500 hover:bg-gold-600 text-neutral-950 font-sans text-xs font-bold px-5.5 py-3 rounded-xl tracking-wider uppercase transition-colors cursor-pointer shadow-md"
                            >
                              Explore Suites
                            </button>
                          </div>
                        </div>

                      </div>
                      
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* Slideout filter drawer for mobile device screen views */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              
              {/* Blur backdrop overlay */}
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFiltersOpen(false)}
              />

              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div 
                  className="pointer-events-auto w-screen max-w-md"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#0E0E0E] shadow-2xl border-l border-neutral-850">
                    
                    {/* Drawer top close button */}
                    <div className="px-6 py-5 bg-[#0A0A0A] border-b border-neutral-850 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Filter Hideaways</h2>
                      </div>
                      <button 
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Drawer filter form content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#0E0E0E]">
                      {renderFilterForm()}
                    </div>

                    {/* Drawer footer action buttons */}
                    <div className="px-6 py-5 bg-[#0A0A0A] border-t border-neutral-850 flex items-center justify-between gap-4">
                      <button
                        onClick={resetAllFilters}
                        className="flex-1 py-3 border border-neutral-800 rounded-xl text-xs text-neutral-400 hover:text-white font-semibold transition-colors uppercase tracking-wider"
                      >
                        Reset All
                      </button>
                      <button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="flex-1 py-3 bg-gold-500 text-[#050505] font-bold rounded-xl text-xs hover:bg-gold-600 transition-colors uppercase tracking-wider shadow-md"
                      >
                        Show {filteredHotels.length} Sanctums
                      </button>
                    </div>

                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
