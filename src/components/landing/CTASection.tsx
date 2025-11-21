import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export const CTASection: React.FC = () => {
    const navigate = useNavigate();

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
                    Interested in Joining Our Properties?
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light">
                    Partner with Utah's premier luxury property management team.
                    Let us help you maximize your property's potential.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                        onClick={() => navigate('/management')}
                        className="btn-luxury h-16 px-10 text-lg w-full sm:w-auto"
                    >
                        Learn More
                    </Button>
                    <Button 
                        onClick={() => navigate('/contact')}
                        className="h-16 px-10 text-lg w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold"
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
};
