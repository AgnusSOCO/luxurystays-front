import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { guestyApi } from '../../services/guestyApi';
import type { GuestyListing } from '../../types/guesty';
import { MapPin, Users, Bed, Bath } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export const ListingSection = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState<GuestyListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await guestyApi.getListings({ limit: 20 });
            setListings(response.results);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch listings');
            console.error('Error fetching listings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <section id="listings" className="pb-24 pt-12 bg-slate-50 relative">
            <div className="container-luxury relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-slate-900">Our Exclusive Properties</h2>
                    <p className="text-lg text-slate-600">Discover Utah's finest luxury vacation rentals.</p>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg border border-red-100">
                        {error}
                    </div>
                ) : listings.length === 0 ? (
                    <div className="text-center text-slate-500 p-12 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-xl font-serif">No properties available at this time.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <Card
                                key={listing._id}
                                className="group cursor-pointer hover-lift overflow-hidden border-none shadow-lg bg-white"
                                onClick={() => navigate(`/property/${listing._id}`)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={listing.picture?.thumbnail}
                                        alt={listing.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm border-none shadow-sm">
                                        {listing.propertyType}
                                    </Badge>
                                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <Button size="sm" className="bg-luxury-gold hover:bg-amber-600 text-white border-none">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-xl font-serif line-clamp-1 group-hover:text-luxury-gold transition-colors">
                                            {listing.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center text-slate-500 text-sm">
                                        <MapPin className="h-4 w-4 mr-1 text-luxury-gold" />
                                        {listing.address?.city}, {listing.address?.state}
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                                            <Users className="h-5 w-5 text-luxury-gold mb-1" />
                                            <span className="text-xs text-slate-500 uppercase tracking-wide">Guests</span>
                                            <span className="text-lg font-bold text-slate-900">{listing.accommodates}</span>
                                        </div>
                                        <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                                            <Bed className="h-5 w-5 text-luxury-gold mb-1" />
                                            <span className="text-xs text-slate-500 uppercase tracking-wide">Bedrooms</span>
                                            <span className="text-lg font-bold text-slate-900">{listing.bedrooms}</span>
                                        </div>
                                        <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                                            <Bath className="h-5 w-5 text-luxury-gold mb-1" />
                                            <span className="text-xs text-slate-500 uppercase tracking-wide">Bathrooms</span>
                                            <span className="text-lg font-bold text-slate-900">{listing.bathrooms}</span>
                                        </div>
                                    </div>
                                    {listing.prices?.basePrice && (
                                        <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                                            <span className="text-slate-500 text-sm">From</span>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-slate-900">${listing.prices.basePrice}</span>
                                                <span className="text-slate-500 text-sm ml-1">/ night</span>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section >
    );
};
