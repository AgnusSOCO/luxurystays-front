import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { guestyApi } from '../services/guestyApi';
import type { GuestyListing } from '../types/guesty';
import { MapPin, Users, Bed, Bath, ArrowLeft, Calendar, Star, Share2, Heart, Wifi, Car, Coffee, Tv } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { CheckMarkIcon } from '../components/icons/LuxuryIcons';

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<GuestyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await guestyApi.getListingById(id);
        setListing(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listing');
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleGetQuote = async () => {
    if (!listing || !checkIn || !checkOut) return;

    try {
      setBookingLoading(true);
      const quoteData = await guestyApi.createReservationQuote({
        listingId: listing._id,
        checkIn,
        checkOut,
        guests,
      });
      setQuote(quoteData);
    } catch (err) {
      console.error('Error getting quote:', err);
      alert('Failed to get quote. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-gold mx-auto mb-4"></div>
          <p className="text-slate-500 font-serif">Loading Residence...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Property Not Found</h2>
          <p className="text-slate-600 mb-8">{error || 'This residence is currently unavailable.'}</p>
          <Button
            onClick={() => navigate('/')}
            className="btn-luxury w-full"
          >
            Return to Collection
          </Button>
        </div>
      </div>
    );
  }

  const images = listing.pictures || (listing.picture ? [listing.picture] : []);
  const currentImage = images[selectedImageIndex];

  // Helper to map amenities to icons (simplified)
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return Wifi;
    if (lower.includes('parking')) return Car;
    if (lower.includes('coffee')) return Coffee;
    if (lower.includes('tv')) return Tv;
    return CheckMarkIcon;
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] bg-slate-100 group">
        {currentImage?.original ? (
          <img
            src={currentImage.original}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <MapPin className="h-16 w-16 text-slate-400" />
          </div>
        )}

        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Collection</span>
          </button>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Image Thumbnails Overlay */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-md rounded-full overflow-x-auto max-w-[90%]">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${idx === selectedImageIndex ? 'border-luxury-gold scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <img src={img.thumbnail || img.original} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container-luxury -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
                    {listing.title || listing.nickname}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-5 w-5 text-luxury-gold" />
                    <span>{listing.address?.full || `${listing.address?.city}, ${listing.address?.state}`}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
                    <span className="font-bold text-slate-900">5.0</span>
                    <span className="text-slate-500 text-sm">(12 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-slate-100">
                <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
                  <Users className="h-6 w-6 text-slate-700 mb-2" />
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-medium">Guests</span>
                  <span className="font-bold text-slate-900">{listing.accommodates} Max</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
                  <Bed className="h-6 w-6 text-slate-700 mb-2" />
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-medium">Bedrooms</span>
                  <span className="font-bold text-slate-900">{listing.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
                  <Bath className="h-6 w-6 text-slate-700 mb-2" />
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-medium">Bathrooms</span>
                  <span className="font-bold text-slate-900">{listing.bathrooms}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">About This Residence</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                {listing.publicDescription?.summary}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities?.slice(0, 12).map((amenity, idx) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-luxury-gold/50 hover:bg-luxury-champagne/5 transition-colors">
                      <Icon className="h-5 w-5 text-luxury-gold" />
                      <span className="text-slate-700 font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-3xl font-serif font-bold text-slate-900">
                    ${listing.prices?.basePrice}
                  </span>
                  <span className="text-slate-500 ml-1">/ night</span>
                </div>
                <div className="text-sm text-luxury-gold font-medium uppercase tracking-wider">
                  Best Rate Guarantee
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Check-in</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                      />
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Check-out</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                      />
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Guests</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      min="1"
                      max={listing.accommodates || 10}
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                    />
                    <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGetQuote}
                disabled={!checkIn || !checkOut || bookingLoading}
                className="w-full btn-luxury h-14 text-lg mb-4"
              >
                {bookingLoading ? 'Calculating...' : 'Check Availability'}
              </Button>

              <p className="text-center text-sm text-slate-400 mb-6">
                You won't be charged yet
              </p>

              {quote && (
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 animate-fade-in">
                  <div className="flex justify-between text-slate-600">
                    <span>${listing.prices?.basePrice} x {quote.nightsCount} nights</span>
                    <span>${quote.money?.fareAccommodation}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cleaning fee</span>
                    <span>${quote.money?.cleaningFee}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-lg">
                    <span>Total</span>
                    <span>${quote.money?.totalPrice}</span>
                  </div>
                  <Button className="w-full btn-luxury mt-4">
                    Reserve Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
