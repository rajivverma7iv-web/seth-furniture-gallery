import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Star, Heart, Menu, X, Compass, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { getStoreStatus, StoreStatus } from '../utils/storeHelpers';

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  activeSection,
  onNavigate,
}) => {
  const [status, setStatus] = useState<StoreStatus>(getStoreStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setStatus(getStoreStatus());
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'catalog', label: 'Furniture Catalog' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'reviews', label: 'What People Say' },
    { id: 'about-showroom', label: 'The Showroom' },
    { id: 'location-timings', label: 'Hours & Location' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro-bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              id="topbar-phone-link"
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-stone-600">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Mahendra Park, Jahangirpuri, Delhi 110033</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-stone-800/80 px-2.5 py-0.5 rounded-full border border-stone-700/60">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              <span className="text-[11px] font-medium text-stone-200">
                {status.isOpen ? 'Open until 8:30 PM' : status.message}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 text-amber-300 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.3</span>
              <span className="text-stone-400 text-[11px]">({STORE_INFO.totalReviews}+ Reviews)</span>
            </div>

            <span className="hidden lg:inline text-stone-400 text-[11px] border-l border-stone-700 pl-3">
              Est. 1990 • 34+ Yrs
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`bg-white/95 backdrop-blur-md transition-shadow border-b border-stone-200/80 ${
          scrolled ? 'shadow-md shadow-stone-900/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <button
            id="brand-home-button"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 flex flex-col items-center justify-center font-display font-bold shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform border border-amber-600/30">
              <span className="text-sm tracking-tighter leading-none">SFG</span>
              <span className="text-[8px] font-sans font-light tracking-widest uppercase opacity-80 mt-0.5">1990</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  Seth Furniture Gallery
                </span>
              </div>
              <p className="text-xs text-stone-500 font-normal">
                Home & Custom Furniture • Jahangirpuri, Delhi
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-amber-900 bg-amber-50 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist / Estimate Drawer Trigger */}
            <button
              id="wishlist-trigger-btn"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-200 transition-all focus:outline-none"
              title="View Estimate Bag"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-700 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Direct Call CTA */}
            <a
              id="header-call-btn"
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-200 hover:text-amber-100 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-stone-900/10 border border-stone-800"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Showroom</span>
            </a>

            {/* Directions button */}
            <a
              id="header-directions-btn"
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Directions</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-amber-50 text-amber-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                id="mobile-call-link"
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-stone-900 text-amber-200 py-3 rounded-xl font-semibold text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Call {STORE_INFO.phone}
              </a>
              <a
                id="mobile-directions-link"
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 py-3 rounded-xl font-semibold text-sm"
              >
                <Compass className="w-4 h-4" />
                Get Driving Directions
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
