import React from 'react';
import { Phone, Compass, Star, Truck, Award, Clock, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { getStoreStatus } from '../utils/storeHelpers';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenCustomOrders: () => void;
  onOpenDirections: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenCustomOrders,
  onOpenDirections,
}) => {
  const status = getStoreStatus();

  return (
    <section id="hero" className="relative bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-stone-200/60">
      {/* Subtle warm decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-stone-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Information & Key Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Heritage & Rating Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 bg-amber-900/10 text-amber-950 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-amber-900/20">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Established 1990 • 34+ Years Experience</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-stone-900 px-3 py-1 rounded-full text-xs font-semibold border border-amber-300 shadow-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-bold text-stone-900">4.3</span>
                <span className="text-stone-500 text-[11px]">(4.4–4.5 on local platforms)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-stone-900 text-amber-200 px-3 py-1 rounded-full text-xs font-medium">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                <span>{status.isOpen ? 'Open until 8:30 PM' : status.message}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Seth Furniture Gallery
                <span className="block text-2xl sm:text-3xl lg:text-3xl font-serif font-normal italic text-amber-800 mt-1">
                  Delhi's Trusted Destination for Custom & Designer Living
                </span>
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Handcrafted beds with hydraulic storage, bespoke velvet & leather sofas, solid Sheesham dining tables, modular wardrobes, and designer center tables — tailored to your home dimensions in Mahendra Park, Jahangirpuri.
              </p>
            </div>

            {/* Prompt verified highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-xs flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-800 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900">Custom Made-to-Order</h2>
                  <p className="text-[11px] text-stone-500 leading-tight">Tailored sizes, wood & fabric choices</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-xs flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900">Same-Day Delivery</h2>
                  <p className="text-[11px] text-stone-500 leading-tight">Available on in-stock showroom items</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200/90 shadow-xs flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-stone-900">Value For Money</h2>
                  <p className="text-[11px] text-stone-500 leading-tight">Direct workshop pricing & festive offers</p>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                id="hero-primary-call-btn"
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-amber-200 hover:text-amber-100 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md shadow-stone-900/20 active:scale-98"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {STORE_INFO.phone}</span>
              </a>

              <button
                id="hero-directions-btn"
                onClick={onOpenDirections}
                className="inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-xs"
              >
                <Compass className="w-4 h-4 text-amber-800" />
                <span>Directions & Map</span>
              </button>

              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 text-stone-700 hover:text-amber-900 hover:bg-stone-100 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Location quick snippet */}
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-600 bg-stone-100/70 py-2 px-3 rounded-lg border border-stone-200">
              <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span className="truncate">
                <strong className="text-stone-800">Showroom Address:</strong> {STORE_INFO.address} (Opp. Fruit Market, Near Libra Petrol Pump)
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Quick Teasers */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-800 group">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
                  alt="Seth Furniture Gallery Showroom Collection"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-stone-900 shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Showroom Highlights</span>
                </div>

                {/* Bottom Overlay Card Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-amber-500/90 text-stone-950 font-bold px-2 py-0.5 rounded">
                      Featured Setup
                    </span>
                    <span className="text-stone-300">Jahangirpuri Showroom</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Royal Chesterfield Living & Hydraulic Storage Beds
                  </h3>
                  <div className="flex items-center justify-between text-xs text-stone-300 pt-1 border-t border-white/15">
                    <span>100% Solid Seasoned Hardwood</span>
                    <button
                      id="hero-card-custom-quote-btn"
                      onClick={onOpenCustomOrders}
                      className="text-amber-300 hover:text-amber-200 font-bold underline underline-offset-2 flex items-center gap-1"
                    >
                      Get Custom Quote &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Mini Overlay Pill 1: Open Hours */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 rounded-xl shadow-lg border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-stone-500">Tue – Sun Schedule</p>
                  <p className="text-xs font-bold text-stone-900">10:30 AM – 8:30 PM</p>
                  <p className="text-[10px] text-amber-800 font-semibold">Monday Closed</p>
                </div>
              </div>

              {/* Floating Mini Overlay Pill 2: Rating */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white p-3 rounded-xl shadow-lg border border-stone-200 text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < 4
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-amber-300 fill-amber-300/40'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-stone-900 ml-1">4.3</span>
                </div>
                <p className="text-[10px] text-stone-500 font-medium mt-0.5">
                  Trusted by North Delhi families
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
