import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PropertyCareIcon, ConciergeIcon, OwnerBenefitsIcon } from '../icons/LuxuryIcons';

export const ServicesOverview: React.FC = () => {
    const services = [
        {
            title: "Property Care",
            description: "Meticulous maintenance and housekeeping to ensure your property remains pristine.",
            icon: PropertyCareIcon,
            features: ["Weekly Inspections", "Professional Cleaning", "Maintenance Coordination"]
        },
        {
            title: "Guest Services",
            description: "24/7 concierge support creating unforgettable experiences for every guest.",
            icon: ConciergeIcon,
            features: ["24/7 Support", "Local Recommendations", "Personalized Check-in"]
        },
        {
            title: "Owner Benefits",
            description: "Transparent reporting and revenue optimization for peace of mind.",
            icon: OwnerBenefitsIcon,
            features: ["Revenue Management", "Owner Portal", "Marketing Strategy"]
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">


            <div className="container-luxury relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Comprehensive Management</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We handle every detail with precision and care, allowing you to enjoy the benefits of ownership without the burden.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="border-none shadow-lg hover-lift hover-glow bg-white group overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-luxury-gold to-luxury-champagne transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <CardHeader className="text-center pt-8">
                                <div className="mx-auto bg-slate-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4 group-hover:bg-luxury-gold/10 transition-colors duration-300">
                                    <service.icon className="w-10 h-10 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-2xl font-serif mb-2">{service.title}</CardTitle>
                                <CardDescription className="text-slate-500">{service.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-slate-600">
                                            <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
