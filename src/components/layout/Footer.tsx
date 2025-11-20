import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="container-luxury">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-white mb-6 block">
                            LUXURY<span className="text-luxury-gold">STAYS</span>
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Elevating the standard of luxury property management and guest experiences in Utah's most prestigious destinations.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-luxury-gold transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-luxury-gold transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-slate-400 hover:text-luxury-gold transition-colors"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-serif text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-luxury-gold transition-colors">About Us</Link></li>
                            <li><Link to="/management" className="hover:text-luxury-gold transition-colors">Property Management</Link></li>
                            <li><Link to="/contact" className="hover:text-luxury-gold transition-colors">Contact</Link></li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors">Owner Portal</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-serif text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-luxury-gold shrink-0" />
                                <span>123 Main Street, Suite 100<br />Park City, UT 84060</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-luxury-gold shrink-0" />
                                <span>+1 (435) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-luxury-gold shrink-0" />
                                <span>concierge@luxurystaysclub.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-serif text-lg mb-6">Newsletter</h3>
                        <p className="text-slate-400 mb-4">Subscribe to receive updates on new exclusive listings and special offers.</p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Your email address"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-luxury-gold"
                            />
                            <Button className="bg-luxury-gold hover:bg-yellow-600 text-slate-900">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Luxury Stays Club. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
