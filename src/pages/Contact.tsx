import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted');
        // Add submission logic here
    };

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                        alt="Office"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container-luxury relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif mb-6">Contact Us</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        We're here to assist you with your luxury property needs. Reach out to our dedicated team today.
                    </p>
                </div>

            </section>

            <section className="py-24 bg-slate-50">
                <div className="container-luxury">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-serif mb-8 text-slate-900">Get in Touch</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-luxury-gold/10 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-luxury-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Visit Our Office</h3>
                                        <p className="text-slate-600">123 Main Street, Suite 100<br />Park City, UT 84060</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-luxury-gold/10 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-luxury-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Call Us</h3>
                                        <p className="text-slate-600">+1 (435) 555-0123</p>
                                        <p className="text-sm text-slate-500 mt-1">Mon-Fri: 9am - 6pm MST</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-luxury-gold/10 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-luxury-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                        <p className="text-slate-600">concierge@luxurystaysclub.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                        <Input placeholder="John" className="h-12" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                        <Input placeholder="Doe" className="h-12" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <Input type="email" placeholder="john@example.com" className="h-12" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                                    <Input type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <Textarea placeholder="How can we help you?" className="min-h-[150px]" required />
                                </div>
                                <Button type="submit" className="w-full btn-luxury h-12 text-lg">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
