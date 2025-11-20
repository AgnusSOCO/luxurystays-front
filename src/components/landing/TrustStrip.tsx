import React from 'react';
import { Shield, Clock, MapPin, Star } from 'lucide-react';

export const TrustStrip: React.FC = () => {
    const items = [
        { icon: Shield, text: "Family-Owned & Operated" },
        { icon: MapPin, text: "Utah Luxury Specialists" },
        { icon: Clock, text: "24/7 Concierge Service" },
        { icon: Star, text: "5-Star Guest Experience" },
    ];

    return (
        <div className="relative z-20 -mt-12 mb-12">
            <div className="container-luxury">
                <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl py-8 px-6 border border-white/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-3 text-slate-800">
                                <div className="bg-luxury-gold/10 p-2 rounded-full">
                                    <item.icon className="text-luxury-gold h-5 w-5" />
                                </div>
                                <span className="font-medium text-sm tracking-wide uppercase text-center md:text-left">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
