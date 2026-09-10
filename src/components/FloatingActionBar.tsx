import React from 'react';
import { Phone, MessageCircle, Compass, ShoppingBag } from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { getStoreStatus } from '../utils/storeHelpers';

interface FloatingActionBarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  wishlistCount,
  onOpenWishlist,
}) => {
  const status = getStoreStatus();

  return (
    <>
      {/* Mobile Bottom Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl">
        <a
          id="sticky-mobile-call-btn"
          href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 py-2.5 px-2 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Showroom</span>
        </a>

        <a
          id="sticky-mobile-whatsapp-btn"
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Seth Furniture Gallery, I would like to inquire about home furniture pricing and availability.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-2 rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <a
          id="sticky-mobile-directions-btn"
          href={STORE_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-stone-800 text-amber-200 rounded-xl border border-stone-700 transition-colors"
          title="Directions"
        >
          <Compass className="w-4 h-4 text-amber-400" />
        </a>

        {wishlistCount > 0 && (
          <button
            id="sticky-mobile-estimate-btn"
            onClick={onOpenWishlist}
            className="relative p-2.5 bg-stone-800 text-white rounded-xl border border-stone-700"
            title="View Estimate"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          </button>
        )}
      </div>

      {/* Desktop Floating WhatsApp badge */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2.5">
        <a
          id="desktop-floating-whatsapp-btn"
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Seth Furniture Gallery, I would like to inquire about your furniture collection.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-xs group active:scale-95"
        >
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </>
  );
};
