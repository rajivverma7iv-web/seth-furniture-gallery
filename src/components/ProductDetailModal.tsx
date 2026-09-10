import React, { useState } from 'react';
import {
  X,
  Star,
  Truck,
  Sparkles,
  Phone,
  MessageCircle,
  Heart,
  Ruler,
  Layers,
  ShieldCheck,
  Check,
  PackageCheck,
  Compass,
} from 'lucide-react';
import { FurnitureItem } from '../types';
import { STORE_INFO } from '../data/furnitureData';
import { formatINR, createWhatsAppProductLink } from '../utils/storeHelpers';

interface ProductDetailModalProps {
  product: FurnitureItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: FurnitureItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedFinish, setSelectedFinish] = useState(
    product.availableFinishes?.[0] || product.finish
  );
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Sticky Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md border border-stone-200 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.sameDayDelivery && (
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Same-Day Delivery Ready</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img
                        ? 'border-amber-800 scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Showroom Trust Badge Card */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Crafted & Guaranteed by Seth Furniture Gallery</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                Inspection welcome at our Mahendra Park, Jahangirpuri showroom (opposite Fruit Market, near Libra Petrol Pump). Available with professional installation and doorstep delivery across Delhi NCR.
              </p>
            </div>
          </div>

          {/* Right Column: Specifications & Customization Inquiry */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5 text-left">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider font-bold text-amber-800">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1.5 bg-amber-50 text-stone-900 px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through font-medium">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Full Description */}
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Highlights Bullet points */}
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-bold text-stone-800">Highlights & Craftsmanship:</p>
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Specs Grid */}
              <div className="mt-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 font-medium block text-[10px] uppercase">
                    Dimensions
                  </span>
                  <span className="font-semibold text-stone-800 block mt-0.5">
                    {product.dimensions}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block text-[10px] uppercase">
                    Timber / Base
                  </span>
                  <span className="font-semibold text-stone-800 block mt-0.5">
                    {product.woodType}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block text-[10px] uppercase">
                    Core Material
                  </span>
                  <span className="font-semibold text-stone-800 block mt-0.5">
                    {product.material}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block text-[10px] uppercase">
                    Delivery Option
                  </span>
                  <span className="font-semibold text-stone-800 block mt-0.5 flex items-center gap-1">
                    {product.sameDayDelivery ? (
                      <span className="text-emerald-700 font-bold">Same-Day Available</span>
                    ) : (
                      <span>Standard (2-4 Days)</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Available Color / Finish Options */}
              {product.availableFinishes && product.availableFinishes.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-bold text-stone-800 block mb-1.5">
                    Select Polish / Shade: <span className="text-amber-800">{selectedFinish}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.availableFinishes.map((fin) => (
                      <button
                        key={fin}
                        onClick={() => setSelectedFinish(fin)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                          selectedFinish === fin
                            ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: WhatsApp, Call, Wishlist */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
              {/* WhatsApp Direct Inquire */}
              <a
                id="modal-whatsapp-inquire-btn"
                href={createWhatsAppProductLink(product.name, product.id, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              {/* Direct Phone Dial */}
              <a
                id="modal-call-btn"
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-200 py-3 px-4 rounded-xl font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom</span>
              </a>

              {/* Add to Estimate Wishlist */}
              <button
                id="modal-wishlist-toggle-btn"
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
                title={isWishlisted ? 'Remove from estimate' : 'Add to estimate wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
