import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isHome = location.pathname === '/';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container-luxury flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-serif font-bold tracking-wider text-white">
                        LUXURY<span className="text-luxury-gold">STAYS</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-slate-200 hover:text-luxury-gold transition-colors font-medium text-sm tracking-wide">
                        HOME
                    </Link>
                    <Link to="/about" className="text-slate-200 hover:text-luxury-gold transition-colors font-medium text-sm tracking-wide">
                        ABOUT
                    </Link>
                    <Link to="/management" className="text-slate-200 hover:text-luxury-gold transition-colors font-medium text-sm tracking-wide">
                        MANAGEMENT
                    </Link>
                    <Link to="/contact" className="text-slate-200 hover:text-luxury-gold transition-colors font-medium text-sm tracking-wide">
                        CONTACT
                    </Link>
                    <Link to="/management">
                        <Button className="bg-luxury-gold hover:bg-yellow-600 text-slate-900 font-bold px-6 rounded-full">
                            OWNER LOGIN
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
                    <Link to="/" className="text-slate-200 hover:text-luxury-gold py-2">HOME</Link>
                    <Link to="/about" className="text-slate-200 hover:text-luxury-gold py-2">ABOUT</Link>
                    <Link to="/management" className="text-slate-200 hover:text-luxury-gold py-2">MANAGEMENT</Link>
                    <Link to="/contact" className="text-slate-200 hover:text-luxury-gold py-2">CONTACT</Link>
                    <Link to="/management">
                        <Button className="bg-luxury-gold hover:bg-yellow-600 text-slate-900 font-bold w-full">
                            OWNER LOGIN
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
};
