import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const CommitmentSection: React.FC = () => {
    const steps = [
        {
            number: "01",
            title: "Schedule a Consultation",
            description: "We discuss your goals and evaluate your property's potential."
        },
        {
            number: "02",
            title: "Onboarding & Setup",
            description: "We prepare your home for guests with professional photography and listing creation."
        },
        {
            number: "03",
            title: "Earn & Relax",
            description: "We manage bookings and guests while you enjoy passive income."
        }
    ];

    return (
        <section className="py-24 bg-luxury-champagne/10">
            <div className="container-luxury">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8">
                            Our Commitment to Excellence
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We believe in transparent partnerships and delivering on our promises. Our streamlined process
                            makes it easy for homeowners to transition to a higher standard of management.
                        </p>

                        <div className="space-y-4 mb-10">
                            {["Rigorous Quality Assurance", "24/7 Guest Support", "Transparent Financial Reporting"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-luxury-gold h-6 w-6" />
                                    <span className="text-slate-800 font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 lg:left-1/2 lg:-ml-px" />
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div key={index} className="relative flex items-start gap-8">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-luxury-champagne flex items-center justify-center z-10 shadow-lg">
                                        <span className="text-xl font-bold text-slate-900">{step.number}</span>
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <p className="text-slate-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
