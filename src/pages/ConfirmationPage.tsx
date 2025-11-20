import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ConfirmationState {
  reservation: any;
  listing: any;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export function ConfirmationPage() {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationState = location.state as ConfirmationState;

  useEffect(() => {
    if (!confirmationState || !confirmationState.reservation) {
      navigate('/');
    }
  }, [confirmationState, navigate]);

  if (!confirmationState || !confirmationState.reservation) {
    return null;
  }

  const { reservation, listing, checkIn, checkOut, guests } = confirmationState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pb-24">
      <div className="container-luxury py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-serif text-slate-900 mb-3">Booking Confirmed!</h1>
              <p className="text-lg text-slate-600">
                Your reservation has been successfully confirmed
              </p>
            </div>

            <div className="bg-luxury-gold/10 border border-luxury-gold/30 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Confirmation Code</div>
                  <div className="text-2xl font-bold text-luxury-gold">
                    {reservation.confirmationCode || reservationId}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Status</div>
                  <div className="text-2xl font-bold text-green-600 capitalize">
                    {reservation.status || 'Confirmed'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="border-b border-slate-200 pb-6">
                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-luxury-gold" />
                  Property Details
                </h2>
                {listing && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {listing.title || listing.nickname}
                    </h3>
                    {listing.address && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {listing.address.full || 
                           `${listing.address.city}, ${listing.address.state} ${listing.address.zipcode}`}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-luxury-gold" />
                  Stay Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Check-in</div>
                    <div className="font-medium text-slate-900">
                      {new Date(checkIn).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Check-out</div>
                    <div className="font-medium text-slate-900">
                      {new Date(checkOut).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Guests</div>
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {guests} {guests === 1 ? 'guest' : 'guests'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h2 className="text-xl font-serif text-slate-900 mb-4">Guest Information</h2>
                <div className="space-y-3">
                  {reservation.guest && (
                    <>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Name</div>
                        <div className="font-medium text-slate-900">
                          {reservation.guest.firstName} {reservation.guest.lastName}
                        </div>
                      </div>
                      {reservation.guest.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-900">{reservation.guest.email}</span>
                        </div>
                      )}
                      {reservation.guest.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-900">{reservation.guest.phone}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif text-slate-900 mb-4">Payment Summary</h2>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-slate-900">Total Paid</span>
                    <span className="text-2xl font-bold text-luxury-gold">
                      ${reservation.totalPrice?.toLocaleString() || '0'} {reservation.currency || 'USD'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-blue-900">
                <strong>What's next?</strong> A confirmation email has been sent to your email address with all the details of your reservation. 
                Please check your inbox and spam folder.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/')}
                className="flex-1 btn-luxury h-12"
              >
                Return to Home
              </Button>
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="flex-1 h-12 border-slate-300 hover:bg-slate-50"
              >
                Print Confirmation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
