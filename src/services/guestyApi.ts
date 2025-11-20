import type {
  GuestyListing,
  GuestyListingsResponse,
  GuestyAvailability,
  GuestyReservationQuote,
  GuestyReservationRequest,
  GuestyReservation,
  GuestyCity,
} from '../types/guesty';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';

class GuestyApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${BACKEND_API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Backend API error for ${endpoint}:`, error);
      throw error;
    }
  }

  async getListings(params?: {
    city?: string;
    occupancy?: number;
    bedrooms?: number;
    limit?: number;
    skip?: number;
  }): Promise<GuestyListingsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.city) queryParams.append('city', params.city);
    if (params?.occupancy) queryParams.append('occupancy', params.occupancy.toString());
    if (params?.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.skip) queryParams.append('skip', params.skip.toString());

    const endpoint = `/api/listings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.makeRequest<GuestyListingsResponse>(endpoint);
  }

  async getListingById(listingId: string): Promise<GuestyListing> {
    return this.makeRequest<GuestyListing>(`/api/listings/${listingId}`);
  }

  async getListingAvailability(
    listingId: string,
    startDate: string,
    endDate: string
  ): Promise<GuestyAvailability[]> {
    const queryParams = new URLSearchParams({
      listingId,
      startDate,
      endDate,
    });
    
    return this.makeRequest<GuestyAvailability[]>(
      `/api/listings/availability?${queryParams.toString()}`
    );
  }

  async getCities(): Promise<GuestyCity[]> {
    return this.makeRequest<GuestyCity[]>('/api/listings/cities');
  }

  async createReservationQuote(params: {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }): Promise<GuestyReservationQuote> {
    return this.makeRequest<GuestyReservationQuote>('/api/reservations/quotes', {
      method: 'POST',
      body: JSON.stringify({
        listingId: params.listingId,
        checkInDateLocalized: params.checkIn,
        checkOutDateLocalized: params.checkOut,
        guestsCount: params.guests,
      }),
    });
  }

  async createReservation(
    reservationData: GuestyReservationRequest
  ): Promise<GuestyReservation> {
    return this.makeRequest<GuestyReservation>('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  async createInstantReservation(reservationData: {
    quoteId: string;
    guest: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
    };
    paymentMethodId: string;
  }): Promise<any> {
    return this.makeRequest<any>(`/api/reservations/quotes/${reservationData.quoteId}/instant`, {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }
}

export const guestyApi = new GuestyApiService();
