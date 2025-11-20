import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { guestyApi } from '../services/guestyApi';
import type { GuestyListing } from '../types/guesty';
import { MapPin, Users, Bed, Bath, ArrowLeft, Calendar, DollarSign, Sparkles, Star, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';

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
      <div className="min-h-screen flex items-center justify-center luxury-bg">
        <div className="text-center glass rounded-2xl p-16 animate-fade-in border-2 border-amber-400/20">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-amber-500 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-amber-500" />
          </div>
          <p className="mt-10 text-2xl text-slate-900 font-bold">Loading Exclusive Property...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center luxury-bg">
        <Card className="max-w-lg glass border-2 border-amber-400/20 shadow-2xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-red-600 text-3xl font-bold">Property Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-800 text-lg">{error || 'This property is no longer available'}</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full h-14 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 hover:from-amber-600 hover:via-yellow-700 hover:to-amber-700 text-slate-900 rounded-xl font-bold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              BACK TO COLLECTION
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const images = listing.pictures || (listing.picture ? [listing.picture] : []);
  const currentImage = images[selectedImageIndex];

  return (
    <div className="min-h-screen luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          onClick={() => navigate('/')} 
          className="mb-8 glass border-2 border-amber-400/20 hover:border-amber-400/40 hover:shadow-xl transition-all duration-300 h-12 px-6 font-semibold text-slate-900"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden glass border-2 border-amber-400/20 shadow-2xl animate-fade-in">
              <div className="relative h-96 md:h-[550px] bg-gradient-to-br from-slate-200 to-slate-300">
                {currentImage?.original ? (
                  <img
                    src={currentImage.original}
                    alt={listing.title || 'Property'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-24 w-24 text-slate-400" />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-slate-900/90 text-amber-400 border border-amber-400/50 shadow-xl text-base px-5 py-2.5 font-bold backdrop-blur-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    EXCLUSIVE PROPERTY
                  </Badge>
                </div>
                {listing.prices?.basePrice && (
                  <div className="absolute bottom-6 right-6 bg-gradient-to-r from-amber-400 to-yellow-500 px-7 py-4 rounded-2xl shadow-2xl">
                    <span className="text-4xl font-bold text-slate-900">
                      ${listing.prices.basePrice}
                    </span>
                    <span className="text-lg text-slate-800 font-semibold">/night</span>
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="p-6 bg-white/80 backdrop-blur-sm border-t-2 border-amber-400/10">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                          idx === selectedImageIndex 
                            ? 'border-amber-500 shadow-xl scale-105' 
                            : 'border-slate-200 hover:border-amber-400'
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
                </div>
              )}
            </Card>

            <Card className="mt-8 glass border-2 border-amber-400/20 shadow-2xl animate-fade-in">
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-4xl md:text-5xl mb-4 text-slate-900 font-bold">
                      {listing.title || listing.nickname || 'Luxury Property'}
                    </CardTitle>
                    {listing.address?.city && (
                      <CardDescription className="flex items-center gap-2 text-xl text-slate-600">
                        <MapPin className="h-6 w-6 text-amber-600" />
                        <span className="font-medium">{listing.address.full || `${listing.address.city}, ${listing.address.state || listing.address.country}`}</span>
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-4 mb-10">
                  {listing.bedrooms && (
                    <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-xl">
                      <Bed className="h-7 w-7 text-slate-700" />
                      <span className="font-bold text-slate-900 text-lg">{listing.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-xl">
                      <Bath className="h-7 w-7 text-slate-700" />
                      <span className="font-bold text-slate-900 text-lg">{listing.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {listing.accommodates && (
                    <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-xl">
                      <Users className="h-7 w-7 text-slate-700" />
                      <span className="font-bold text-slate-900 text-lg">Up to {listing.accommodates} Guests</span>
                    </div>
                  )}
                </div>

                {listing.publicDescription?.summary && (
                  <div className="mb-8 p-8 bg-white/90 rounded-2xl border-2 border-amber-400/20 shadow-lg">
                    <h3 className="text-3xl font-bold mb-5 text-slate-900 flex items-center gap-3">
                      <Sparkles className="h-7 w-7 text-amber-600" />
                      About This Property
                    </h3>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed text-lg">{listing.publicDescription.summary}</p>
                  </div>
                )}

                {listing.amenities && listing.amenities.length > 0 && (
                  <div className="p-8 bg-white/90 rounded-2xl border-2 border-amber-400/20 shadow-lg">
                    <h3 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                      <Star className="h-7 w-7 text-amber-600" />
                      Exclusive Amenities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {listing.amenities.slice(0, 10).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-slate-700 bg-slate-50 px-5 py-3 rounded-lg border border-slate-200">
                          <Check className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span className="font-semibold">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 glass border-2 border-amber-400/20 shadow-2xl animate-fade-in">
              <CardHeader className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-t-xl border-b-2 border-amber-400/20 pb-6">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl text-slate-900 flex items-center gap-2 font-bold">
                    <Sparkles className="h-6 w-6 text-amber-600" />
                    Reserve Your Stay
                  </span>
                  {listing.prices?.basePrice && (
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-900">
                        ${listing.prices.basePrice}
                      </div>
                      <div className="text-sm text-slate-600 font-semibold">per night</div>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-8">
                <div>
                  <Label htmlFor="checkIn" className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Check-in Date
                  </Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-14 text-base border-2 border-slate-200 focus:border-amber-500 rounded-xl bg-white font-medium text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="checkOut" className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Check-out Date
                  </Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="h-14 text-base border-2 border-slate-200 focus:border-amber-500 rounded-xl bg-white font-medium text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="guests" className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    Number of Guests
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    min="1"
                    max={listing.accommodates || 10}
                    className="h-14 text-base border-2 border-slate-200 focus:border-amber-500 rounded-xl bg-white font-medium text-slate-900"
                  />
                </div>

                <Button 
                  onClick={handleGetQuote}
                  disabled={!checkIn || !checkOut || bookingLoading}
                  className="w-full h-16 text-lg bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 hover:from-amber-600 hover:via-yellow-700 hover:to-amber-700 text-slate-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold tracking-wide"
                >
                  <DollarSign className="mr-2 h-6 w-6" />
                  {bookingLoading ? 'CALCULATING...' : 'GET PRICE QUOTE'}
                </Button>

                {quote && (
                  <div className="mt-8 p-7 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-2xl shadow-xl animate-fade-in">
                    <h4 className="font-bold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                      <Check className="h-7 w-7" />
                      Price Breakdown
                    </h4>
                    <div className="space-y-4 text-base">
                      {quote.nightsCount && (
                        <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                          <span className="text-slate-700 font-semibold">Nights:</span>
                          <span className="font-bold text-slate-900 text-lg">{quote.nightsCount}</span>
                        </div>
                      )}
                      {quote.money?.fareAccommodation && (
                        <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                          <span className="text-slate-700 font-semibold">Accommodation:</span>
                          <span className="font-bold text-slate-900 text-lg">${quote.money.fareAccommodation}</span>
                        </div>
                      )}
                      {quote.money?.cleaningFee && (
                        <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                          <span className="text-slate-700 font-semibold">Cleaning Fee:</span>
                          <span className="font-bold text-slate-900 text-lg">${quote.money.cleaningFee}</span>
                        </div>
                      )}
                      {quote.money?.totalPrice && (
                        <div className="flex justify-between items-center pt-5 border-t-2 border-emerald-400">
                          <span className="text-xl font-bold text-emerald-900">Total:</span>
                          <span className="text-3xl font-bold text-emerald-900">${quote.money.totalPrice} {quote.money.currency}</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full mt-7 h-16 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold tracking-wide">
                      <Calendar className="mr-2 h-6 w-6" />
                      PROCEED TO BOOKING
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
