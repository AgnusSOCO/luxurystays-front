import { Linkedin } from 'lucide-react';

export const About = () => {
    const team = [
        {
            name: "Jorge Cordero",
            role: "CEO & Founder",
            image: "https://media.licdn.com/dms/image/v2/C4E03AQFAkRLg1SNNtw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1518646811741?e=1765411200&v=beta&t=xuRzjDIzeNM3_22ARmP3KARfNDc33-AFEjydFJWlF08",
            linkedin: "https://www.linkedin.com/in/jorge-c-804a677/"
        },
        {
            name: "Juan Cordero",
            role: "CTO",
            image: "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png",
            linkedin: "https://www.linkedin.com/in/juansoco/"
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
                        A family-owned business built on generations of hospitality, dedication, and an unwavering commitment to excellence in Utah's luxury vacation rental market.
                    </p>
                </div>
            </section>

            {/* Our Beginning */}
            <section className="py-24 bg-white">
                <div className="container-luxury max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm mb-4 block">Where It All Began</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8 text-slate-900">A Family Legacy Built on Passion</h2>
                    </div>
                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                        <p>
                            Luxury Stays Utah was born from a deeply personal vision shared by Jorge and Juan Cordero, a father-son team whose love for Utah's breathtaking landscapes runs as deep as their commitment to exceptional hospitality. Growing up in the shadow of the Wasatch Mountains, the Cordero family has always understood that Utah isn't just a destination—it's a feeling, a way of life, and a place where memories are made.
                        </p>
                        <p>
                            Jorge Cordero, our CEO and Founder, spent decades in the hospitality industry, witnessing firsthand how impersonal and transactional property management had become. He saw property owners treated as numbers on a spreadsheet and guests left with cookie-cutter experiences that lacked soul. Jorge knew there had to be a better way—a way that honored both the investment of property owners and the dreams of travelers seeking authentic luxury experiences.
                        </p>
                        <p>
                            When Juan Cordero, our CTO, joined the vision, he brought with him a passion for innovation and technology that would transform how luxury vacation rentals could be managed. Together, father and son combined old-world hospitality values with cutting-edge systems to create something truly special: a property management company that treats every home as if it were their own and every guest as if they were family.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-slate-50">
                <div className="container-luxury">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Luxury Interior"
                                className="rounded-lg shadow-xl w-full h-96 object-cover"
                            />
                            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-luxury-champagne/20 rounded-full blur-3xl" />
                        </div>
                        <div className="text-left order-1 md:order-2">
                            <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Core Values</span>
                            <h2 className="text-4xl font-serif mb-8 text-slate-900">What Drives Us Every Day</h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Family First</h3>
                                    <p>As a family-owned business, we understand the importance of trust, communication, and treating people right. Every property owner and guest becomes part of our extended family.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Uncompromising Excellence</h3>
                                    <p>We don't believe in "good enough." From the moment a guest books to the day they check out, every detail is meticulously managed to exceed expectations.</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Local Expertise</h3>
                                    <p>We're not outsiders managing Utah properties from afar. We live here, we ski here, we raise our families here. Our intimate knowledge of the area ensures authentic, curated experiences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-24 bg-white">
                <div className="container-luxury max-w-5xl">
                    <div className="text-center mb-12">
                        <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8 text-slate-900">Redefining Luxury Property Management</h2>
                    </div>
                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                        <p>
                            Our mission is simple yet profound: to provide property owners with effortless, transparent management that maximizes their investment while giving guests unforgettable experiences that make them want to return year after year.
                        </p>
                        <p>
                            We believe true luxury isn't just about high-end finishes and premium amenities—it's about the feeling of being genuinely cared for. It's the personal touch that makes a house feel like a home. It's the local recommendation that leads to a perfect dinner. It's the peace of mind that comes from knowing every detail has been thoughtfully considered.
                        </p>
                        <p>
                            For property owners, we're not just managers—we're partners invested in your success. We treat your property with the same care and attention we'd give our own, because we understand that these homes represent your dreams, your hard work, and your legacy.
                        </p>
                        <p>
                            For guests, we're not just providing a place to stay—we're crafting experiences that become cherished memories. Whether you're here for world-class skiing, summer adventures on Jordanelle Reservoir, or simply to reconnect with loved ones in a stunning mountain setting, we're here to ensure every moment is extraordinary.
                        </p>
                    </div>
                    <div className="mt-12 text-center">
                        <div className="inline-block p-8 bg-luxury-champagne/20 rounded-2xl">
                            <p className="text-2xl font-serif text-slate-900 italic">
                                "We don't just manage properties; we steward investments and craft memories, ensuring every owner and guest feels truly valued."
                            </p>
                            <p className="text-luxury-gold font-bold mt-4">— The Cordero Family</p>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
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
                                <p className="text-luxury-gold font-medium uppercase tracking-wider text-sm mb-3">{member.role}</p>
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-slate-600 hover:text-luxury-gold transition-colors"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                        <span className="text-sm font-medium">Connect on LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
