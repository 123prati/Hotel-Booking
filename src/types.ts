/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GuestReview {
  id: string;
  guestName: string;
  avatarUrl?: string;
  stayDate: string;
  comment: string;
  overallRating: number;
  categories: {
    cleanliness: number;
    service: number;
    location: number;
    amenities: number;
  };
}

export interface PromoOffer {
  code: string;
  badge: string;
  discountPercentage: number;
  description: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  description: string;
  pricePerNight: number;
  capacity: number;
  bedType: string;
  sizeSqFt: number;
  image: string;
  amenities: string[];
  maxChildren: number;
  occupiedDates?: string[]; // ISO string dates that are blocked "YYYY-MM-DD"
  promoOffer?: PromoOffer;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number; // 1 to 5 stars
  reviewScore: number; // e.g., 9.4
  reviewCount: number;
  city: string;
  country: string;
  address: string;
  coordinates: { lat: number; lng: number };
  description: string;
  priceStart: number;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  rooms: Room[];
  featured?: boolean;
  reviewsList?: GuestReview[];
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelAddress: string;
  hotelImage: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  roomPrice: number;
  taxAmount: number;
  serviceFreeAmount: number;
  totalAmount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  bookingDate: string;
  paymentMethod: string;
  cardNumberMasked: string;
}
