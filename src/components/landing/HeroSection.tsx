import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { MountainIcon } from '../icons/LuxuryIcons';

export const HeroSection: React.FC = () => {
    const scrollToSearch = () => {
        const element = document.getElementById('listings');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div
                className="absolute inset-0 z-0 parallax-bg"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-1/4 left-10 z-10 opacity-20 animate-float hidden lg:block">
                <MountainIcon className="w-32 h-32 text-white" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-up">
                <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full">
                        <span className="text-luxury-champagne text-sm font-medium tracking-widest uppercase">
                            Utah's Premier Property Management
                        </span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
                    Utah's Premier <br />
                    <span className="text-luxury-gradient italic">Luxury Vacation Rentals</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Experience 5-star luxury properties with breathtaking mountain views, world-class amenities, and exceptional service. Book your dream getaway today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        size="lg"
                        className="btn-luxury min-w-[200px] h-14 text-lg rounded-full"
                        onClick={scrollToSearch}
                    >
                        Book Your Stay Now
                    </Button>
                    <Link to="/management">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 border shadow-sm hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 min-w-[200px] h-14 text-lg rounded-full transition-all duration-300">
                            Partner With Us
                        </button>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    );
};
