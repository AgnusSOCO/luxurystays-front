import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { guestyApi } from '../services/guestyApi';
import type { GuestyListing } from '../types/guesty';
import { MapPin, Users, Bed, Bath, ArrowLeft, Calendar, Star, Share2, Heart, Wifi, Car, Coffee, Tv, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { CheckMarkIcon } from '../components/icons/LuxuryIcons';
import { updatePageTitle, updateMetaDescription, updateOGTags, generatePropertyTitle, generatePropertyDescription, addStructuredData } from '../utils/seo';

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
  const [quoteError, setQuoteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await guestyApi.getListingById(id);
        setListing(data);
        setError(null);
        
        const propertyName = data.title || data.nickname || 'Luxury Property';
        const city = data.address?.city || 'Utah';
        const title = generatePropertyTitle(propertyName, city);
        const description = generatePropertyDescription(
          propertyName,
          data.bedrooms || 0,
          data.bathrooms || 0,
          data.accommodates || 0,
          city
        );
        
        updatePageTitle(title);
        updateMetaDescription(description);
        updateOGTags(title, description, data.picture?.original || data.pictures?.[0]?.original);
        
        addStructuredData({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": propertyName,
          "description": data.publicDescription?.summary || description,
          "image": data.pictures?.map(p => p.original) || [],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": data.address?.street || "",
            "addressLocality": data.address?.city || "",
            "addressRegion": data.address?.state || "UT",
            "postalCode": data.address?.zipcode || "",
            "addressCountry": "US"
          },
          "numberOfRooms": data.bedrooms,
          "petsAllowed": data.amenities?.some(a => a.toLowerCase().includes('pet')) || false,
          "amenityFeature": data.amenities?.slice(0, 10).map(amenity => ({
            "@type": "LocationFeatureSpecification",
            "name": amenity,
            "value": true
          })) || []
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listing');
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const validateDates = (): string | null => {
    if (!checkIn || !checkOut) {
      return 'Please select both check-in and check-out dates';
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return 'Check-in date cannot be in the past';
    }

    if (checkOutDate <= checkInDate) {
      return 'Check-out date must be after check-in date';
    }

    const nightsCount = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nightsCount < 1) {
      return 'Minimum stay is 1 night';
    }

    if (listing?.accommodates && guests > listing.accommodates) {
      return `Maximum ${listing.accommodates} guests allowed for this property`;
    }

    return null;
  };

  const handleGetQuote = async () => {
    if (!listing || !checkIn || !checkOut) return;
    
    setQuoteError(null);
    setQuote(null);

    const validationError = validateDates();
    if (validationError) {
      setQuoteError(validationError);
      return;
    }

    try {
      setBookingLoading(true);
      const quoteData = await guestyApi.createReservationQuote({
        listingId: listing._id,
        checkIn,
        checkOut,
        guests,
      });
      setQuote(quoteData);
      setQuoteError(null);
    } catch (err) {
      console.error('Error getting quote:', err);
      
      let errorMessage = 'Unable to get price quote. Please try again.';
      
      if (err instanceof Error) {
        const errorText = err.message;
        
        if (errorText.includes('LISTING_IS_NOT_AVAILABLE') || errorText.includes('not applicable')) {
          errorMessage = 'These dates are not available due to booking restrictions (minimum nights, booking window, or rate plan rules). Please try different dates or contact support.';
        } else if (errorText.includes('TOO_MANY_REQUESTS')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (errorText.includes('400')) {
          errorMessage = 'Invalid booking request. Please check your dates and try again.';
        } else if (errorText.includes('404')) {
          errorMessage = 'Property not found. Please return to the listings page.';
        }
      }
      
      setQuoteError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleProceedToBooking = () => {
    if (!quote) return;
    
    navigate(`/property/${id}/book`, {
      state: {
        quote,
        checkIn,
        checkOut,
        guests,
        listing
      }
    });
  };

  // Helper function to safely extract quote data from Guesty's nested structure
  const getQuoteData = () => {
    if (!quote) return null;

    const ratePlan = quote.rates?.ratePlans?.[0]?.ratePlan;
    const money = ratePlan?.money;
    const days = quote.rates?.ratePlans?.[0]?.days || [];

    const nightsCount = days.length;

    const fareAccommodation = money?.fareAccommodation || 0;
    const fareCleaning = money?.fareCleaning || 0;
    const subTotal = money?.subTotalPrice || fareAccommodation + fareCleaning;
    const taxes = money?.totalTaxes || 0;
    const total = subTotal + taxes;
    const currency = money?.currency || 'USD';

    return {
      nightsCount,
      fareAccommodation,
      fareCleaning,
      subTotal,
      taxes,
      total,
      currency
    };
  };

  const quoteData = getQuoteData();

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

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] bg-slate-100 group">
        {currentImage?.original ? (
          <img
            src={currentImage.original}
            alt={listing.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <MapPin className="h-16 w-16 text-slate-400" />
          </div>
        )}

        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-luxury-gold transition-colors backdrop-blur-sm bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-medium hidden sm:inline">Back to Collection</span>
            <span className="font-medium sm:hidden">Back</span>
          </button>
          <div className="flex gap-2 md:gap-3">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <Share2 className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <Heart className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>

        {/* Arrow Navigation - Desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 md:top-auto md:bottom-6 md:right-6 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Image Thumbnails - Desktop */}
        {images.length > 1 && (
          <div className="hidden md:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 gap-2 p-2 bg-black/40 backdrop-blur-md rounded-lg max-w-[90%] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === selectedImageIndex 
                    ? 'border-luxury-gold scale-105 shadow-lg' 
                    : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/60'
                }`}
              >
                <img 
                  src={img.thumbnail || img.original} 
                  alt={`View ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot Indicators - Mobile */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === selectedImageIndex 
                    ? 'bg-luxury-gold w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe Navigation - Mobile */}
        {images.length > 1 && (
          <div className="md:hidden absolute inset-0 z-10 flex">
            <button
              onClick={previousImage}
              className="flex-1 cursor-pointer"
              aria-label="Previous image"
            />
            <button
              onClick={nextImage}
              className="flex-1 cursor-pointer"
              aria-label="Next image"
            />
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

              {quoteError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Unable to Get Quote</h4>
                      <p className="text-red-800 text-sm leading-relaxed">{quoteError}</p>
                    </div>
                  </div>
                </div>
              )}

              {quote && quoteData && (
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 animate-fade-in">
                  <div className="flex justify-between text-slate-600">
                    <span>${listing.prices?.basePrice} x {quoteData.nightsCount} nights</span>
                    <span>${quoteData.fareAccommodation.toLocaleString()}</span>
                  </div>
                  {quoteData.fareCleaning > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Cleaning fee</span>
                      <span>${quoteData.fareCleaning.toLocaleString()}</span>
                    </div>
                  )}
                  {quoteData.taxes > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Taxes</span>
                      <span>${quoteData.taxes.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-lg">
                    <span>Total</span>
                    <span>${quoteData.total.toLocaleString()} {quoteData.currency}</span>
                  </div>
                  <Button 
                    onClick={handleProceedToBooking}
                    className="w-full btn-luxury mt-4"
                  >
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
