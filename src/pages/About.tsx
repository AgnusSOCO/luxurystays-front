

export const About = () => {
    const team = [
        {
            name: "Sarah Jenkins",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Michael Ross",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Elena Rodriguez",
            role: "Director of Concierge",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                        alt="Team Meeting"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container-luxury relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Our Story</h1>
                    <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                        Founded on the principles of integrity, excellence, and personalized service, Luxury Stays Club is redefining the property management experience in Utah.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-slate-50">

                </div>
            </section>

            {/* Mission */}
            <section className="py-24 bg-slate-50">
                <div className="container-luxury">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h2 className="text-4xl font-serif mb-8 text-slate-900">Our Mission</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                To provide homeowners with effortless management and guests with unforgettable experiences. We believe that true luxury lies in the details, which is why we go above and beyond to ensure every aspect of a stay is perfect.
                            </p>
                            <div className="h-1 w-24 bg-luxury-gold rounded-full" />
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-2a4d9f875c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Luxury Interior"
                                className="rounded-lg shadow-xl w-full h-64 object-cover transform translate-y-8"
                            />
                            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-luxury-champagne/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white">
                <div className="container-luxury">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4">Meet The Team</h2>
                        <p className="text-slate-600">The dedicated professionals behind Luxury Stays Club.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {team.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-50 shadow-lg group-hover:border-luxury-gold transition-colors duration-300">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif text-slate-900 mb-1">{member.name}</h3>
                                <p className="text-luxury-gold font-medium uppercase tracking-wider text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
