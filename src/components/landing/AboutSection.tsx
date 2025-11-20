import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container-luxury">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Grid */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-2a4d9f875c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Luxury Interior"
                                className="rounded-lg shadow-xl w-full h-64 object-cover transform translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Modern Kitchen"
                                className="rounded-lg shadow-xl w-full h-64 object-cover"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-luxury-champagne/20 rounded-full blur-3xl" />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-tight">
                            Redefining Luxury Hospitality in Utah
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                Luxury Stays Club began with a simple vision: to bring the white-glove service of the world's
                                finest hotels to the privacy and comfort of luxury vacation homes.
                            </p>
                            <p>
                                As a family-owned business rooted in Utah, we understand the unique charm of our local communities.
                                From the ski slopes of Park City to the serene landscapes of Heber Valley, we curate experiences
                                that are as exceptional as the properties we manage.
                            </p>
                            <p>
                                We don't just manage properties; we steward investments and craft memories, ensuring every owner
                                and guest feels truly valued.
                            </p>
                        </div>
                        <div className="mt-10">
                            <Link to="/about">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 btn-luxury-outline px-8 py-6 text-lg">
                                    Read Our Full Story
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
