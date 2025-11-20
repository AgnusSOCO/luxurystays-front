import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { guestyApi } from '../../services/guestyApi';
import type { GuestyListing } from '../../types/guesty';
import { Search, MapPin, Users, Bed, Bath } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export const ListingSection = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState<GuestyListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchCity, setSearchCity] = useState('');
    const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
    const [selectedGuests, setSelectedGuests] = useState<number | null>(null);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const params: any = { limit: 20 };
            if (searchCity) params.city = searchCity;
            if (selectedBedrooms) params.bedrooms = selectedBedrooms;
            if (selectedGuests) params.occupancy = selectedGuests;

            const response = await guestyApi.getListings(params);
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

    const handleSearch = () => {
        fetchListings();
    };

    return (
        <section id="listings" className="pb-24 pt-12 bg-slate-50 relative">
            <div className="container-luxury relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-slate-900">Find Your Perfect Sanctuary</h2>
                    <p className="text-lg text-slate-600">Explore our exclusive collection of luxury properties.</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 mb-12 max-w-4xl mx-auto -mt-8 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-luxury-gold" />
                            <Input
                                placeholder="City or Location"
                                className="pl-10 h-12 border-slate-200 focus:border-luxury-gold focus:ring-luxury-gold"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Bed className="absolute left-3 top-3 h-5 w-5 text-luxury-gold" />
                            <Input
                                type="number"
                                placeholder="Bedrooms"
                                className="pl-10 h-12 border-slate-200 focus:border-luxury-gold focus:ring-luxury-gold"
                                value={selectedBedrooms || ''}
                                onChange={(e) => setSelectedBedrooms(e.target.value ? parseInt(e.target.value) : null)}
                            />
                        </div>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 h-5 w-5 text-luxury-gold" />
                            <Input
                                type="number"
                                placeholder="Guests"
                                className="pl-10 h-12 border-slate-200 focus:border-luxury-gold focus:ring-luxury-gold"
                                value={selectedGuests || ''}
                                onChange={(e) => setSelectedGuests(e.target.value ? parseInt(e.target.value) : null)}
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            className="h-12 btn-luxury text-lg"
                        >
                            <Search className="mr-2 h-5 w-5" /> Search
                        </Button>
                    </div>
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
                        <p className="text-xl font-serif">No properties found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchCity('');
                                setSelectedBedrooms(null);
                                setSelectedGuests(null);
                                fetchListings();
                            }}
                            className="text-luxury-gold mt-2"
                        >
                            Clear Filters
                        </Button>
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
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl font-serif line-clamp-1 group-hover:text-luxury-gold transition-colors">
                                            {listing.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center text-slate-500 text-sm mt-1">
                                        <MapPin className="h-4 w-4 mr-1 text-luxury-gold" />
                                        {listing.address?.city}, {listing.address?.state}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center text-sm text-slate-600 border-t border-slate-100 pt-4">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1.5 text-slate-400" />
                                            {listing.accommodates} Guests
                                        </div>
                                        <div className="flex items-center">
                                            <Bed className="h-4 w-4 mr-1.5 text-slate-400" />
                                            {listing.bedrooms} Beds
                                        </div>
                                        <div className="flex items-center">
                                            <Bath className="h-4 w-4 mr-1.5 text-slate-400" />
                                            {listing.bathrooms} Baths
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section >
    );
};
