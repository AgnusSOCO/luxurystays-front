import React from 'react';
import { CheckMarkIcon, DividerLine } from '../icons/LuxuryIcons';
import { X } from 'lucide-react';

export const ComparisonGrid: React.FC = () => {
    const features = [
        "24/7 Concierge Service",
        "Revenue Optimization Strategy",
        "Professional Interior Styling",
        "Rigorous Guest Screening",
        "Monthly Owner Reporting",
        "Maintenance Coordination"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container-luxury">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
                        The Luxury Difference
                    </h2>
                    <DividerLine className="w-24 h-2 text-luxury-gold mx-auto mb-6" />
                    <p className="text-lg text-slate-600">
                        Why discerning owners choose Luxury Stays Club over standard property management.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="grid grid-cols-3 bg-slate-900 text-white p-6 text-center font-serif text-lg">
                        <div className="text-left pl-4">Feature</div>
                        <div className="text-luxury-gold font-bold">Luxury Stays Club</div>
                        <div className="text-slate-400">Others</div>
                    </div>

                    {features.map((feature, index) => (
                        <div key={index} className={`grid grid-cols-3 p-6 items-center text-center ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0 hover:bg-luxury-champagne/5 transition-colors`}>
                            <div className="text-left pl-4 font-medium text-slate-700">{feature}</div>
                            <div className="flex justify-center">
                                <div className="bg-luxury-gold/10 p-1.5 rounded-full">
                                    <CheckMarkIcon className="h-6 w-6 text-luxury-gold" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <X className="h-6 w-6 text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
