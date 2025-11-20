import React from 'react';
import { LuxuryKeyIcon, MountainIcon, StarIcon, OwnerBenefitsIcon } from '../icons/LuxuryIcons';

export const WhyChooseUs: React.FC = () => {
    const pillars = [
        {
            icon: LuxuryKeyIcon,
            title: "Luxury Focus",
            description: "We specialize exclusively in high-end properties, maintaining standards that attract discerning guests."
        },
        {
            icon: MountainIcon,
            title: "Local Expertise",
            description: "Deeply rooted in Utah, we know the market, the seasons, and the secrets to the perfect stay."
        },
        {
            icon: StarIcon,
            title: "Full Service",
            description: "From marketing to maintenance, we handle every aspect of property management with precision."
        },
        {
            icon: OwnerBenefitsIcon,
            title: "Results Driven",
            description: "Our strategies are designed to maximize occupancy and revenue without compromising property care."
        }
    ];

    return (
        <section className="py-24 bg-slate-900 text-white relative">
            <div className="container-luxury relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Why Choose Luxury Stays Club?</h2>
                    <p className="text-xl text-slate-400 font-light">
                        The difference is in the details. Here is what sets us apart.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="text-center group">
                            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full border border-slate-700 bg-slate-800/50 group-hover:border-luxury-gold group-hover:bg-luxury-gold/10 transition-all duration-500">
                                <pillar.icon className="h-10 w-10 text-slate-400 group-hover:text-luxury-gold transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-4 text-slate-100">{pillar.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
