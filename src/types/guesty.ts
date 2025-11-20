export interface GuestyListing {
  _id: string;
  title: string;
  nickname?: string;
  publicDescription?: {
    summary?: string;
    space?: string;
    access?: string;
    neighborhood?: string;
    transit?: string;
    notes?: string;
  };
  picture?: {
    thumbnail?: string;
    regular?: string;
    large?: string;
    original?: string;
    caption?: string;
  };
  pictures?: Array<{
    _id?: string;
    thumbnail?: string;
    regular?: string;
    large?: string;
    original?: string;
    caption?: string;
  }>;
  address?: {
    full?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
    lat?: number;
    lng?: number;
  };
  accommodates?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  propertyType?: string;
  roomType?: string;
  amenities?: string[];
  prices?: {
    basePrice?: number;
    currency?: string;
    weeklyPriceFactor?: number;
    monthlyPriceFactor?: number;
  };
  tags?: string[];
  active?: boolean;
}

export interface GuestyListingsResponse {
  results: GuestyListing[];
  count: number;
  limit: number;
  skip: number;
}

export interface GuestyAvailability {
  date: string;
  status: 'available' | 'unavailable' | 'booked';
  price?: number;
  minNights?: number;
}

export interface GuestyReservationQuote {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  money?: {
    hostPayout?: number;
    fareAccommodation?: number;
    currency?: string;
    totalPrice?: number;
    hostServiceFee?: number;
    guestServiceFee?: number;
    cleaningFee?: number;
    subTotalPrice?: number;
  };
  nightsCount?: number;
  status?: string;
}

export interface GuestyReservationRequest {
  listingId: string;
  checkInDateLocalized: string;
  checkOutDateLocalized: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  guestsCount: number;
  status?: string;
}

export interface GuestyReservation {
  _id: string;
  confirmationCode?: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  guestsCount: number;
  money?: {
    totalPrice?: number;
    currency?: string;
  };
  status: string;
}

export interface GuestyCity {
  city: string;
  country: string;
  count: number;
}
