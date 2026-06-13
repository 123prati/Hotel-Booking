/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Eye, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-[#050505] text-neutral-300 pt-16 pb-12 mt-auto border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 border-b border-neutral-900 pb-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-1 md:col-span-1.5 flex flex-col space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded bg-gold-950 flex items-center justify-center border border-gold-800/20">
                <span className="font-serif font-bold text-gold-500 text-base">S</span>
              </div>
              <span className="font-serif font-bold tracking-wider text-white text-lg">SOLAS</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              We curate the world’s most spectacular architectural sanctuaries, designed with impeccable craftsmanship and integrated with localized organic lifestyle options.
            </p>
            <div className="flex space-x-4 pt-2">
              <span className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-450 hover:text-gold-500 hover:border-gold-500 cursor-pointer transition-all">FB</span>
              <span className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-450 hover:text-gold-500 hover:border-gold-500 cursor-pointer transition-all">IG</span>
              <span className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-neutral-450 hover:text-gold-500 hover:border-gold-500 cursor-pointer transition-all">TW</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-white text-xs tracking-wider uppercase mb-5">Sanctuaries</h3>
            <ul className="space-y-3.5 text-neutral-400 text-xs">
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-gold-500 hover:underline cursor-pointer">
                  Amalfi Coast, Italy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-gold-500 hover:underline cursor-pointer">
                  Otemachi Sky, Tokyo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-gold-500 hover:underline cursor-pointer">
                  Lake Wakatipu, NZ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-gold-500 hover:underline cursor-pointer">
                  South Ari Atoll, Maldives
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div>
            <h3 className="font-serif font-bold text-white text-xs tracking-wider uppercase mb-5">Heritage Desk</h3>
            <ul className="space-y-3.5 text-neutral-400 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>800 Park Avenue, Suite 120, NY</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>+1 (800) 948-2940</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>curator@solas-escapes.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-serif font-bold text-white text-xs tracking-wider uppercase mb-5 font-semibold">The Chronicle</h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              Join our discrete circle of global explorers. Receive private, members-only alerts about newly opened boutique properties and luxury escapes.
            </p>
            {subscribed ? (
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-3 text-gold-500 text-xs font-medium">
                Thank you! You have been subscribed to The Chronicle.
              </div>
            ) : (
              <form className="flex space-x-2" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                <input 
                  id="newsletter-email"
                  type="email" 
                  placeholder="Secure email address" 
                  required
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-white text-xs focus:outline-hidden focus:border-gold-500 flex-1"
                />
                <button 
                  id="newsletter-submit"
                  type="submit" 
                  className="bg-gold-500 hover:bg-gold-600 text-neutral-950 font-sans font-semibold text-xs rounded-lg px-4 py-2 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright and certifications */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-neutral-500 text-[11px] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Solas Hideaways. All rights reserved.
          </div>
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>PCI Compliant Security</span>
            </span>
            <span>&middot;</span>
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span>&middot;</span>
            <span className="hover:text-neutral-300 cursor-pointer">Booking Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
