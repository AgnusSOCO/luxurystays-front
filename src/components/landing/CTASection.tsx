import React from 'react';
import { Button } from '../ui/button';

export const CTASection: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Home Exterior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/80" />
            </div>

            <div className="container-luxury relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                    Ready to Elevate Your Property?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light">
                    Join the exclusive collection of Luxury Stays Club homes.
                    Request a management consultation today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button className="btn-luxury h-16 px-10 text-lg w-full sm:w-auto">
                        Request Consultation
                    </Button>
                    <Button className="h-16 px-10 text-lg w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold">
                        Contact Our Team
                    </Button>
                </div>
            </div>
        </section>
    );
};
