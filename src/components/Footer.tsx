import React from 'react';
import { Phone, MapPin, Clock, Star, Compass, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800 text-left">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center font-display font-bold text-sm">
                SFG
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  Seth Furniture Gallery
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Established 1990 • Mahendra Park, Delhi
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Seth Furniture Gallery is a premier home furniture retailer in Mahendra Park, Jahangirpuri, Delhi, offering handcrafted beds, sofas, dining tables, chairs, wardrobes, and center tables with bespoke customization and same-day delivery.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-white">4.3 / 5 Rating</span>
              <span className="text-stone-400 font-light">(4.4–4.5 across local platforms)</span>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Furniture Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Chesterfield & L-Shape Sofas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Hydraulic Storage Double Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Solid Sheesham & Marble Dining Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Full-Height Modular Wardrobes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Calacatta Marble & Wooden Center Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Bespoke Made-to-Order Workshop &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Info & Schedule */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Store Timings
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <p className="text-white font-semibold">Tuesday – Sunday</p>
                <p className="text-stone-400">10:30 AM – 8:30 PM</p>
              </div>
              <div className="pt-1">
                <p className="text-rose-400 font-semibold">Monday</p>
                <p className="text-stone-400">Closed (Weekly Off)</p>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Same-Day Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Showroom Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {STORE_INFO.address}
                  <span className="block text-stone-400 text-[11px] mt-0.5">
                    Landmark: Opp. Fruit Market, Near Libra Petrol Pump
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-white font-bold hover:text-amber-300 transition-colors"
                >
                  {STORE_INFO.phone}
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Maps Route</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 1990 – {new Date().getFullYear()} Seth Furniture Gallery. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Mahendra Park, Jahangirpuri, Delhi 110033</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
