import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Mountain, Utensils, Wine, Bike, Camera, Music } from 'lucide-react';

interface Activity {
    id: string;
    name: string;
    category: 'ski' | 'dining' | 'bars' | 'activities';
    description: string;
    image: string;
    distance: string;
    icon: React.ElementType;
}

export const ThingsToDoSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const activities: Activity[] = [
        {
            id: '1',
            name: 'Park City Mountain Resort',
            category: 'ski',
            description: 'The largest ski resort in the United States with 7,300+ acres of skiable terrain and 348 trails.',
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '5 miles',
            icon: Mountain
        },
        {
            id: '2',
            name: 'Deer Valley Resort',
            category: 'ski',
            description: 'World-class skiing with impeccable grooming, limited lift ticket sales, and exceptional service.',
            image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '8 miles',
            icon: Mountain
        },
        {
            id: '3',
            name: 'Alta Ski Area',
            category: 'ski',
            description: 'Legendary powder skiing with over 500 inches of annual snowfall. Skiers only.',
            image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '12 miles',
            icon: Mountain
        },
        {
            id: '4',
            name: 'Snowbird',
            category: 'ski',
            description: 'Steep terrain and deep powder with 2,500 acres of skiable terrain and a 3,240-foot vertical drop.',
            image: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '15 miles',
            icon: Mountain
        },
        {
            id: '5',
            name: 'Riverhorse on Main',
            category: 'dining',
            description: 'Upscale American cuisine in an elegant setting on historic Main Street.',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '3 miles',
            icon: Utensils
        },
        {
            id: '6',
            name: 'Handle',
            category: 'dining',
            description: 'Contemporary American fare with locally sourced ingredients and craft cocktails.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '4 miles',
            icon: Utensils
        },
        {
            id: '7',
            name: 'Firewood',
            category: 'dining',
            description: 'Farm-to-table dining featuring wood-fired dishes and seasonal menus.',
            image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '3 miles',
            icon: Utensils
        },
        {
            id: '8',
            name: 'High West Distillery',
            category: 'bars',
            description: 'Award-winning whiskey distillery with tastings and tours in a historic livery stable.',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '4 miles',
            icon: Wine
        },
        {
            id: '9',
            name: 'No Name Saloon',
            category: 'bars',
            description: 'Historic watering hole with live music, craft beers, and a lively atmosphere.',
            image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '3 miles',
            icon: Music
        },
        {
            id: '10',
            name: 'Mountain Biking Trails',
            category: 'activities',
            description: 'Over 400 miles of world-class mountain biking trails for all skill levels.',
            image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: 'Various',
            icon: Bike
        },
        {
            id: '11',
            name: 'Utah Olympic Park',
            category: 'activities',
            description: 'Experience Olympic sports including bobsled rides, zip lines, and freestyle shows.',
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '6 miles',
            icon: Camera
        },
        {
            id: '12',
            name: 'Historic Main Street',
            category: 'activities',
            description: 'Charming street lined with galleries, boutiques, and restaurants in Victorian buildings.',
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            distance: '3 miles',
            icon: Camera
        }
    ];

    const categories = [
        { id: 'all', label: 'All', icon: null },
        { id: 'ski', label: 'Ski Resorts', icon: Mountain },
        { id: 'dining', label: 'Dining', icon: Utensils },
        { id: 'bars', label: 'Bars & Nightlife', icon: Wine },
        { id: 'activities', label: 'Activities', icon: Bike }
    ];

    const filteredActivities = selectedCategory === 'all' 
        ? activities 
        : activities.filter(activity => activity.category === selectedCategory);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-champagne rounded-full blur-3xl"></div>
            </div>

            <div className="container-luxury relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-slate-900">
                        Explore the Area
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover world-class skiing, exceptional dining, and unforgettable experiences near our luxury properties.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                                    selectedCategory === category.id
                                        ? 'bg-luxury-gold text-white shadow-lg scale-105'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredActivities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <Card
                                key={activity.id}
                                className="group cursor-pointer hover-lift overflow-hidden border-none shadow-lg bg-white transition-all duration-300"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={activity.image}
                                        alt={activity.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    
                                    {/* Category Badge */}
                                    <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm border-none shadow-sm capitalize">
                                        {activity.category}
                                    </Badge>

                                    {/* Distance Badge */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                                            📍 {activity.distance}
                                        </div>
                                    </div>
                                </div>

                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-luxury-gold/10 p-2 rounded-lg">
                                            <Icon className="h-5 w-5 text-luxury-gold" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-xl font-serif group-hover:text-luxury-gold transition-colors">
                                                {activity.name}
                                            </CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-slate-600 leading-relaxed">
                                        {activity.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-slate-600 text-lg mb-6">
                        Ready to experience the best of Utah?
                    </p>
                    <a
                        href="#listings"
                        className="inline-block px-8 py-4 bg-luxury-gold hover:bg-amber-600 text-slate-900 font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Book Your Stay
                    </a>
                </div>
            </div>
        </section>
    );
};
