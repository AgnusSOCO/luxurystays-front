import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckMarkIcon } from '../components/icons/LuxuryIcons';

export const PropertyManagement = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Property Management form submitted');
    };

    const benefits = [
        "Revenue Optimization Strategy",
        "24/7 Guest Concierge",
        "Professional Interior Styling",
        "Rigorous Guest Screening",
        "Monthly Owner Reporting",
        "Maintenance Coordination"
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-2a4d9fddace7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Luxury Interior"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container-luxury relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Partner with Excellence</h1>
                    <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                        Unlock the full potential of your luxury property with Utah's premier management team.
                        We handle every detail, ensuring maximum returns and peace of mind.
                    </p>
                </div>

            </section>

            <section className="py-24 bg-slate-50">
                <div className="container-luxury">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <div>
                            <h2 className="text-4xl font-serif mb-6 text-slate-900">Why Choose Us?</h2>
                            <p className="text-lg text-slate-600 mb-8">
                                We treat your home as if it were our own. Our comprehensive management services are designed to protect your investment while delivering exceptional experiences for guests.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="bg-luxury-gold/10 p-1 rounded-full">
                                            <CheckMarkIcon className="h-5 w-5 text-luxury-gold" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-serif mb-2">List Your Property</h2>
                            <p className="text-slate-500 mb-6">Fill out the form below for a free rental analysis.</p>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                        <Input placeholder="John" className="h-11" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                        <Input placeholder="Doe" className="h-11" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <Input type="email" placeholder="john@example.com" className="h-11" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" className="h-11" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Property Address</label>
                                    <Input placeholder="123 Luxury Lane, Park City, UT" className="h-11" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tell us about your property</label>
                                    <Textarea placeholder="Bedrooms, bathrooms, amenities..." className="min-h-[100px]" />
                                </div>
                                <Button type="submit" className="w-full btn-luxury h-12 text-lg">
                                    Request Analysis
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
