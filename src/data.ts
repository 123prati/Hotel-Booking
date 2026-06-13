/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hotel } from './types';

export const HOTELS: Hotel[] = [
  {
    id: 'grand-serenade',
    name: 'Grand Serenade Resort',
    rating: 5,
    reviewScore: 4.8,
    reviewCount: 342,
    city: 'Amalfi Coast',
    country: 'Italy',
    address: 'Via Cristoforo Colombo, 84017 Positano SA, Italy',
    coordinates: { lat: 40.6281, lng: 14.4850 },
    description: 'Perched dramatically on the legendary cliffs of Positano, Grand Serenade Resort offers panoramic Mediterranean vistas, lush terraced gardens, and exceptional Michelin-star culinary journeys. Immersed in absolute coast atmosphere, it has been the pinnacle of European luxury for over half a century.',
    priceStart: 450,
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: [
      'Infinity Pool',
      'Michelin-Star Dining',
      'Private Beach Access',
      'Wellness Spa & Hammam',
      '24/7 Butler Service',
      'Helipad Access',
      'Yacht Charter Desk'
    ],
    featured: true,
    reviewsList: [
      {
        id: 'gs-r1',
        guestName: 'Sarah & David Mitchell',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-05-12',
        comment: 'We booked the Mediterranean Terrace Suite for our anniversary. The cliffside views left us speechless. The private heated pool and Michelin-star standard breakfast delivered to our pergola was unmatched. Pure architectural bliss.',
        overallRating: 5,
        categories: { cleanliness: 5.0, service: 4.9, location: 5.0, amenities: 4.8 }
      },
      {
        id: 'gs-r2',
        guestName: 'Charles Montgomerie',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-04-20',
        comment: 'Direct concierge support organized a private yacht tour around Positano smoothly. The absolute pinnacle of European cliffside design. Highly recommended.',
        overallRating: 4.8,
        categories: { cleanliness: 4.8, service: 5.0, location: 5.0, amenities: 4.6 }
      }
    ],
    rooms: [
      {
        id: 'serenade-deluxe-sea',
        name: 'Deluxe Sea View Room',
        type: 'deluxe',
        description: 'Immaculately styled with hand-painted ceramic tiles and private balcony directly overlooking the sapphire expanse of the Amalfi Coast.',
        pricePerNight: 450,
        capacity: 2,
        bedType: 'King bed',
        sizeSqFt: 480,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600',
        amenities: ['Private Balcony', 'Marshall Sound System', 'Espresso Station', 'L\'Occitane Toiletries', 'High-Speed Wi-Fi'],
        maxChildren: 1,
        occupiedDates: ['2026-06-15', '2026-06-16', '2026-06-21', '2026-06-22'],
        promoOffer: { code: 'EARLY15', badge: '15% Early Bird', discountPercentage: 15, description: 'Book at least 15 days in advance' }
      },
      {
        id: 'serenade-mediterranean-suite',
        name: 'Mediterranean Terrace Suite',
        type: 'suite',
        description: 'An expansive modern living area flowing seamlessly onto a 300 sq ft private stone terrace complete with a heated plunge pool and dining pergola.',
        pricePerNight: 750,
        capacity: 3,
        bedType: 'Cal King bed + Daybed',
        sizeSqFt: 780,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
        amenities: ['Plunge Pool', 'Outdoor Lounge', 'Walk-in Closet', 'Fully Stocked Wet Bar', 'VIP Airport Transfer'],
        maxChildren: 2,
        occupiedDates: ['2026-06-14', '2026-06-15', '2026-06-18', '2026-06-19', '2026-06-25'],
        promoOffer: { code: 'HONEYMOON', badge: 'Spa Included', discountPercentage: 10, description: 'Includes complimentary 60-min coupled massage treatment' }
      },
      {
        id: 'serenade-presidential-royal',
        name: 'Royal Amalfi Penthouse',
        type: 'presidential',
        description: 'Our crown jewel. Spanning the entire top tier with multi-angled glass facades, private wellness room, grand piano, and dedicated personal butler.',
        pricePerNight: 1400,
        capacity: 4,
        bedType: '2 King beds',
        sizeSqFt: 1850,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
        amenities: ['Private Butler', 'En-suite Cedar Sauna', 'Grand Piano', 'Chef\'s Kitchen & Sommelier Selects', 'Private Lift Access'],
        maxChildren: 2,
        occupiedDates: ['2026-06-20', '2026-06-21', '2026-06-22', '2026-06-27']
      }
    ]
  },
  {
    id: 'luminary-heights',
    name: 'The Luminary Heights',
    rating: 5,
    reviewScore: 4.9,
    reviewCount: 512,
    city: 'Tokyo',
    country: 'Japan',
    address: '1-2-1 Otemachi, Chiyoda-ku, Tokyo 100-0004, Japan',
    coordinates: { lat: 35.6865, lng: 139.7619 },
    description: 'Rising elegantly above the sparkling skyline of Tokyo, The Luminary Heights merges hyper-modern Japanese architectural lines with traditional washi paper accents, creating a calm, elevated oasis high above the Chiyoda financial district.',
    priceStart: 380,
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: [
      'Indoor Sky Pool',
      'Zen Rock Garden Lounge',
      'Traditional Tea Lounge',
      'Digital Concierge',
      'Sake Tasting Cellars',
      'Luxury Car Chauffeur'
    ],
    featured: true,
    reviewsList: [
      {
        id: 'lh-r1',
        guestName: 'Eleanor Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-05-30',
        comment: 'Magnificent skyline views including Mt. Fuji on clear mornings. The Hinoki tub was stunning, with absolute silence echoing from the garden lounge. Tokyo Heights is simply the best.',
        overallRating: 5,
        categories: { cleanliness: 5.0, service: 5.0, location: 4.8, amenities: 4.9 }
      }
    ],
    rooms: [
      {
        id: 'luminary-skyline-king',
        name: 'Skyline City View King',
        type: 'deluxe',
        description: 'Featuring massive floor-to-ceiling windows overlooking Mount Fuji and the glowing Tokyo Tower. Styled with dark ash wood and crisp linens.',
        pricePerNight: 380,
        capacity: 2,
        bedType: 'King bed',
        sizeSqFt: 510,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600',
        amenities: ['Floor-to-ceiling Windows', 'Smart In-Room Tablet', 'Dyson Airwrap Styler', 'Yutaka Robes & Slippers', 'Rain Shower'],
        maxChildren: 1,
        occupiedDates: ['2026-06-15', '2026-06-16', '2026-06-17', '2026-06-23', '2026-06-24'],
        promoOffer: { code: 'TOKYO2026', badge: '10% Platinum', discountPercentage: 10, description: 'Direct contract luxury discount' }
      },
      {
        id: 'luminary-executive-suite',
        name: 'Otemachi Executive Suite',
        type: 'suite',
        description: 'A spacious multi-room corner suite designed with minimalist elegance, incorporating a dining table for four, tatami corner, and a deep soaking Hinoki wood tub.',
        pricePerNight: 650,
        capacity: 3,
        bedType: '1 King + 1 Futon',
        sizeSqFt: 890,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600',
        amenities: ['Hinoki Wood Soaking Tub', 'Traditional Tatami Nook', 'Premium Minibar', 'Custom Audio Studio', 'Private Check-in Club Lounge Access'],
        maxChildren: 2,
        occupiedDates: ['2026-06-12', '2026-06-13', '2026-06-18', '2026-06-20', '2026-06-28']
      }
    ]
  },
  {
    id: 'chalet-obsidian',
    name: 'Chalet Obsidian',
    rating: 4,
    reviewScore: 4.6,
    reviewCount: 198,
    city: 'Queenstown',
    country: 'New Zealand',
    address: 'Lake Esplanade Road, Queenstown 9300, New Zealand',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    description: 'Nestled on the silent banks of Lake Wakatipu, Chalet Obsidian is an architectural marvel of local schist stone, dark steel, and glass, offering direct views of the dramatic Remarkables alpine peaks.',
    priceStart: 290,
    heroImage: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: [
      'Heated Outdoor Firepits',
      'Alpine Hot Tub',
      'Ski Gear Valet',
      'Whiskey & Cigar Lounge',
      'Fine-Dining Grill',
      'Helicopter Skiing Departure'
    ],
    featured: false,
    reviewsList: [
      {
        id: 'co-r1',
        guestName: 'William Turner',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-05-18',
        comment: 'Cozy stone central hearth and a spectacular view of Lake Wakatipu. Star gazing with their in-room telescope was unforgettable.',
        overallRating: 4.6,
        categories: { cleanliness: 4.5, service: 4.7, location: 4.9, amenities: 4.4 }
      }
    ],
    rooms: [
      {
        id: 'obsidian-lakeview-twin',
        name: 'Alpine Lakeview Studio',
        type: 'standard',
        description: 'Cozy and sophisticated layout adorned with natural fibers and timber accents, presenting deep window benches to view the lake currents.',
        pricePerNight: 290,
        capacity: 2,
        bedType: 'Queen bed',
        sizeSqFt: 390,
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20a?auto=format&fit=crop&q=80&w=600',
        amenities: ['Fireplace (Electric)', 'Lake-facing Window Bench', 'Ski Boot Heater', 'Wool Blankets & Custom Rugs', 'Organic Herbal Teas'],
        maxChildren: 0,
        occupiedDates: ['2026-06-16', '2026-06-17', '2026-06-24', '2026-06-25'],
        promoOffer: { code: 'ALPINE', badge: 'Alpine Promo', discountPercentage: 10, description: 'Includes complementary ski chalet passes' }
      },
      {
        id: 'obsidian-penthouse',
        name: 'The Obsidian Grand Loft',
        type: 'suite',
        description: 'Vast loft ceilings with an active central stone hearth fireplace, personal outdoor hot tub overviewing the peaks, and custom kitchen bar.',
        pricePerNight: 550,
        capacity: 4,
        bedType: 'King bed + Twin over Queen loft',
        sizeSqFt: 1100,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=600',
        amenities: ['Private Lakefront Hot Tub', 'Wood Burner Hearth', 'Epicurean Kitchenette', 'Telescope Star Gazing Set', 'Daily Apres-Ski Platter Service'],
        maxChildren: 2,
        occupiedDates: ['2026-06-15', '2026-06-18', '2026-06-19', '2026-06-25']
      }
    ]
  },
  {
    id: 'onyx-clay',
    name: 'Onyx & Clay House',
    rating: 4,
    reviewScore: 4.7,
    reviewCount: 224,
    city: 'Santa Fe',
    country: 'United States',
    address: '210 East Marcy Street, Santa Fe, NM 87501, USA',
    coordinates: { lat: 35.6870, lng: -105.9378 },
    description: 'An artful Adobe oasis inside historic Santa Fe. Onyx & Clay House integrates beautiful rustic texture, local artisan woven blankets, handcrafted pottery styles, and organic architecture to offer a serene sanctuary for design admirers.',
    priceStart: 240,
    heroImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: [
      'Scandic Steam Room',
      'Artisan Potter Workshop',
      'Organic Rooftop Farm',
      'Courtyard Fountain Fireplaces',
      'Curated Art Gallery'
    ],
    featured: false,
    reviewsList: [
      {
        id: 'oc-r1',
        guestName: 'Mariana Gomez',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-05-02',
        comment: 'Beautiful courtyard fountain sounds and authentic adobe ceiling geometry. Such a therapeutic refuge. Pots and linen were stunning.',
        overallRating: 4.7,
        categories: { cleanliness: 4.8, service: 4.6, location: 4.6, amenities: 4.8 }
      }
    ],
    rooms: [
      {
        id: 'onyx-courtyard-queen',
        name: 'Artisan Courtyard Queen',
        type: 'standard',
        description: 'A cozy sanctuary with direct French doors opening to the sound of flowing water in our terracotta brick fountain courtyard.',
        pricePerNight: 240,
        capacity: 2,
        bedType: 'Queen bed',
        sizeSqFt: 360,
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600',
        amenities: ['Direct Courtyard Access', 'Handmade Mug Station', 'Aesop Bio Luxury Products', 'Bluetooth Gramophone Player'],
        maxChildren: 1,
        occupiedDates: ['2026-06-18', '2026-06-19', '2026-06-25'],
        promoOffer: { code: 'CLAYPOT', badge: 'Pottery Pass', discountPercentage: 15, description: 'Includes 1 personalized pottery class reservation' }
      },
      {
        id: 'onyx-adobe-studio',
        name: 'Desert Bloom Adobe Studio',
        type: 'deluxe',
        description: 'Featuring a fully unique adobe clay architectural ceiling, dynamic circular windows, rustic brick lounge, and deep soaking tub.',
        pricePerNight: 350,
        capacity: 3,
        bedType: 'King bed + Cotton Futon',
        sizeSqFt: 580,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600',
        amenities: ['Hand-Carved Soaking Tub', 'Outdoor Hammock Area', 'Custom Clay French Press Coffee Bar', 'Local Artisan Tapestries'],
        maxChildren: 1,
        occupiedDates: ['2026-06-14', '2026-06-15', '2026-06-22', '2026-06-26']
      }
    ]
  },
  {
    id: 'horizon-sands',
    name: 'Horizon Sands Sanctuary',
    rating: 5,
    reviewScore: 4.9,
    reviewCount: 412,
    city: 'South Ari Atoll',
    country: 'Maldives',
    address: 'Atoll Island 0204, South Ari Atoll, Maldives',
    coordinates: { lat: 3.4862, lng: 72.8447 },
    description: 'A pristine, car-free paradise of pure blinding-white sand and lagoon water, Horizon Sands Sanctuary is the physical embodiment of unhurried barefoot state-of-mind luxury, styled elements of sand paths, thatch roofs, and wooden boardwalks.',
    priceStart: 620,
    heroImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: [
      'Over-water Floating Spa',
      'Submarine Excursions',
      'Starlight Cinema',
      'All-Inclusive Fine Dining',
      'Marine Biology Lab Tour',
      'Dolphin Sunset Cruise'
    ],
    featured: true,
    reviewsList: [
      {
        id: 'hs-r1',
        guestName: 'Aisha Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        stayDate: '2026-05-24',
        comment: 'Pure spiritual luxury. Hammock suspended over the crystal water is magnificent. Zero noise, incredible marine life swimming underneath our terrace glass panel.',
        overallRating: 5,
        categories: { cleanliness: 5.0, service: 5.0, location: 5.0, amenities: 4.8 }
      }
    ],
    rooms: [
      {
        id: 'horizon-lagoon-villa',
        name: 'Overwater Lagoon Sunset Villa',
        type: 'suite',
        description: 'Suspended cleanly over the reef, presenting a private infinity hammock directly suspended over ocean and glass floor panel features inside.',
        pricePerNight: 620,
        capacity: 2,
        bedType: 'Grand King bed',
        sizeSqFt: 880,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
        amenities: ['Over-water Hammock', 'Glass Floor Viewing Panel', 'Ocean-facing Shower', 'In-room Floating Breakfast Tray', 'Premium Sound System'],
        maxChildren: 0,
        occupiedDates: ['2026-06-13', '2026-06-14', '2026-06-20', '2026-06-21', '2026-06-27'],
        promoOffer: { code: 'BAREFOOT', badge: 'Island Honeymoon', discountPercentage: 20, description: 'Book 5+ nights to secure direct yacht transfer' }
      },
      {
        id: 'horizon-island-residence',
        name: 'Ocean Reef Beachfront Sanctuary',
        type: 'presidential',
        description: 'Vast beachfront sanctuary enclosed by custom jungle palms with its own 12-meter swimming pool, personal beach cove, and outdoor open-air rain showers.',
        pricePerNight: 1150,
        capacity: 4,
        bedType: '2 King beds',
        sizeSqFt: 1950,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
        amenities: ['12m Private Saltwater Pool', 'Direct Private Cove Beach', 'Outdoor Tropical Oasis Showers', 'Private Teppanyaki Deck Chef', 'Ultimate Luxury Linens'],
        maxChildren: 3,
        occupiedDates: ['2026-06-15', '2026-06-16', '2026-06-22', '2026-06-23', '2026-06-28']
      }
    ]
  }
];

export const CITIES = Array.from(new Set(HOTELS.map(h => h.city))).sort();
export const COUNTRIES = Array.from(new Set(HOTELS.map(h => h.country))).sort();
