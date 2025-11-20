import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Property Owner",
            text: "Since switching to Luxury Stays Club, my revenue has increased by 40% and I haven't had to worry about a single maintenance issue.",
            rating: 5
        },
        {
            name: "Michael & Elena",
            role: "Guests from Switzerland",
            text: "The attention to detail was impeccable. It felt like a 5-star hotel but with the privacy of a home. We will definitely return.",
            rating: 5
        },
        {
            name: "David Chen",
            role: "Real Estate Investor",
            text: "Their screening process is rigorous. I have complete peace of mind knowing my high-value properties are in safe hands.",
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container-luxury relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
                        Stories of Excellence
                    </h2>
                    <p className="text-lg text-slate-600">
                        Trusted by discerning owners and delighted guests.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative group">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-luxury-champagne/20 group-hover:text-luxury-champagne/40 transition-colors" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                                ))}
                            </div>
                            <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                            <div>
                                <div className="font-bold text-slate-900">{testimonial.name}</div>
                                <div className="text-sm text-luxury-gold uppercase tracking-wider font-medium">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
