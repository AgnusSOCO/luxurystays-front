import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, MapPin, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { guestyApi } from '../services/guestyApi';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface BookingState {
  quote: any;
  checkIn: string;
  checkOut: string;
  guests: number;
  listing: any;
}

function BookingForm({ bookingState }: { bookingState: BookingState }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('US');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const { quote, checkIn, checkOut, guests, listing } = bookingState;

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

  const checkQuoteExpiry = (): boolean => {
    if (!quote.expiresAt) return true;
    
    const expiryDate = new Date(quote.expiresAt);
    const now = new Date();
    
    if (now >= expiryDate) {
      setError('Your quote has expired. Please return to the property page and get a new quote.');
      return false;
    }
    
    return true;
  };

  const validateForm = (): string | null => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    if (!phone.trim()) return 'Phone number is required';
    if (!country.trim()) return 'Country is required';
    if (!cardComplete) return 'Please enter valid card details';
    if (!acceptTerms) return 'You must accept the Terms & Conditions';
    if (!acceptPrivacy) return 'You must accept the Privacy Policy';
    
    return null;
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#0f172a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        '::placeholder': {
          color: '#94a3b8',
        },
      },
      invalid: {
        color: '#dc2626',
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please wait a moment and try again.');
      return;
    }

    if (!checkQuoteExpiry()) {
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message || 'Failed to process payment details');
      }

      if (!paymentMethod) {
        throw new Error('Failed to create payment method');
      }

      const reservationData = {
        quoteId: quote._id,
        guest: {
          firstName,
          lastName,
          email,
          phone,
          country,
        },
        paymentMethodId: paymentMethod.id,
      };

      const response = await guestyApi.createInstantReservation(reservationData);

      navigate(`/booking/confirm/${response.reservationId}`, {
        state: {
          reservation: response,
          listing,
          checkIn,
          checkOut,
          guests,
        },
      });
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="container-luxury py-8">
        <button
          onClick={() => navigate(`/property/${id}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-luxury-gold transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Property</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h1 className="text-3xl font-serif text-slate-900 mb-2">Complete Your Booking</h1>
              <p className="text-slate-600 mb-8">Enter your details to confirm your reservation</p>

              {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Error</h4>
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">First Name *</Label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Last Name *</Label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Email Address *</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Phone Number *</Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-luxury-gold"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Country *</Label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-md px-3 focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="MX">Mexico</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="space-y-2 mb-6">
                    <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Details *
                    </Label>
                    <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
                      <CardElement 
                        options={cardElementOptions}
                        onChange={(e) => setCardComplete(e.complete)}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Your payment information is secure and encrypted. We use Stripe for payment processing.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-luxury-gold focus:ring-luxury-gold"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600">
                      I accept the <a href="#" className="text-luxury-gold hover:underline">Terms & Conditions</a> *
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-luxury-gold focus:ring-luxury-gold"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-slate-600">
                      I accept the <a href="#" className="text-luxury-gold hover:underline">Privacy Policy</a> *
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !stripe}
                  className="w-full btn-luxury h-14 text-lg mt-6"
                >
                  {loading ? 'Processing Payment...' : 'Complete Booking'}
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
              <h2 className="text-xl font-serif text-slate-900 mb-6">Booking Summary</h2>

              {listing && (
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{listing.title || listing.nickname}</h3>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.address?.city}, {listing.address?.state}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="h-5 w-5 text-luxury-gold" />
                  <div>
                    <div className="text-sm font-medium">Check-in</div>
                    <div className="text-sm">{new Date(checkIn).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="h-5 w-5 text-luxury-gold" />
                  <div>
                    <div className="text-sm font-medium">Check-out</div>
                    <div className="text-sm">{new Date(checkOut).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Users className="h-5 w-5 text-luxury-gold" />
                  <div>
                    <div className="text-sm font-medium">Guests</div>
                    <div className="text-sm">{guests} {guests === 1 ? 'guest' : 'guests'}</div>
                  </div>
                </div>
              </div>

              {quoteData && (
                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>${listing?.prices?.basePrice} x {quoteData.nightsCount} nights</span>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingState = location.state as BookingState;

  useEffect(() => {
    if (!bookingState || !bookingState.quote) {
      navigate(`/property/${id}`);
    }
  }, [bookingState, id, navigate]);

  if (!bookingState || !bookingState.quote) {
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <BookingForm bookingState={bookingState} />
    </Elements>
  );
}
